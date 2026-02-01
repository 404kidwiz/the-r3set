'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ShoppingBag, ExternalLink } from 'lucide-react';

/**
 * FloatingMerchPromo - Subtle merch awareness banner
 * Appears after user scrolls past 50% of the page
 * Links to the Virgil Tweet Zip Hoodie
 */
export default function FloatingMerchPromo() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if user has dismissed this session
        if (sessionStorage.getItem('merch-promo-dismissed')) {
            setIsDismissed(true);
            return;
        }

        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            // Show after scrolling 40% of the page
            if (scrollPercent > 40 && !isDismissed) {
                setIsVisible(true);
            }
        };

        // Delay initial check to let page load
        const timeout = setTimeout(() => {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        }, 2000);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isDismissed]);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
        sessionStorage.setItem('merch-promo-dismissed', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && !isDismissed && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="fixed bottom-24 right-6 z-40 max-w-xs"
                >
                    <Link
                        href="https://mwm-merch.myshopify.com/products/general-clothes-example-product-1?variant=48408701993183"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block relative overflow-hidden rounded-lg"
                        style={{
                            background: 'rgba(12, 12, 16, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 215, 0, 0.2)',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.1)'
                        }}
                    >
                        {/* Dismiss button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDismiss();
                            }}
                            className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                            style={{ background: 'rgba(0,0,0,0.5)' }}
                            aria-label="Dismiss promo"
                        >
                            <X className="w-3 h-3 text-white/60" />
                        </button>

                        <div className="flex gap-4 p-4">
                            {/* Product Image Placeholder */}
                            <div
                                className="w-20 h-20 flex-shrink-0 rounded-md flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0c0c10 100%)' }}
                            >
                                <ShoppingBag
                                    className="w-8 h-8"
                                    style={{ color: 'var(--accent-secondary)' }}
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p
                                    className="font-mono text-[10px] uppercase tracking-wider mb-1"
                                    style={{ color: 'var(--accent-secondary)' }}
                                >
                                    New Drop
                                </p>
                                <h4
                                    className="font-display text-sm tracking-wider mb-1 line-clamp-2 group-hover:text-accent transition-colors"
                                    style={{ color: 'var(--fg-primary)' }}
                                >
                                    "Virgil Tweet" Zip Hoodie
                                </h4>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="font-display text-lg"
                                        style={{ color: 'var(--fg-primary)' }}
                                    >
                                        $110
                                    </span>
                                    <span
                                        className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider"
                                        style={{ color: 'var(--accent-primary)' }}
                                    >
                                        Shop <ExternalLink className="w-2.5 h-2.5" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Shine effect on hover */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.05), transparent)'
                            }}
                        />
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
