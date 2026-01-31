// @design-lead: Album reveal using GSAP ScrollTrigger with 3D transforms
// Following gsap-scrolltrigger skill: scrub timeline + pin pattern (lines 105-118)
// ui-ux-pro-max: duration-timing 150-300ms for micro-interactions (line 72)
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AlbumReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const coverRef = useRef<HTMLDivElement>(null);
    const tracklistRef = useRef<HTMLDivElement>(null);
    const creditsRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<{ kill: () => void } | null>(null);

    useEffect(() => {
        // Dynamic import GSAP for code-splitting (nextjs-best-practices line 114)
        const initAnimation = async () => {
            const gsap = (await import('gsap')).default;
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');

            gsap.registerPlugin(ScrollTrigger);

            // Respect reduced motion (ui-ux-pro-max line 54)
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                // No animation, just show final state
                if (coverRef.current) coverRef.current.style.transform = 'none';
                if (tracklistRef.current) tracklistRef.current.style.opacity = '1';
                if (creditsRef.current) creditsRef.current.style.opacity = '1';
                return;
            }

            // "Burst open" reveal timeline (gsap-scrolltrigger line 105-118)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1, // Smooth scrubbing
                    pin: false,
                }
            });

            // Store for cleanup
            scrollTriggerRef.current = tl.scrollTrigger as { kill: () => void };

            // Sequence: scale + rotate → tracklist → credits
            tl.from(coverRef.current, {
                scale: 0.8,
                rotateY: -15,
                rotateX: 5,
                duration: 0.4,
                ease: 'power2.out'
            })
                .to(tracklistRef.current, {
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                }, '-=0.2')
                .to(creditsRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                }, '-=0.1');
        };

        initAnimation();

        // Cleanup on unmount
        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
            }
        };
    }, []);

    return (
        <section id="album" className="section-spacing">
            <div className="section-container">
                <div
                    ref={containerRef}
                    className="relative min-h-screen flex items-center justify-center"
                    style={{ perspective: '1000px' }}
                >
                    {/* Album Cover - Layer 1 */}
                    <div
                        ref={coverRef}
                        className="relative z-10 w-full max-w-lg aspect-square"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="w-full h-full bg-surface border border-stroke rounded-sm overflow-hidden shadow-2xl">
                            <Image
                                src="/album-cover.jpg"
                                alt="THE R3SET Album Cover"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Tracklist Card - Layer 2 */}
                    <div
                        ref={tracklistRef}
                        className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-12 w-80 opacity-0"
                        style={{ transform: 'translateX(50px)' }}
                    >
                        <div className="card p-6 backdrop-blur-sm bg-surface/90">
                            <h3 className="text-h3 font-display mb-4">Tracklist</h3>
                            <ol className="space-y-2 text-sm">
                                <li className="flex justify-between">
                                    <span>1. Opening</span>
                                    <span className="text-muted">3:42</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>2. Reset Mode</span>
                                    <span className="text-muted">4:15</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>3. New Wave</span>
                                    <span className="text-muted">3:58</span>
                                </li>
                                {/* Add more tracks */}
                            </ol>
                        </div>
                    </div>

                    {/* Credits Card - Layer 3 */}
                    <div
                        ref={creditsRef}
                        className="absolute left-1/2 bottom-8 -translate-x-1/2 w-96 opacity-0"
                        style={{ transform: 'translateY(30px)' }}
                    >
                        <div className="card p-6 backdrop-blur-sm bg-surface/90 text-center">
                            <p className="text-sm text-muted mb-2">Produced by</p>
                            <p className="text-h2 font-display">Mike Will Made-It</p>
                            <div className="flex gap-4 justify-center mt-4">
                                <button className="btn-primary">
                                    Stream Now
                                </button>
                                <button className="btn-secondary">
                                    Pre-Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
