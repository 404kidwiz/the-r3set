'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy load TrailerModal (only loads when user clicks)
const TrailerModal = dynamic(() => import('@/components/TrailerModal'), {
    ssr: false,
});

interface HeroCtaProps {
    trailerSrc: string;
}

export default function HeroCta({ trailerSrc }: HeroCtaProps) {
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    return (
        <>
            {/* CTA Button */}
            <button
                onClick={() => setIsTrailerOpen(true)}
                className="btn-primary gap-2"
                aria-label="Watch album trailer"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Watch Trailer
            </button>

            {/* Trailer Modal */}
            {isTrailerOpen && (
                <TrailerModal
                    isOpen={isTrailerOpen}
                    onClose={() => setIsTrailerOpen(false)}
                    videoSrc={trailerSrc}
                />
            )}
        </>
    );
}
