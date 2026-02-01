'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { name: 'HOME', anchor: 'hero' },
    { name: 'R3SET', anchor: 'chapter-one' },
    { name: 'MUSIC', anchor: 'discography' },
    { name: 'MEDIA', anchor: 'media' },
    { name: 'BIO', anchor: 'bio' },
    { name: 'MERCH', anchor: 'merch' },
];

export default function Navigation() {
    const [activeSection, setActiveSection] = useState('hero');
    const [isScrolled, setIsScrolled] = useState(false);

    // Scroll to section with smooth behavior
    const scrollToSection = useCallback((anchorId: string) => {
        const el = document.getElementById(anchorId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    // Track scroll position for nav appearance and active section
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = navItems.map(item => ({
                id: item.anchor,
                el: document.getElementById(item.anchor)
            })).filter(s => s.el);

            const viewportMiddle = window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section.el) {
                    const rect = section.el.getBoundingClientRect();
                    if (rect.top <= viewportMiddle) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4 transition-all duration-500 ${isScrolled ? 'opacity-90 scale-95 hover:opacity-100 hover:scale-100' : 'opacity-100 scale-100'
                }`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div
                className="flex items-center gap-1 p-1.5 rounded-full"
                style={{
                    background: 'rgba(12, 12, 16, 0.8)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                }}
            >
                {navItems.map((item) => {
                    const isActive = activeSection === item.anchor;

                    return (
                        <button
                            key={item.anchor}
                            onClick={() => scrollToSection(item.anchor)}
                            className="relative px-4 sm:px-5 py-2.5 rounded-full group overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all"
                            style={{
                                '--tw-ring-color': 'var(--accent-primary)',
                                '--tw-ring-offset-color': 'var(--bg-void)'
                            } as React.CSSProperties}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {/* Active/Hover Background */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            background: 'var(--accent-primary)',
                                            boxShadow: '0 0 20px var(--glow-primary)'
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Text */}
                            <span
                                className={`relative z-10 font-body text-[10px] sm:text-xs font-semibold tracking-[0.12em] transition-colors duration-200 ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                                    }`}
                            >
                                {item.name}
                            </span>

                            {/* Hover Glow (non-active) */}
                            {!isActive && (
                                <div
                                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
