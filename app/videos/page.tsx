'use client';

import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { videos } from '@/lib/content';
import { Play } from 'lucide-react';
import Image from 'next/image';

export default function VideosPage() {
    return (
        <main className="min-h-screen bg-black pt-32 pb-24 px-4">
            <Navigation />

            <div className="max-w-[1440px] mx-auto">
                <header className="mb-24 px-4 md:px-0">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-h1 font-display font-bold uppercase mb-4"
                    >
                        <span className="text-zinc-700">The</span> <span className="text-white">Videography</span>
                    </motion.h1>
                    <div className="h-1 w-24 bg-accent" />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {videos.map((video, idx) => (
                        <motion.div
                            key={video.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-white/5"
                        >
                            {/* Thumbnail Placeholder (Using YouTube thumbnail) */}
                            <div className="relative w-full h-full">
                                <Image
                                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                                    alt={video.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <h3 className="text-2xl font-display font-bold uppercase text-white mb-1">{video.title}</h3>
                                        <p className="text-sm font-mono text-accent uppercase tracking-wider">{video.artist}</p>
                                    </div>
                                    <span className="px-3 py-1 text-[10px] font-bold border border-white/20 rounded-full uppercase tracking-widest text-white/60">
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
                                aria-label={`Watch ${video.title}`}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
