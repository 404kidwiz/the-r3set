'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { discography } from '@/lib/content';

export default function DiscographyGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {discography.map((item, index) => (
                <motion.div
                    key={`${item.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative aspect-square"
                >
                    <div className="absolute inset-0 bg-zinc-900 rounded-xl overflow-hidden border border-white/5 group-hover:border-accent/50 transition-colors duration-500">
                        {/* Image */}
                        <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
                            <Image
                                src={item.coverUrl}
                                alt={item.title}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <span className="text-accent text-[10px] tracking-[0.2em] font-bold uppercase mb-2">
                                {item.year} — {item.type}
                            </span>
                            <h3 className="text-2xl font-display font-bold text-white mb-1 leading-none uppercase">
                                {item.title}
                            </h3>
                            <p className="text-zinc-400 text-sm font-mono uppercase tracking-widest">
                                {item.artist}
                            </p>
                        </div>

                        {/* Hover Glint */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
