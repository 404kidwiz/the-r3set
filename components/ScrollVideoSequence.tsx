'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ScrollVideoSequenceProps {
    basePath: string;
    frameCount: number;
    width?: number;
    height?: number;
    chapterLabel?: string;
    clipNumber?: number;
    fallbackImage?: string; // Poster if reduced motion
    scrollSpeedMultiplier?: number; // Controls how fast video plays relative to scroll (>1 = faster)
}

/**
 * High-performance scroll-controlled image sequence renderer.
 * Uses HTML5 Canvas to draw frames based on scroll position.
 * Optimized with preloading and frame caching.
 */
export default function ScrollVideoSequence({
    basePath,
    frameCount,
    width = 1920,
    height = 1080,
    chapterLabel,
    clipNumber,
    fallbackImage,
    scrollSpeedMultiplier = 1.8, // Default: video completes at ~55% scroll
}: ScrollVideoSequenceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images] = useState<Map<number, HTMLImageElement>>(new Map());
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadError, setLoadError] = useState(false);
    const rafRef = useRef<number | undefined>(undefined);

    // Mobile optimization: reduce frame count by 50% on mobile devices
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const optimizedFrameCount = isMobile ? Math.floor(frameCount / 2) : frameCount;

    // Format numeric frame number to 3 digits (e.g. 1 -> "001")
    const getFramePath = (index: number) => {
        const frameNum = String(index + 1).padStart(3, '0');
        return `${basePath}/ezgif-frame-${frameNum}.jpg`;
    };

    // Detect reduced motion
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Intersection Observer for visibility and preloading
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                if (entry.isIntersecting && !isLoaded) {
                    preloadImages();
                }
            },
            { rootMargin: '50% 0px' } // Preload when 50% viewport away
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, [containerRef, isLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

    const preloadImages = async () => {
        if (prefersReducedMotion) return;

        // Priority loading: Load every 5th frame first for quick coarse scrubbing, then fill in
        // For now, load sequential chunks to avoid complex logic, but batch them
        const loadBatch = async (start: number, end: number) => {
            const promises = [];
            for (let i = start; i < end; i++) {
                if (i >= frameCount) break;
                if (images.has(i)) continue;

                const img = new window.Image();
                const p = new Promise<void>((resolve, reject) => {
                    img.onload = () => {
                        images.set(i, img);
                        setLoadingProgress(Math.round((images.size / optimizedFrameCount) * 100));
                        resolve();
                    };
                    img.onerror = () => {
                        setLoadError(true);
                        reject();
                    };
                    img.src = getFramePath(i);
                });
                promises.push(p);
            }
            await Promise.allSettled(promises);
        };

        // Load first 10 frames immediately for initial render
        await loadBatch(0, 10);
        setIsLoaded(true);

        // Load the rest in background
        // Using simple loop for now, in a real reckless mode we'd be more aggressive
        // but we want to avoid main thread blocking
        let currentFrame = 10;
        const batchSize = 10;

        const loadNextBatch = () => {
            if (currentFrame >= optimizedFrameCount) return;
            loadBatch(currentFrame, currentFrame + batchSize).then(() => {
                currentFrame += batchSize;
                requestIdleCallback(() => loadNextBatch());
            });
        };

        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => loadNextBatch());
        } else {
            setTimeout(loadNextBatch, 100);
        }
    };

    // Draw frame to canvas
    const drawFrame = (frameIndex: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (!canvas || !ctx) return;

        // Handle high-DPI displays
        // If canvas strict size is not set, we might rely on CSS object-fit
        // But internally we draw at resolution

        const img = images.get(frameIndex);
        if (img) {
            // Draw image covering the canvas (like object-fit: cover)
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        }
    };

    // Easing function for smooth frame transitions
    const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    // Scroll loop with viewport-aware frame hold logic
    useEffect(() => {
        if (prefersReducedMotion) return;

        const handleScroll = () => {
            if (!containerRef.current) return;
            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const containerHeight = container.offsetHeight;

            // OPTIMIZED SCROLL LOGIC:
            // Goal: Ensure complete frames are visible before exiting viewport
            // Strategy: Hold first frame, distribute middle frames, hold last frame

            // Calculate how much of the container is visible in viewport
            const containerTop = rect.top;
            const containerBottom = rect.bottom;

            // Viewport visibility percentage (0 = just entering, 1 = fully passed)
            // When top of container hits top of viewport, visibility starts increasing
            const scrollTop = -containerTop;
            const totalScrollDist = containerHeight - viewportHeight;

            // Raw progress through the container (0 to 1)
            let rawProgress = scrollTop / totalScrollDist;
            rawProgress = Math.max(0, Math.min(1, rawProgress));

            // Apply speed multiplier to compress/expand the active scroll range
            // Higher multiplier = video completes earlier in the scroll
            const adjustedProgress = Math.min(1, rawProgress * scrollSpeedMultiplier);

            // FRAME HOLD ZONES:
            // - First 10% of scroll: Hold frame 0 (intro)
            // - Middle 70% of scroll: Distribute frames 1 to N-1
            // - Last 20% of scroll: Hold frame N (outro)

            const INTRO_HOLD = 0.10;  // Hold first frame for 10% of scroll
            const OUTRO_HOLD = 0.20;  // Hold last frame for 20% of scroll
            const ACTIVE_RANGE = 1 - INTRO_HOLD - OUTRO_HOLD; // 70% for active frames

            let frameIndex: number;

            if (adjustedProgress < INTRO_HOLD) {
                // Hold first frame during intro
                frameIndex = 0;
            } else if (adjustedProgress > (1 - OUTRO_HOLD)) {
                // Hold last frame during outro
                frameIndex = optimizedFrameCount - 1;
            } else {
                // Distribute frames across active range with easing
                const activeProgress = (adjustedProgress - INTRO_HOLD) / ACTIVE_RANGE;
                const easedProgress = easeInOutCubic(activeProgress);
                frameIndex = Math.floor(easedProgress * (optimizedFrameCount - 1));
                frameIndex = Math.max(0, Math.min(optimizedFrameCount - 1, frameIndex));
            }

            setProgress(adjustedProgress);
            rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
        };

        if (isVisible) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            // Initial draw
            handleScroll();
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isVisible, optimizedFrameCount, isLoaded, prefersReducedMotion, scrollSpeedMultiplier]); // eslint-disable-line react-hooks/exhaustive-deps


    // Error state: show fallback image
    if (loadError && fallbackImage) {
        return (
            <div className="relative h-screen w-full">
                <Image
                    src={fallbackImage}
                    alt={chapterLabel || "Video chapter"}
                    fill
                    className="object-cover"
                />
                {chapterLabel && (
                    <div className="absolute bottom-8 left-8">
                        <span className="text-xs font-mono uppercase tracking-widest text-muted">
                            {chapterLabel}
                        </span>
                    </div>
                )}
            </div>
        );
    }

    // Reduced motion: show static fallback
    if (prefersReducedMotion && fallbackImage) {
        return (
            <div className="relative h-screen w-full">
                <Image
                    src={fallbackImage}
                    alt={chapterLabel || "Video chapter"}
                    fill
                    className="object-cover"
                />
                {chapterLabel && (
                    <div className="absolute bottom-8 left-8">
                        <span className="text-xs font-mono uppercase tracking-widest text-muted">
                            {chapterLabel}
                        </span>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative h-[180vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    className="w-full h-full object-cover"
                />

                {/* Scrim/Vignette */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.3) 100%)'
                    }}
                />

                {/* Blur Placeholder - shown while loading */}
                {!isLoaded && fallbackImage && (
                    <div className="absolute inset-0">
                        <Image
                            src={fallbackImage}
                            alt="Loading..."
                            fill
                            className="object-cover blur-md opacity-50"
                            priority
                        />
                    </div>
                )}

                {/* Loading Progress Indicator */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-sm text-white/60 font-mono bg-black/40 px-4 py-2 rounded-sm backdrop-blur-sm">
                            Loading {loadingProgress}%
                        </div>
                    </div>
                )}

                {/* Chapter Label */}
                {chapterLabel && (
                    <div className="absolute bottom-8 left-8 pointer-events-none mix-blend-difference">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/80">
                            {chapterLabel}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
