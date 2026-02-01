'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play, Film, Camera, ExternalLink, X } from 'lucide-react';
import { videos, galleryPhotos } from '@/lib/content';
import Image from 'next/image';

/**
 * MediaSection - Editorial Magazine Layout
 * Merged videos + photos with film aesthetic
 */
export default function MediaSection() {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'videos' | 'photos'>('videos');

    // Featured video (most recent)
    const featuredVideo = videos[0];
    const sidebarVideos = videos.slice(1, 4);
    const gridVideos = videos.slice(4, 10);

    return (
        <section
            id="media"
            aria-labelledby="media-heading"
            className="relative py-32 overflow-hidden"
            style={{ background: 'var(--bg-void)' }}
        >
            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <p
                        className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
                        style={{ color: 'var(--accent-primary)' }}
                    >
                        Visual Archive
                    </p>
                    <h2
                        id="media-heading"
                        className="font-display text-6xl sm:text-7xl md:text-8xl tracking-wider mb-4"
                        style={{ color: 'var(--fg-primary)' }}
                    >
                        THE ARCHIVE_
                    </h2>

                    {/* Tab Switcher */}
                    <div className="flex gap-1 mt-8">
                        <button
                            onClick={() => setActiveTab('videos')}
                            className={`flex items-center gap-2 px-5 py-2.5 font-body text-sm font-medium uppercase tracking-wider rounded-sm transition-all ${activeTab === 'videos' ? 'text-white' : 'text-fg-muted hover:text-white'
                                }`}
                            style={{
                                background: activeTab === 'videos' ? 'var(--accent-primary)' : 'var(--bg-surface)',
                                border: `1px solid ${activeTab === 'videos' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}`
                            }}
                        >
                            <Film className="w-4 h-4" />
                            Videos
                        </button>
                        <button
                            onClick={() => setActiveTab('photos')}
                            className={`flex items-center gap-2 px-5 py-2.5 font-body text-sm font-medium uppercase tracking-wider rounded-sm transition-all ${activeTab === 'photos' ? 'text-white' : 'text-fg-muted hover:text-white'
                                }`}
                            style={{
                                background: activeTab === 'photos' ? 'var(--accent-primary)' : 'var(--bg-surface)',
                                border: `1px solid ${activeTab === 'photos' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}`
                            }}
                        >
                            <Camera className="w-4 h-4" />
                            Photos
                        </button>
                    </div>
                </motion.div>

                {/* Videos Tab */}
                {activeTab === 'videos' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Featured + Sidebar Layout */}
                        <div className="grid lg:grid-cols-3 gap-6 mb-8">
                            {/* Featured Video - 2/3 width */}
                            <motion.a
                                href={`https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="lg:col-span-2 group relative aspect-video overflow-hidden rounded-lg"
                                style={{
                                    background: 'var(--bg-surface)',
                                    boxShadow: 'var(--shadow-xl)'
                                }}
                                aria-label={`Watch ${featuredVideo.title} on YouTube (opens in new tab)`}
                            >
                                {/* Thumbnail */}
                                <img
                                    src={`https://img.youtube.com/vi/${featuredVideo.youtubeId}/maxresdefault.jpg`}
                                    alt={featuredVideo.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Overlay */}
                                <div
                                    className="absolute inset-0 transition-opacity duration-300"
                                    style={{
                                        background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 50%)'
                                    }}
                                />

                                {/* Featured Badge */}
                                <div
                                    className="absolute top-4 left-4 px-3 py-1 rounded-sm font-mono text-xs uppercase tracking-wider"
                                    style={{
                                        background: 'var(--accent-primary)',
                                        color: 'white'
                                    }}
                                >
                                    Featured
                                </div>

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div
                                        className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                            background: 'rgba(255, 45, 85, 0.9)',
                                            boxShadow: '0 0 40px var(--glow-primary)'
                                        }}
                                    >
                                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <p
                                        className="font-mono text-xs uppercase tracking-wider mb-2"
                                        style={{ color: 'var(--accent-primary)' }}
                                    >
                                        {featuredVideo.type} • {featuredVideo.year}
                                    </p>
                                    <h3
                                        className="font-display text-2xl sm:text-3xl tracking-wider mb-1"
                                        style={{ color: 'var(--fg-primary)' }}
                                    >
                                        {featuredVideo.title}
                                    </h3>
                                    <p
                                        className="font-body text-sm"
                                        style={{ color: 'var(--fg-muted)' }}
                                    >
                                        {featuredVideo.artist}
                                    </p>
                                </div>
                            </motion.a>

                            {/* Sidebar Videos */}
                            <div className="flex flex-col gap-4">
                                {sidebarVideos.map((video, index) => (
                                    <motion.a
                                        key={video.youtubeId}
                                        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group relative aspect-video overflow-hidden rounded-lg flex-1"
                                        style={{
                                            background: 'var(--bg-surface)',
                                            boxShadow: 'var(--shadow-card)'
                                        }}
                                        aria-label={`Watch ${video.title} on YouTube (opens in new tab)`}
                                    >
                                        <img
                                            src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 60%)'
                                            }}
                                        />

                                        {/* Play icon */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                                style={{
                                                    background: 'var(--accent-primary)',
                                                    boxShadow: '0 0 20px var(--glow-primary)'
                                                }}
                                            >
                                                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                                            </div>
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                            <h4
                                                className="font-body font-semibold text-xs line-clamp-1"
                                                style={{ color: 'var(--fg-primary)' }}
                                            >
                                                {video.title}
                                            </h4>
                                            <p
                                                className="font-mono text-[10px] uppercase tracking-wider"
                                                style={{ color: 'var(--fg-subtle)' }}
                                            >
                                                {video.year}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Video Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {gridVideos.map((video, index) => (
                                <motion.a
                                    key={video.youtubeId}
                                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="group relative aspect-video overflow-hidden rounded-lg"
                                    style={{
                                        background: 'var(--bg-surface)',
                                        boxShadow: 'var(--shadow-card)'
                                    }}
                                    aria-label={`Watch ${video.title} on YouTube (opens in new tab)`}
                                >
                                    <img
                                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />

                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                        style={{ background: 'rgba(0,0,0,0.6)' }}
                                    >
                                        <Play className="w-8 h-8 text-white fill-white" />
                                    </div>

                                    <div
                                        className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <p
                                            className="font-mono text-[10px] uppercase tracking-wider line-clamp-1"
                                            style={{ color: 'white' }}
                                        >
                                            {video.title}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Photos Tab */}
                {activeTab === 'photos' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Masonry-style Photo Grid */}
                        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                            {galleryPhotos.slice(0, 16).map((photo, index) => (
                                <motion.button
                                    key={photo}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.03 }}
                                    onClick={() => setSelectedPhoto(photo)}
                                    className="group relative w-full overflow-hidden rounded-lg cursor-pointer break-inside-avoid"
                                    style={{
                                        boxShadow: 'var(--shadow-card)'
                                    }}
                                >
                                    <img
                                        src={photo}
                                        alt={`Mike WiLL Made-It photo ${index + 1}`}
                                        className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                                        loading="lazy"
                                        style={{
                                            filter: 'grayscale(20%)'
                                        }}
                                    />

                                    {/* Film grain overlay */}
                                    <div
                                        className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay"
                                        style={{
                                            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
                                        }}
                                    />

                                    {/* Hover overlay */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                        style={{ background: 'rgba(0,0,0,0.4)' }}
                                    >
                                        <Camera className="w-6 h-6 text-white" />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.95)' }}
                    onClick={() => setSelectedPhoto(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo lightbox"
                >
                    <button
                        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                        onClick={() => setSelectedPhoto(null)}
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                    <img
                        src={selectedPhoto}
                        alt="Full size photo"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </section>
    );
}
