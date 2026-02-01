'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Tag from './Tag';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

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
    const imageRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse parallax for 3D tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

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

            {/* Grain overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
                }}
            />

            <div className="section-container relative">
                {/* Header Info */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block mb-6"
                    >
                        <span
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono tracking-[0.2em] uppercase"
                            style={{
                                background: 'rgba(255, 45, 85, 0.1)',
                                color: 'var(--accent-primary)',
                                border: '1px solid rgba(255, 45, 85, 0.3)',
                                boxShadow: '0 0 30px rgba(255, 45, 85, 0.1)'
                            }}
                        >
                            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                            Coming 2026
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="font-display tracking-[0.1em] mb-3 text-5xl md:text-7xl lg:text-8xl"
                        style={{
                            color: 'var(--fg-primary)',
                            textShadow: '0 0 80px rgba(255, 45, 85, 0.3)'
                        }}
                    >
                        THE R3SET
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="font-mono text-sm tracking-[0.4em] uppercase text-muted"
                    >
                        CHAPTER I
                    </motion.p>
                </div>


                <div
                    className={`
            grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center
            transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
                >
                    {/* Album Artwork Side - Enhanced */}
                    <motion.div
                        ref={imageRef}
                        style={{
                            rotateX: isHovered ? rotateXSpring : 0,
                            rotateY: isHovered ? rotateYSpring : 0,
                            transformPerspective: 1200,
                            transformStyle: 'preserve-3d'
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={handleMouseLeave}
                        className="relative mx-auto w-full max-w-lg cursor-pointer group"
                    >
                        {/* Massive glow behind album */}
                        <div
                            className="absolute -inset-20 rounded-[40px] blur-[100px] opacity-40 transition-opacity duration-700 group-hover:opacity-60"
                            style={{
                                background: 'radial-gradient(circle, rgba(255, 45, 85, 0.4) 0%, rgba(255, 45, 85, 0.1) 50%, transparent 70%)'
                            }}
                        />

                        {/* Vinyl record peeking effect (The "Animated" part) */}
                        <motion.div
                            className="absolute top-1/2 -translate-y-1/2 right-[-15%] w-[90%] aspect-square rounded-full pointer-events-none z-0"
                            style={{
                                background: 'radial-gradient(circle, #1a1a1a 28%, #0d0d0d 50%, #080808 100%)',
                                boxShadow: '-20px 0 60px rgba(0,0,0,0.8)'
                            }}
                            animate={{
                                x: isHovered ? 80 : 40,
                                rotate: 360
                            }}
                            transition={{
                                x: { duration: 0.6, ease: [0.25, 0.1, 0, 1] },
                                rotate: { duration: 8, repeat: Infinity, ease: 'linear' }
                            }}
                        >
                            {/* Vinyl grooves */}
                            <div
                                className="absolute inset-[8%] rounded-full"
                                style={{
                                    background: 'repeating-radial-gradient(circle at center, transparent 0, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 5px)'
                                }}
                            />
                            {/* Label */}
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28%] aspect-square rounded-full flex items-center justify-center border-4 border-[#111]"
                                style={{
                                    background: 'linear-gradient(135deg, #ff2d55 0%, #cc1a40 100%)',
                                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2)'
                                }}
                            >
                                <span className="text-white font-display text-[10px] tracking-wider opacity-90 rotate-90 sm:rotate-0">R3SET</span>
                            </div>
                            {/* Center hole */}
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3%] aspect-square rounded-full bg-black"
                            />
                        </motion.div>

                        {/* Gradient border wrapper */}
                        <div className="gradient-border rounded-xl p-[2px] relative z-10 bg-bg-void shadow-2xl">
                            <div className="relative aspect-square overflow-hidden rounded-xl bg-surface">
                                <Image
                                    src="/album-cover.jpg"
                                    alt="THE R3SET Chapter I Album Artwork"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    priority
                                />

                                {/* Holographic shine effect on hover */}
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.05) 50%, transparent 55%)',
                                    }}
                                    animate={isHovered ? {
                                        x: ['-100%', '200%']
                                    } : {}}
                                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                                />

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
                    </motion.div>

                    {/* Tracklist Side */}
                    <div className="flex flex-col relative z-20">
                        <header className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <Tag variant="limited">
                                    UNRELEASED
                                </Tag>
                                <span className="text-micro font-mono text-muted uppercase tracking-wider">
                                    Official Tracklist
                                </span>
                            </div>
                        </header>

                        {/* Tracklist */}
                        <div
                            className="glass-card p-6 mb-8"
                            role="list"
                            aria-label="Album tracklist preview"
                            style={{
                                background: 'rgba(12, 12, 12, 0.6)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}
                        >
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                                <span className="text-micro font-mono text-muted uppercase tracking-wider">
                                    Sequence
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
                                className="group relative btn-primary flex-1 overflow-hidden"
                                aria-label="Get notified when Chapter I releases"
                            >
                                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <div className="flex items-center justify-center gap-2 relative z-10">
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
                                </div>
                            </button>
                            <button className="btn-secondary flex-1" aria-label="Pre-save on streaming platforms">
                                Pre-Save
                            </button>
                        </div>

                        {/* Release hint */}
                        <p className="text-micro text-muted text-center mt-6 font-mono uppercase tracking-wider">
                            Release date TBA • "The reset you didn't know you needed"
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
