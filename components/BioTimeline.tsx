'use client';

import { motion } from 'framer-motion';
import { bio } from '@/lib/content';

export default function BioTimeline() {
    return (
        <section className="relative max-w-4xl mx-auto py-24 px-6">
            {/* Intro */}
            <div className="mb-24 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-accent tracking-[0.5em] text-sm font-bold uppercase mb-4"
                >
                    {bio.headline}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl md:text-4xl font-display font-light leading-tight text-white/90"
                >
                    {bio.summary}
                </motion.p>
            </div>

            {/* Timeline */}
            <div className="space-y-32">
                {bio.sections.map((section, index) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
                    >
                        {/* Visual indicator */}
                        <div className="hidden md:flex w-24 h-24 shrink-0 items-center justify-center border border-white/10 rounded-full bg-black/50 backdrop-blur-sm relative">
                            <div className="w-2 h-2 bg-accent rounded-full absolute" />
                            <div className="w-full h-full border border-accent/20 rounded-full animate-ping opacity-20" />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 glass-card p-8 md:p-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-display text-8xl font-bold transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                                {index + 1}
                            </div>

                            <h3 className="text-3xl font-display font-bold text-white mb-6 uppercase">
                                {section.title}
                            </h3>
                            <p className="text-zinc-400 leading-relaxed text-lg">
                                {section.content}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Awards */}
            <div className="mt-32 pt-16 border-t border-white/10">
                <h3 className="text-center font-mono uppercase tracking-[0.2em] text-zinc-500 mb-12">Accolades</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {bio.awards.map((award, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center group"
                        >
                            <div className="text-accent font-bold text-xl mb-2 group-hover:scale-110 transition-transform duration-300">{award.year}</div>
                            <div className="text-white/80 font-display text-sm uppercase">{award.title}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
