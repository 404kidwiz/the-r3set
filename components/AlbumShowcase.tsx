'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * AlbumShowcase - Premium Album Cover Art Section
 * Features: Cinematic reveal, 3D perspective, parallax, vinyl slide-out
 */
export default function AlbumShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax and reveal effects
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -10]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

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

    // Album data
    const album = {
        title: "THE R3SET",
        subtitle: "CHAPTER I",
        releaseDate: "2026",
        tagline: '"The reset you didn\'t know you needed"'
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-[150vh] flex items-center justify-center py-16 overflow-hidden"
            style={{ background: 'var(--bg-void)' }}
        >
            {/* Dynamic ambient glow that follows scroll */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity,
                    background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255, 45, 85, 0.1) 0%, transparent 60%)'
                }}
            />

            {/* Grain overlay for film aesthetic */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
                }}
            />

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    style={{ y, opacity }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Coming Soon Tag */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
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
                            Coming {album.releaseDate}
                        </span>
                    </motion.div>

                    {/* Main Album Art Container */}
                    <motion.div
                        ref={imageRef}
                        style={{
                            scale,
                            rotateX: isHovered ? rotateXSpring : rotateX,
                            rotateY: isHovered ? rotateYSpring : 0,
                            transformPerspective: 1200,
                            transformStyle: 'preserve-3d'
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={handleMouseLeave}
                        className="relative mx-auto mb-12 cursor-pointer group"
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
                    >
                        {/* Massive glow behind album */}
                        <div
                            className="absolute -inset-20 rounded-[40px] blur-[100px] opacity-50 transition-opacity duration-700 group-hover:opacity-70"
                            style={{
                                background: 'radial-gradient(circle, rgba(255, 45, 85, 0.4) 0%, rgba(255, 45, 85, 0.1) 50%, transparent 70%)'
                            }}
                        />

                        {/* Album frame with premium border */}
                        <div
                            className="relative aspect-square max-w-xl mx-auto overflow-hidden"
                            style={{
                                borderRadius: '8px',
                                boxShadow: `
                                    0 60px 120px -20px rgba(0, 0, 0, 0.8),
                                    0 30px 60px -10px rgba(255, 45, 85, 0.15),
                                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                                `
                            }}
                        >
                            {/* Gradient border frame */}
                            <div
                                className="absolute -inset-[2px] rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,45,85,0.8) 0%, transparent 40%, transparent 60%, rgba(255,215,0,0.5) 100%)',
                                    zIndex: 0
                                }}
                            />

                            {/* Album cover image */}
                            <div className="relative z-10 w-full h-full rounded-lg overflow-hidden">
                                <Image
                                    src="/album-cover.jpg"
                                    alt="THE R3SET - Chapter I Album Cover"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 600px"
                                />

                                {/* Subtle vignette */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: 'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.4) 100%)'
                                    }}
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
                            </div>

                            {/* Vinyl record peeking effect */}
                            <motion.div
                                className="absolute top-1/2 -translate-y-1/2 right-[-10%] w-[85%] aspect-square rounded-full pointer-events-none z-0"
                                style={{
                                    background: 'radial-gradient(circle, #1a1a1a 28%, #0d0d0d 50%, #080808 100%)',
                                    boxShadow: '-20px 0 60px rgba(0,0,0,0.8)'
                                }}
                                animate={{
                                    x: isHovered ? 60 : 0,
                                    rotate: isHovered ? 15 : 0
                                }}
                                transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
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
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28%] aspect-square rounded-full flex items-center justify-center"
                                    style={{
                                        background: 'linear-gradient(135deg, #ff2d55 0%, #cc1a40 100%)',
                                        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2)'
                                    }}
                                >
                                    <span className="text-white font-display text-[8px] tracking-wider opacity-80">R3SET</span>
                                </div>
                                {/* Center hole */}
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3%] aspect-square rounded-full"
                                    style={{ background: '#000' }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Title and Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-center"
                    >
                        <h2
                            className="font-display tracking-[0.1em] mb-3"
                            style={{
                                fontSize: 'clamp(3rem, 10vw, 7rem)',
                                color: 'var(--fg-primary)',
                                textShadow: '0 0 80px rgba(255, 45, 85, 0.3)'
                            }}
                        >
                            {album.title}
                        </h2>
                        <p
                            className="font-mono text-sm tracking-[0.4em] uppercase mb-10"
                            style={{ color: 'var(--fg-muted)' }}
                        >
                            {album.subtitle}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative px-10 py-4 font-body font-semibold text-sm tracking-wider uppercase overflow-hidden rounded-sm transition-shadow"
                                style={{
                                    background: 'var(--accent-primary)',
                                    color: 'white',
                                    boxShadow: '0 20px 60px rgba(255, 45, 85, 0.4)'
                                }}
                            >
                                {/* Shine sweep */}
                                <span
                                    className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                                />
                                <span className="relative z-10">Pre-Save Now</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02, borderColor: 'var(--accent-primary)' }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-4 font-body font-medium text-sm tracking-wider uppercase rounded-sm transition-all"
                                style={{
                                    background: 'transparent',
                                    color: 'var(--fg-primary)',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                Notify Me
                            </motion.button>
                        </div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="font-body text-lg italic"
                            style={{ color: 'var(--fg-subtle)' }}
                        >
                            {album.tagline}
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
