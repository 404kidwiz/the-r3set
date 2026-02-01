'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play, Disc3, Music, Award } from 'lucide-react';
import { discography } from '@/lib/content';

type FilterType = 'all' | 'album' | 'single' | 'produce';

const filterLabels: Record<FilterType, string> = {
    all: 'All',
    album: 'Albums',
    single: 'Singles',
    produce: 'Produced'
};

/**
 * DiscographySection - Premium Bento Grid Layout
 * Features: Mixed-size cards, vinyl hover effect, type badges
 */
export default function DiscographySection() {
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');

    const filteredItems = discography.filter(item =>
        activeFilter === 'all' || item.type === activeFilter
    );

    // Mix featured (larger) and regular items for bento effect
    const featuredItems = filteredItems.slice(0, 2);
    const regularItems = filteredItems.slice(2, 14);

    return (
        <section
            id="discography"
            aria-labelledby="discography-heading"
            className="relative py-32 overflow-hidden"
            style={{ background: 'var(--bg-void)' }}
        >
            {/* Subtle ambient glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-20 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse, rgba(255, 45, 85, 0.1) 0%, transparent 70%)'
                }}
            />

            <div className="container mx-auto px-4 sm:px-6">
                {/* Header with Filter */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p
                            className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
                            style={{ color: 'var(--accent-primary)' }}
                        >
                            Selected Works
                        </p>
                        <h2
                            id="discography-heading"
                            className="font-display text-6xl sm:text-7xl md:text-8xl tracking-wider"
                            style={{ color: 'var(--fg-primary)' }}
                        >
                            DISCOGRAPHY_
                        </h2>
                        <p
                            className="font-mono text-sm tracking-widest uppercase mt-2"
                            style={{ color: 'var(--fg-subtle)' }}
                        >
                            2011 — 2026
                        </p>
                    </motion.div>

                    {/* Filter Pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap gap-2"
                    >
                        {(Object.keys(filterLabels) as FilterType[]).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 font-body text-xs font-medium uppercase tracking-wider rounded-sm transition-all duration-300 ${activeFilter === filter
                                        ? 'text-white'
                                        : 'text-fg-muted hover:text-white'
                                    }`}
                                style={{
                                    background: activeFilter === filter
                                        ? 'var(--accent-primary)'
                                        : 'var(--bg-surface)',
                                    border: `1px solid ${activeFilter === filter
                                        ? 'var(--accent-primary)'
                                        : 'rgba(255,255,255,0.1)'}`
                                }}
                            >
                                {filterLabels[filter]}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Featured Items - Larger */}
                    {featuredItems.map((item, index) => (
                        <motion.div
                            key={`featured-${item.title}-${item.year}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="col-span-2 row-span-2"
                        >
                            <AlbumCard item={item} size="large" />
                        </motion.div>
                    ))}

                    {/* Regular Items */}
                    {regularItems.map((item, index) => (
                        <motion.div
                            key={`regular-${item.title}-${item.year}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                        >
                            <AlbumCard item={item} size="small" />
                        </motion.div>
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <button
                        className="group inline-flex items-center gap-3 px-8 py-4 font-body font-medium text-sm tracking-wider uppercase rounded-sm transition-all hover:border-accent"
                        style={{
                            background: 'transparent',
                            color: 'var(--fg-primary)',
                            border: '1px solid rgba(255,255,255,0.15)'
                        }}
                    >
                        <Disc3 className="w-4 h-4 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
                        View Full Discography
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

// Premium Album Card Component
interface AlbumCardProps {
    item: typeof discography[0];
    size: 'large' | 'small';
}

function AlbumCard({ item, size }: AlbumCardProps) {
    const isLarge = size === 'large';

    const typeIcons: Record<string, typeof Music> = {
        album: Disc3,
        single: Music,
        produce: Award
    };

    const TypeIcon = typeIcons[item.type] || Music;

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative w-full overflow-hidden rounded-lg cursor-pointer text-left ${isLarge ? 'aspect-square' : 'aspect-square'
                }`}
            style={{
                background: 'var(--bg-surface)',
                boxShadow: 'var(--shadow-card)'
            }}
            aria-label={`${item.title} by ${item.artist} (${item.year})`}
        >
            {/* Album Cover */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={item.coverUrl}
                    alt={`${item.title} album cover`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Gradient overlay */}
                <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                        background: isLarge
                            ? 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)'
                            : 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
                    }}
                />
            </div>

            {/* Type Badge */}
            <div
                className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-sm"
                style={{
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)'
                }}
            >
                <TypeIcon className="w-3 h-3" style={{ color: 'var(--accent-primary)' }} />
                <span
                    className="font-mono text-[10px] uppercase tracking-wider"
                    style={{ color: 'var(--fg-muted)' }}
                >
                    {item.type === 'produce' ? 'Produced' : item.type}
                </span>
            </div>

            {/* Year Badge */}
            <div
                className="absolute top-3 right-3 z-10 px-2 py-1 rounded-sm font-mono text-[10px] tracking-wider"
                style={{
                    background: 'var(--accent-primary)',
                    color: 'white'
                }}
            >
                {item.year}
            </div>

            {/* Content */}
            <div className={`absolute bottom-0 left-0 right-0 z-10 ${isLarge ? 'p-6' : 'p-4'}`}>
                <h3
                    className={`font-display tracking-wider line-clamp-2 mb-1 group-hover:text-accent transition-colors ${isLarge ? 'text-2xl sm:text-3xl' : 'text-sm sm:text-base'
                        }`}
                    style={{ color: 'var(--fg-primary)' }}
                >
                    {item.title}
                </h3>
                <p
                    className={`font-body line-clamp-1 ${isLarge ? 'text-sm' : 'text-xs'}`}
                    style={{ color: 'var(--fg-muted)' }}
                >
                    {item.artist}
                </p>
            </div>

            {/* Vinyl Peek Effect on Hover */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 -right-1/4 w-3/4 aspect-square rounded-full opacity-0 group-hover:opacity-100 group-hover:right-[-15%] transition-all duration-500 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, #1a1a1a 30%, #0a0a0a 60%, #050505 100%)',
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
                }}
            >
                {/* Vinyl grooves */}
                <div
                    className="absolute inset-[10%] rounded-full"
                    style={{
                        background: 'repeating-radial-gradient(circle at center, transparent 0, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)'
                    }}
                />
                {/* Center label */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 aspect-square rounded-full"
                    style={{ background: 'var(--accent-primary)' }}
                />
            </motion.div>

            {/* Play Button on Hover */}
            {item.youtubeId && (
                <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                >
                    <div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{
                            background: 'var(--accent-primary)',
                            boxShadow: '0 0 30px var(--glow-primary)'
                        }}
                    >
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                </div>
            )}
        </motion.button>
    );
}
