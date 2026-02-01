'use client';

import Navigation from '@/components/Navigation';
import BioTimeline from '@/components/BioTimeline';
import { motion } from 'framer-motion';

export default function BioPage() {
    return (
        <main className="min-h-screen bg-black">
            <Navigation />

            {/* Header */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    {/* Abstract Background - Could be a video texture later */}
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Mike_Will_Made_It_2014.jpg/800px-Mike_Will_Made_It_2014.jpg')] bg-cover bg-center grayscale mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                </div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-display-xl font-bold uppercase tracking-tighter text-white mix-blend-difference text-center"
                >
                    The<br />Vision
                </motion.h1>
            </div>

            <BioTimeline />
        </main>
    );
}
