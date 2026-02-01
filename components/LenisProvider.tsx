'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

declare global {
    interface Window {
        lenis?: Lenis;
    }
}

interface LenisProviderProps {
    children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);
    const rafRef = useRef<number | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        // Check for reduced motion preference - Accessibility First
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Disable smooth scroll for users who prefer reduced motion
            return;
        }

        // Initialize Lenis with premium smooth scroll configuration
        const lenis = new Lenis({
            // Smooth scroll behavior
            duration: 1.2,                    // Scroll duration for premium feel
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo curve

            // Scroll direction
            orientation: 'vertical',          // Vertical scrolling
            gestureOrientation: 'vertical',   // Only vertical gestures

            // Input multipliers
            smoothWheel: true,                // Enable smooth wheel scrolling
            wheelMultiplier: 1,               // Mouse wheel sensitivity
            touchMultiplier: 2,               // Touch scroll sensitivity

            // Behavior
            infinite: false,                  // Disable infinite scroll
            autoResize: true,                 // Auto-resize on window change
            syncTouch: false,                 // Don't sync touch events (smoother on mobile)
            syncTouchLerp: 0.075,             // Touch lerp value
            // touchInertiaMultiplier removed - invalid property
        });

        lenisRef.current = lenis;

        // Make Lenis instance globally available for GSAP ScrollTrigger integration
        window.lenis = lenis;

        // Request Animation Frame loop
        function raf(time: number) {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        }

        rafRef.current = requestAnimationFrame(raf);

        // Optional: Log scroll events for debugging (remove in production)
        if (process.env.NODE_ENV === 'development') {
            lenis.on('scroll', ({ scroll, limit, velocity, direction }: any) => {
                console.log({ scroll, limit, velocity, direction });
            });
        }

        // Cleanup function
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            lenis.destroy();
            if (window.lenis === lenis) {
                delete window.lenis;
            }
        };
    }, []);

    // Reset scroll position on route change
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    // Expose methods for imperative scroll control (optional)
    useEffect(() => {
        if (lenisRef.current) {
            // Example: window.lenisScrollTo = (target, options) => lenisRef.current?.scrollTo(target, options);
        }
    }, []);

    return <>{children}</>;
}
