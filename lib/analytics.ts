/**
 * Analytics event tracking
 * @integration GA4 and/or PostHog
 * @prd Section 9 - Minimal but valuable events
 */

// Type definitions for analytics events
type CTALabel = 'watch_trailer' | 'stream' | 'shop' | 'newsletter' | 'vault';
type ScrollSection = 'album_reveal' | 'discography' | 'media' | 'merch' | 'bio';
type VideoAction = 'open' | 'play' | 'complete';
type CommerceEvent = 'view_item' | 'add_to_cart' | 'begin_checkout';
type VaultAction = 'attempt' | 'success';

/**
 * Track CTA clicks
 */
export function trackCTAClick(label: CTALabel) {
    if (typeof window === 'undefined') return;

    // GA4
    if (window.gtag) {
        window.gtag('event', 'cta_click', {
            cta_label: label,
        });
    }

    // PostHog
    if (window.posthog) {
        window.posthog.capture('CTA Click', {
            label,
        });
    }

    console.log('[Analytics] CTA Click:', label);
}

/**
 * Track scroll depth milestones
 */
export function trackScrollDepth(section: ScrollSection) {
    if (typeof window === 'undefined') return;

    // GA4
    if (window.gtag) {
        window.gtag('event', 'scroll_depth', {
            section,
        });
    }

    // PostHog
    if (window.posthog) {
        window.posthog.capture('Scroll Depth', {
            section,
        });
    }

    console.log('[Analytics] Scroll Depth:', section);
}

/**
 * Track video interactions
 */
export function trackVideoEvent(action: VideoAction, label: string) {
    if (typeof window === 'undefined') return;

    // GA4
    if (window.gtag) {
        window.gtag('event', `video_${action}`, {
            video_label: label,
        });
    }

    // PostHog
    if (window.posthog) {
        window.posthog.capture(`Video ${action}`, {
            label,
        });
    }

    console.log('[Analytics] Video Event:', action, label);
}

/**
 * Track commerce events
 */
export function trackCommerceEvent(event: CommerceEvent, data: {
    item_id?: string;
    item_name?: string;
    price?: number;
    quantity?: number;
    value?: number;
    currency?: string;
    items?: any[];
    item_category?: string;
    item_variant?: string;
}) {
    if (typeof window === 'undefined') return;

    // GA4 (Google Analytics 4 ecommerce format)
    if (window.gtag) {
        window.gtag('event', event, data);
    }

    // PostHog
    if (window.posthog) {
        window.posthog.capture('Commerce Event', {
            event_type: event,
            ...data,
        });
    }

    console.log('[Analytics] Commerce Event:', event, data);
}

/**
 * Track Vault interactions
 */
export function trackVaultEvent(action: VaultAction) {
    if (typeof window === 'undefined') return;

    // GA4
    if (window.gtag) {
        window.gtag('event', 'vault_action', {
            action,
        });
    }

    // PostHog
    if (window.posthog) {
        window.posthog.capture('Vault Action', {
            action,
        });
    }

    console.log('[Analytics] Vault Event:', action);
}

/**
 * Initialize PostHog (if using)
 * Call this in layout.tsx or _app.tsx
 */
export function initPostHog() {
    if (typeof window === 'undefined') return;

    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!apiKey) {
        console.warn('[Analytics] No PostHog key found');
        return;
    }

    // Initialize PostHog
    import('posthog-js').then(({ default: posthog }) => {
        posthog.init(apiKey, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
            loaded: (posthog) => {
                if (process.env.NODE_ENV === 'development') {
                    // Optional: opt out in dev to avoid noise, or keep it for testing
                    // posthog.opt_out_capturing();
                    console.log('[Analytics] PostHog loaded in dev mode');
                }
            },
            capture_pageview: true // Automatically capture pageviews
        });
    });
}

/**
 * Initialize GA4 (if using)
 */
export function initGA4() {
    if (typeof window === 'undefined') return;

    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) return;

    console.log('[Analytics] GA4 initialized');
    // GA4 script would be loaded via next/script in layout
}

// Type augmentation for window object
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        posthog?: {
            capture: (event: string, properties?: any) => void;
        };
    }
}
