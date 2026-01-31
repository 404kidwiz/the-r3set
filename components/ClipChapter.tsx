'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ClipChapterProps {
  clipSrc: string;
  posterSrc: string;
  chapterLabel?: string;
  clipNumber: number;
  priority?: boolean;
}

export default function ClipChapter({ clipSrc, posterSrc, chapterLabel, clipNumber, priority = false }: ClipChapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isApproaching, setIsApproaching] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);

  // Detect reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // IntersectionObserver for visibility + approach detection
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    // Approach detection - preload video when close
    const approachObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isApproaching) {
          setIsApproaching(true);
          video.preload = 'auto';
        }
      },
      { rootMargin: '200px 0px' }
    );

    visibilityObserver.observe(container);
    approachObserver.observe(container);

    // Scroll-scrub logic with iOS optimizations
    const updateVideoTime = () => {
      if (!isVisible || prefersReducedMotion) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress through container
      const scrollStart = -rect.top;
      const scrollEnd = containerHeight - viewportHeight;
      const scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollEnd));

      // Map to video duration
      if (video.duration) {
        const targetTime = scrollProgress * video.duration;

        // iOS optimization: throttle updates to ~15fps for smoother performance
        const delta = Math.abs(targetTime - lastTimeRef.current);

        if (delta > 0.066) { // ~15fps throttle for iOS Safari
          video.currentTime = targetTime;
          lastTimeRef.current = targetTime;
        }
      }

      rafRef.current = requestAnimationFrame(updateVideoTime);
    };

    if (isVisible && !prefersReducedMotion) {
      rafRef.current = requestAnimationFrame(updateVideoTime);
    }

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      visibilityObserver.disconnect();
      approachObserver.disconnect();
    };
  }, [isVisible, isApproaching, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative h-[220vh]"
      aria-label={chapterLabel || `Chapter ${clipNumber}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Reduced Motion: Show Poster Only */}
        {prefersReducedMotion ? (
          <div className="w-full h-full relative">
            <Image
              src={posterSrc}
              alt={chapterLabel || `Chapter ${clipNumber} scene`}
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
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={clipSrc}
              poster={posterSrc}
              muted
              playsInline
              preload={priority ? "auto" : "metadata"}
              aria-label={`${chapterLabel || 'Chapter'} video`}
            />

            {/* Optional Chapter Label Overlay */}
            {chapterLabel && (
              <div className="absolute bottom-8 left-8 pointer-events-none">
                <span className="text-xs font-mono uppercase tracking-widest text-white/60">
                  {chapterLabel}
                </span>
              </div>
            )}

            {/* Subtle Vignette for Legibility */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.3) 100%)'
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
