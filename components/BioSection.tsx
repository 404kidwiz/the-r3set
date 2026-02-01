'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Twitter, Youtube, Music2, ExternalLink } from 'lucide-react';
import { bio } from '@/lib/content';

// Timeline milestones
const milestones = [
    { year: '2011', title: 'Tupac Back', desc: 'First major hit' },
    { year: '2013', title: 'Grammy Nom', desc: 'Producer of Year' },
    { year: '2016', title: 'Formation', desc: 'Beyoncé collab' },
    { year: '2017', title: 'HUMBLE.', desc: 'Kendrick era' },
    { year: '2024', title: 'Dirty Nachos', desc: 'Chief Keef album' },
    { year: '2026', title: 'THE R3SET', desc: 'The new era' }
];

/**
 * BioSection - Editorial Feature Spread
 * Premium layout with timeline and social links
 */
export default function BioSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section
            ref={containerRef}
            id="bio"
            aria-labelledby="bio-heading"
            className="relative py-32 overflow-hidden"
            style={{ background: 'var(--bg-void)' }}
        >
            {/* Ambient background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    background: 'radial-gradient(ellipse 100% 50% at 0% 50%, rgba(255, 45, 85, 0.08) 0%, transparent 50%)'
                }}
            />

            <div className="container mx-auto px-4 sm:px-6">
                {/* Pull Quote Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <p
                        className="font-mono text-xs tracking-[0.3em] uppercase mb-6"
                        style={{ color: 'var(--accent-primary)' }}
                    >
                        Est. 2011
                    </p>
                    <h2
                        id="bio-heading"
                        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider leading-[0.9] max-w-5xl mx-auto"
                        style={{ color: 'var(--fg-primary)' }}
                    >
                        "THE ARCHITECT
                        <br />
                        <span style={{ color: 'var(--accent-primary)' }}>OF THE SOUND"</span>
                    </h2>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
                    {/* Portrait Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{ y }}
                        className="relative"
                    >
                        <div
                            className="relative aspect-[3/4] rounded-lg overflow-hidden"
                            style={{
                                boxShadow: 'var(--shadow-xl)'
                            }}
                        >
                            {/* Placeholder - use actual portrait */}
                            <div
                                className="w-full h-full"
                                style={{
                                    background: 'linear-gradient(145deg, #1a1a2e 0%, #0c0c10 50%, #1a0a10 100%)'
                                }}
                            >
                                <img
                                    src="/gallery/dustdigital-242.JPG"
                                    alt="Mike WiLL Made-It portrait"
                                    className="w-full h-full object-cover"
                                    style={{ filter: 'grayscale(30%) contrast(1.1)' }}
                                />
                            </div>

                            {/* Film grain overlay */}
                            <div
                                className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                                style={{
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
                                }}
                            />

                            {/* Gradient overlay */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, transparent 30%)'
                                }}
                            />
                        </div>

                        {/* Floating accent */}
                        <div
                            className="absolute -bottom-6 -right-6 w-32 h-32 rounded-lg -z-10"
                            style={{
                                background: 'var(--accent-primary)',
                                opacity: 0.2
                            }}
                        />
                    </motion.div>

                    {/* Bio Text Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:pt-12"
                    >
                        <h3
                            className="font-display text-3xl sm:text-4xl tracking-wider mb-6"
                            style={{ color: 'var(--fg-primary)' }}
                        >
                            MIKE WILL MADE-IT
                        </h3>

                        <div className="space-y-6">
                            <p
                                className="font-body text-lg leading-relaxed"
                                style={{ color: 'var(--fg-secondary)' }}
                            >
                                {bio.summary}
                            </p>

                            {bio.sections.map((section, index) => (
                                <motion.div
                                    key={section.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                >
                                    <h4
                                        className="font-display text-xl tracking-wider mb-2"
                                        style={{ color: 'var(--accent-primary)' }}
                                    >
                                        {section.title}
                                    </h4>
                                    <p
                                        className="font-body text-base leading-relaxed"
                                        style={{ color: 'var(--fg-muted)' }}
                                    >
                                        {section.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex flex-wrap gap-3 mt-10"
                        >
                            <SocialLink
                                href={bio.socials.instagram.url}
                                icon={Instagram}
                                label="Instagram"
                            />
                            <SocialLink
                                href={bio.socials.twitter.url}
                                icon={Twitter}
                                label="X (Twitter)"
                            />
                            <SocialLink
                                href={bio.socials.youtube.url}
                                icon={Youtube}
                                label="YouTube"
                            />
                            <SocialLink
                                href={bio.socials.spotify.url}
                                icon={Music2}
                                label="Spotify"
                            />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Horizontal Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative"
                >
                    <h3
                        className="font-display text-2xl tracking-wider mb-12 text-center"
                        style={{ color: 'var(--fg-primary)' }}
                    >
                        THE JOURNEY
                    </h3>

                    {/* Timeline Container */}
                    <div className="relative overflow-x-auto pb-4 scrollbar-hide">
                        <div className="flex items-center justify-between min-w-max px-4">
                            {/* Timeline Line */}
                            <div
                                className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
                                style={{ background: 'rgba(255,255,255,0.1)' }}
                            />

                            {/* Progress Line */}
                            <motion.div
                                className="absolute top-1/2 left-0 h-px -translate-y-1/2"
                                style={{
                                    background: 'var(--accent-primary)',
                                    width: '85%'
                                }}
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.3 }}
                            />

                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    className="relative flex flex-col items-center px-6 lg:px-10"
                                >
                                    {/* Dot */}
                                    <div
                                        className="w-4 h-4 rounded-full z-10 mb-4"
                                        style={{
                                            background: index === milestones.length - 1
                                                ? 'var(--accent-secondary)'
                                                : 'var(--accent-primary)',
                                            boxShadow: `0 0 20px ${index === milestones.length - 1
                                                ? 'var(--glow-gold)'
                                                : 'var(--glow-primary)'}`
                                        }}
                                    />

                                    {/* Year */}
                                    <span
                                        className="font-mono text-xs font-bold tracking-wider mb-1"
                                        style={{ color: 'var(--accent-primary)' }}
                                    >
                                        {milestone.year}
                                    </span>

                                    {/* Title */}
                                    <span
                                        className="font-display text-lg tracking-wider text-center"
                                        style={{ color: 'var(--fg-primary)' }}
                                    >
                                        {milestone.title}
                                    </span>

                                    {/* Description */}
                                    <span
                                        className="font-body text-xs text-center mt-1"
                                        style={{ color: 'var(--fg-subtle)' }}
                                    >
                                        {milestone.desc}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Social Link Component
interface SocialLinkProps {
    href: string;
    icon: typeof Instagram;
    label: string;
}

function SocialLink({ href, icon: Icon, label }: SocialLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2.5 rounded-sm transition-all hover:scale-105"
            style={{
                background: 'var(--bg-surface)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}
            aria-label={`${label} (opens in new tab)`}
        >
            <Icon
                className="w-4 h-4 transition-colors group-hover:text-accent"
                style={{ color: 'var(--fg-muted)' }}
            />
            <span
                className="font-mono text-xs uppercase tracking-wider transition-colors group-hover:text-white"
                style={{ color: 'var(--fg-subtle)' }}
            >
                {label}
            </span>
        </a>
    );
}
