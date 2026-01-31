'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useCartStore } from '@/lib/cart-store';

export default function NavAutoHide() {
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    const { totalItems, openCart } = useCartStore();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // At top of page
            if (currentScrollY < 10) {
                setIsAtTop(true);
                setIsVisible(true);
                return;
            }

            setIsAtTop(false);

            // Scrolling down - hide nav
            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                setIsVisible(false);
            }
            // Scrolling up - show nav
            else if (currentScrollY < lastScrollY.current) {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        // Debounce for performance
        let ticking = false;
        const scrollListener = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollListener, { passive: true });
        return () => window.removeEventListener('scroll', scrollListener);
    }, []);

    return (
        <>
            {/* Skip to content for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-bg focus:rounded-sm"
            >
                Skip to content
            </a>

            <nav
                className={clsx(
                    'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out',
                    {
                        'translate-y-0': isVisible,
                        '-translate-y-full': !isVisible,
                    }
                )}
                aria-label="Main navigation"
            >
                <div className="section-container">
                    <div className={clsx(
                        'flex items-center justify-between h-20 transition-all duration-300',
                        {
                            'backdrop-blur-md bg-bg/80 border-b border-stroke': !isAtTop,
                            'bg-transparent': isAtTop,
                        }
                    )}>
                        {/* Logo */}
                        <Link
                            href="/"
                            className="text-h3 font-display font-bold tracking-tight hover:text-muted transition-colors"
                        >
                            THE R3SET
                        </Link>

                        {/* Nav Links */}
                        <ul className="hidden md:flex items-center gap-8">
                            <li>
                                <Link href="#album" className="nav-link">
                                    Album
                                </Link>
                            </li>
                            <li>
                                <Link href="#discography" className="nav-link">
                                    Discography
                                </Link>
                            </li>
                            <li>
                                <Link href="#media" className="nav-link">
                                    Media
                                </Link>
                            </li>
                            <li>
                                <Link href="#merch" className="nav-link">
                                    Merch
                                </Link>
                            </li>
                            <li>
                                <Link href="#bio" className="nav-link">
                                    Bio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/vault"
                                    className="text-sm font-mono uppercase tracking-wider text-muted hover:text-accent transition-colors"
                                    aria-label="Access Vault"
                                >
                                    Vault
                                </Link>
                            </li>
                        </ul>

                        {/* Desktop Cart Button */}
                        <button
                            onClick={openCart}
                            className="hidden md:block relative p-2 text-fg hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                            aria-label={`Shopping cart, ${totalItems} items`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold bg-accent text-bg rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Mobile Buttons */}
                        <div className="flex items-center gap-2 md:hidden">
                            {/* Mobile Cart */}
                            <button
                                onClick={openCart}
                                className="relative p-2 text-fg hover:text-accent transition-colors"
                                aria-label={`Shopping cart, ${totalItems} items`}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold bg-accent text-bg rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 hover:bg-surface rounded-sm transition-colors"
                                aria-label="Toggle menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/60 z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-hidden="true"
                    />
                    <div
                        className="fixed top-20 left-0 right-0 bottom-0 bg-bg z-40 md:hidden overflow-y-auto border-t border-stroke"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation"
                    >
                        <div className="section-container py-8">
                            <ul className="flex flex-col gap-6">
                                <li>
                                    <Link
                                        href="#album"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl font-medium text-fg hover:text-accent transition-colors block py-2"
                                    >
                                        Album
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#discography"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl font-medium text-fg hover:text-accent transition-colors block py-2"
                                    >
                                        Discography
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#media"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl font-medium text-fg hover:text-accent transition-colors block py-2"
                                    >
                                        Media
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#merch"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl font-medium text-fg hover:text-accent transition-colors block py-2"
                                    >
                                        Merch
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#bio"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl font-medium text-fg hover:text-accent transition-colors block py-2"
                                    >
                                        Bio
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/vault"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl font-mono uppercase tracking-wider text-muted hover:text-accent transition-colors block py-2"
                                    >
                                        Vault
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}

            <style jsx>{`
        .nav-link {
          @apply text-sm font-medium text-fg hover:text-accent transition-colors duration-200;
        }
      `}</style>
        </>
    );
}
