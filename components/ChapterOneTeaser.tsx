'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Tag from './Tag';

// Rumored/placeholder tracks for Chapter I
const KNOWN_TRACKS = [
    { id: 1, title: 'Intro: The Reset', duration: '1:42' },
    { id: 2, title: 'Ric Flair Drip 2.0', duration: '3:18' },
    { id: 3, title: 'Gucci on My', duration: '2:54' },
    { id: 4, title: 'What That Speed Bout?!', duration: '3:05' },
    { id: 5, title: 'Nothin\' 2 Talk About', duration: '3:22' },
];

// Generates random hex-style track codes
function generateTrackCode(): string {
    const chars = '0123456789ABCDEF';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

// Generates random duration
function generateDuration(): string {
    const min = Math.floor(Math.random() * 4) + 2;
    const sec = Math.floor(Math.random() * 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

// Generate dynamic tracks with scrambling codes
const DYNAMIC_TRACK_COUNT = 7;

interface Track {
    id: number;
    title: string;
    duration: string;
    isEncrypted: boolean;
}

/**
 * Chapter I Album Teaser Component
 * Features "Coming Soon" styling with animated tracklist
 * @design-system Uses glassmorphism, gradient borders, mono font for codes
 * @accessibility Proper ARIA labels, reduced-motion support
 */
export default function ChapterOneTeaser() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize tracks
    useEffect(() => {
        const initialTracks: Track[] = [
            ...KNOWN_TRACKS.map((t, i) => ({ ...t, isEncrypted: false })),
            ...Array.from({ length: DYNAMIC_TRACK_COUNT }, (_, i) => ({
                id: KNOWN_TRACKS.length + i + 1,
                title: `[${generateTrackCode()}]`,
                duration: generateDuration(),
                isEncrypted: true,
            })),
        ];
        setTracks(initialTracks);
    }, []);

    // Scramble encrypted track codes periodically
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const interval = setInterval(() => {
            setTracks((prev) =>
                prev.map((track) =>
                    track.isEncrypted
                        ? { ...track, title: `[${generateTrackCode()}]` }
                        : track
                )
            );
        }, 150);

        return () => clearInterval(interval);
    }, []);

    // Intersection observer for fade-in animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const totalTracks = tracks.length;

    return (
        <section
            ref={containerRef}
            id="chapter-one"
            className="section-spacing relative overflow-hidden"
            aria-label="Chapter I Album Preview"
        >
            {/* Ambient glow background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 50% 30%, rgba(255, 56, 100, 0.08) 0%, transparent 60%)',
                }}
                aria-hidden="true"
            />

            <div className="section-container relative">
                <div
                    className={`
            grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start
            transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
                >
                    {/* Album Artwork Side */}
                    <div className="relative group">
                        {/* Gradient border wrapper */}
                        <div className="gradient-border rounded-xl p-[2px]">
                            <div className="relative aspect-square overflow-hidden rounded-xl bg-surface">
                                <Image
                                    src="/album-cover.jpg"
                                    alt="THE R3SET Chapter I Album Artwork"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    priority
                                />

                                {/* Coming Soon overlay */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/60 backdrop-blur-sm">
                                    <Tag variant="drop" className="mb-4 animate-pulse">
                                        COMING SOON
                                    </Tag>
                                    <span className="text-micro font-mono text-muted uppercase tracking-widest">
                                        2026
                                    </span>
                                </div>

                                {/* Scan line effect */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-30"
                                    style={{
                                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                                    }}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>

                        {/* Floating label */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-card px-6 py-3">
                            <span className="text-small font-semibold text-gradient-hero">
                                Chapter I
                            </span>
                        </div>
                    </div>

                    {/* Tracklist Side */}
                    <div className="flex flex-col">
                        <header className="mb-8">
                            <Tag variant="limited" className="mb-4">
                                UNRELEASED
                            </Tag>
                            <h2 id="chapter-one-heading" className="text-h1 font-display mb-2">THE R3SET</h2>
                            <p className="text-h3 text-muted">Chapter I</p>
                        </header>

                        {/* Tracklist */}
                        <div
                            className="glass-card p-6 mb-6"
                            role="list"
                            aria-label="Album tracklist preview"
                        >
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-stroke">
                                <span className="text-micro font-mono text-muted uppercase tracking-wider">
                                    Tracklist
                                </span>
                                <span className="text-micro font-mono text-muted">
                                    {totalTracks} TRACKS
                                </span>
                            </div>

                            <ol className="space-y-3" aria-label="Track listing">
                                {tracks.map((track, index) => (
                                    <li
                                        key={track.id}
                                        className={`
                      flex items-center justify-between gap-4 py-2 px-3 rounded-lg
                      transition-all duration-200
                      ${track.isEncrypted
                                                ? 'bg-surface-2/50 hover:bg-surface-2'
                                                : 'hover:bg-surface-2/30'
                                            }
                    `}
                                        role="listitem"
                                        style={{
                                            transitionDelay: `${index * 50}ms`,
                                            opacity: isVisible ? 1 : 0,
                                            transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                                        }}
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            <span
                                                className={`
                          w-8 text-right text-small shrink-0
                          ${track.isEncrypted ? 'font-mono text-muted' : 'text-fg'}
                        `}
                                            >
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span
                                                className={`
                          truncate
                          ${track.isEncrypted
                                                        ? 'font-mono text-muted text-small tracking-wider'
                                                        : 'font-medium text-fg'
                                                    }
                        `}
                                            >
                                                {track.title}
                                            </span>
                                        </div>
                                        <span className="text-small text-muted shrink-0 font-mono">
                                            {track.duration}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Teaser CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                className="btn-primary flex-1"
                                aria-label="Get notified when Chapter I releases"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                                Notify Me
                            </button>
                            <button className="btn-secondary flex-1" aria-label="Pre-save on streaming platforms">
                                Pre-Save
                            </button>
                        </div>

                        {/* Release hint */}
                        <p className="text-micro text-muted text-center mt-6 font-mono uppercase tracking-wider">
                            Release date TBA • Pre-save available soon
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
