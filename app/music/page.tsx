'use client';

import Navigation from '@/components/Navigation';
import DiscographyGrid from '@/components/DiscographyGrid';
import { motion } from 'framer-motion';

export default function MusicPage() {
    return (
        <main className="min-h-screen bg-black pt-32 pb-24 px-4">
            <Navigation />

            <div className="max-w-[1600px] mx-auto">
                <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 px-4">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-h1 font-display font-bold uppercase mb-2"
                        >
                            Discography
                        </motion.h1>
                        <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">
                            Selected Works 2011—2026
                        </p>
                    </div>

                    <div className="flex gap-4">
                        {['Albums', 'Singles', 'Produced'].map((filter) => (
                            <button
                                key={filter}
                                className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase text-zinc-400 hover:text-white hover:border-accent transition-colors"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </header>

                <DiscographyGrid />
            </div>
        </main>
    );
}
