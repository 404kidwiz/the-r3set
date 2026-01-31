// @builder: Trailer modal with focus trap + keyboard nav
// Following ui-ux-pro-max: focus-states (line 37), keyboard-nav (line 40)
'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface TrailerModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoSrc: string;
}

export default function TrailerModal({ isOpen, onClose, videoSrc }: TrailerModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        // Focus trap
        const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements?.[0] as HTMLElement;
        const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement?.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement?.focus();
                    e.preventDefault();
                }
            }
        };

        // Escape to close
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        // Lock body scroll
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleTab);
        document.addEventListener('keydown', handleEscape);
        firstElement?.focus();

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleTab);
            document.removeEventListener('keydown', handleEscape);

            // Pause video on unmount
            if (videoRef.current) {
                videoRef.current.pause();
            }
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalContent = (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 animate-in fade-in duration-300"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-label="Trailer video player"
        >
            <div
                ref={modalRef}
                className="relative w-full max-w-6xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl animate-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label="Close trailer"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Video Player */}
                <video
                    ref={videoRef}
                    className="w-full h-full"
                    src={videoSrc}
                    controls
                    autoPlay
                    playsInline
                    aria-label="THE R3SET album trailer"
                >
                    <track kind="captions" />
                </video>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
