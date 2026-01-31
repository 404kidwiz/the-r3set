/**
 * Motion utilities and GSAP loader
 * @design-system Centralized motion configuration, reduced motion support
 */

let gsapInstance: typeof import('gsap').gsap | null = null;
let ScrollTriggerInstance: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null;

/**
 * Dynamically load GSAP and ScrollTrigger
 * @returns Promise resolving to { gsap, ScrollTrigger }
 */
export async function loadGSAP() {
    if (gsapInstance && ScrollTriggerInstance) {
        return { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance };
    }

    const [gsapModule, scrollTriggerModule] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
    ]);

    gsapInstance = gsapModule.gsap || gsapModule.default;
    ScrollTriggerInstance = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

    // Register ScrollTrigger plugin
    gsapInstance.registerPlugin(ScrollTriggerInstance);

    return { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance };
}

/**
 * Check if user prefers reduced motion
 */
export function detectReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get default ScrollTrigger configuration
 */
export function getScrollTriggerDefaults() {
    return {
        markers: process.env.NODE_ENV === 'development' ? false : false, // Set to true for debugging
        anticipatePin: 1,
        invalidateOnRefresh: true,
    };
}

/**
 * Cleanup all ScrollTrigger instances
 * Call on component unmount to prevent memory leaks
 */
export function cleanupScrollTriggers() {
    if (ScrollTriggerInstance) {
        ScrollTriggerInstance.getAll().forEach((trigger) => trigger.kill());
    }
}

/**
 * Easing curves (design system approved)
 * @design-system Restrained "resolve" transitions, no bouncy overshoot
 */
export const easings = {
    // Micro interactions (120-180ms)
    micro: 'power1.out',

    // Standard transitions (220-360ms)
    standard: 'power2.out',

    // Cinematic (600-1200ms) - hero/reveal only
    cinematic: 'power3.inOut',

    // Resolve into place (calm, intentional)
    resolve: 'power2.inOut',
};

/**
 * Duration presets (milliseconds)
 */
export const durations = {
    micro: 0.15, // 150ms
    standard: 0.3, // 300ms
    cinematic: 0.8, // 800ms
};
