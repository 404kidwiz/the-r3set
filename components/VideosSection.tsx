'use client';

import { motion } from 'framer-motion';
import { videos } from '@/lib/content';
import { Play } from 'lucide-react';
import Image from 'next/image';

/**
 * Videos section for single-page scroll layout
 * Displays music videos in a responsive grid with hover effects
 */
export default function VideosSection() {
    return (
        <div className="section-spacing px-4 sm:px-8">
            <div className="max-w-[1440px] mx-auto">
                {/* Section Header */}
                <header className="mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent mb-4 block">
                            Visual Archive
                        </span>
                        <h2 id="videos-heading" className="text-h1 font-display font-bold uppercase mb-4">
                            <span className="text-zinc-700">The</span>{' '}
                            <span className="text-white">Videography</span>
                        </h2>
                        <div className="h-1 w-24 bg-accent" />
                    </motion.div>
                </header>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {videos.map((video, idx) => (
                        <motion.div
                            key={video.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="group relative aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-white/5"
                        >
                            {/* Thumbnail */}
                            <div className="relative w-full h-full">
                                <Image
                                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                                    alt={video.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" aria-hidden="true" />
                                    </div>
                                </div>
                            </div>

                            {/* Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-white mb-1">
                                            {video.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm font-mono text-accent uppercase tracking-wider line-clamp-1">
                                            {video.artist}
                                        </p>
                                    </div>
                                    <span className="hidden sm:block px-3 py-1 text-[10px] font-bold border border-white/20 rounded-full uppercase tracking-widest text-white/60 shrink-0">
                                        {video.type}
                                    </span>
                                </div>
                            </div>

                            {/* Link Wrapper */}
                            <a
                                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 z-10"
                                aria-label={`Watch ${video.title} on YouTube (opens in new tab)`}
                            >
                                <span className="sr-only">External link</span>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
