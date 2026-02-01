'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { galleryPhotos } from '@/lib/content';
import { useState, useEffect, useRef } from 'react';

export default function PhotoGallerySection() {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Focus trap management for lightbox modal - WCAG 2.1 AA
    useEffect(() => {
        if (selectedPhoto) {
            // Store currently focused element
            previousFocusRef.current = document.activeElement as HTMLElement;

            // Focus modal after animation completes
            const focusTimeout = setTimeout(() => {
                modalRef.current?.focus();
            }, 100);

            // Prevent background scroll
            document.body.style.overflow = 'hidden';

            // Handle Escape key
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    setSelectedPhoto(null);
                }
            };

            // Handle Tab key for focus trap
            const handleTab = (e: KeyboardEvent) => {
                if (e.key === 'Tab' && modalRef.current) {
                    const focusableElements = modalRef.current.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0] as HTMLElement;
                    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                    if (e.shiftKey) {
                        // Shift+Tab: if on first element, wrap to last
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement?.focus();
                        }
                    } else {
                        // Tab: if on last element, wrap to first
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement?.focus();
                        }
                    }
                }
            };

            document.addEventListener('keydown', handleEscape);
            document.addEventListener('keydown', handleTab);

            return () => {
                clearTimeout(focusTimeout);
                document.removeEventListener('keydown', handleEscape);
                document.removeEventListener('keydown', handleTab);
                document.body.style.overflow = '';

                // Restore focus to previously focused element
                if (previousFocusRef.current) {
                    previousFocusRef.current.focus();
                }
            };
        }
    }, [selectedPhoto]);


    return (
        <div className="section-spacing px-4 sm:px-8 relative">
            <div className="max-w-[1800px] mx-auto">
                {/* Section Header */}
                <header className="mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent mb-4 block">
                            Behind The Boards
                        </span>
                        <h2 id="gallery-heading" className="text-h1 font-display font-bold uppercase mb-2">
                            Gallery
                        </h2>
                        <p className="text-zinc-300 font-mono text-sm tracking-widest uppercase">
                            Studio Sessions • Behind The Scenes • The Archive
                        </p>
                    </motion.div>
                </header>

                {/* Masonry Grid */}
                <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                    {galleryPhotos.map((photo, idx) => (
                        <motion.div
                            key={photo}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: (idx % 12) * 0.05, duration: 0.5 }}
                            className="break-inside-avoid mb-4"
                        >
                            <div
                                className="relative group cursor-pointer overflow-hidden rounded-lg border border-white/5 hover:border-accent/50 transition-all duration-300"
                                onClick={() => setSelectedPhoto(photo)}
                            >
                                <Image
                                    src={photo}
                                    alt={`Mike WiLL Made-It gallery ${idx + 1}`}
                                    width={600}
                                    height={800}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedPhoto && (
                <motion.div
                    ref={modalRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="lightbox-title"
                    tabIndex={-1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 focus:outline-none"
                    onClick={() => setSelectedPhoto(null)}
                >
                    {/* Hidden title for screen readers */}
                    <h2 id="lightbox-title" className="sr-only">Gallery image viewer</h2>

                    <button
                        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/10 transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        onClick={() => setSelectedPhoto(null)}
                        aria-label="Close lightbox"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <Image
                            src={selectedPhoto}
                            alt="Gallery photo fullsize"
                            width={1920}
                            height={1080}
                            className="max-w-full max-h-full object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </motion.div>
            )}
        </div>
    );
}
