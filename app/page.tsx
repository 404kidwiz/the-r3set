'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import ScrollVideoSequence from '@/components/ScrollVideoSequence';
import { motion } from 'framer-motion';
import { scrollSequences, bio } from '@/lib/content';

// Dynamic imports for code splitting
const AlbumShowcase = dynamic(() => import('@/components/AlbumShowcase'), {
  loading: () => <div className="min-h-screen animate-pulse" style={{ background: 'var(--bg-void)' }} />,
});

const DiscographySection = dynamic(() => import('@/components/DiscographySection'), {
  loading: () => <div className="min-h-[800px] animate-pulse" style={{ background: 'var(--bg-void)' }} />,
});

const MediaSection = dynamic(() => import('@/components/MediaSection'), {
  loading: () => <div className="min-h-[900px] animate-pulse" style={{ background: 'var(--bg-void)' }} />,
});

const BioSection = dynamic(() => import('@/components/BioSection'), {
  loading: () => <div className="min-h-[600px] animate-pulse" style={{ background: 'var(--bg-void)' }} />,
});

const MerchSection = dynamic(() => import('@/components/MerchSection'), {
  loading: () => <div className="min-h-[500px] animate-pulse" style={{ background: 'var(--bg-void)' }} />,
});

const ChapterOneTeaser = dynamic(() => import('@/components/ChapterOneTeaser'), {
  loading: () => <div className="min-h-[500px] animate-pulse" style={{ background: 'var(--bg-void)' }} />,
});

const FloatingMerchPromo = dynamic(() => import('@/components/FloatingMerchPromo'), {
  ssr: false, // Client-only for scroll detection
});

/**
 * THE R3SET - Mike WiLL Made-It Official Website
 * Premium Single-Page Scroll Experience
 * 
 * Section Order (User-Specified):
 * 1. Hero Video Sequence (clip-1)
 * 2. Chapter I Teaser (R3SET)
 * 3. Album Cover Art Showcase
 * 4. Video Transition: Young → Old Mike Forest (clip-2)
 * 5. Discography Section
 * 6. Video Transition: Studio Session (clip-3)
 * 7. Media Section (Videos + Photos)
 * 8. Video Transition (clip-4)
 * 9. Bio Section
 * 10. Video Transition: Warehouse (clip-5)
 * 11. Merch Section
 * 12. Footer
 */
export default function Home() {
  return (
    <>
      {/* Skip Link for keyboard users - WCAG 2.1 AA */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:rounded-sm focus:font-bold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          background: 'var(--accent-primary)',
          color: 'white'
        }}
      >
        Skip to main content
      </a>

      <main
        id="main-content"
        className="min-h-screen selection:text-white"
        style={{
          background: 'var(--bg-void)',
          color: 'var(--fg-primary)'
        }}
      >
        <Navigation />
        <FloatingMerchPromo />

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1: HERO - Opening Cinematic (clip-1)
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="hero" className="relative z-0">
          <ScrollVideoSequence
            basePath={`/sequences/${scrollSequences[0].name}`}
            frameCount={scrollSequences[0].frames}
            chapterLabel={scrollSequences[0].label}
            fallbackImage="/gallery/dustdigital-242.JPG"
            scrollSpeedMultiplier={1.0}
          />

          {/* Hero Overlay Content */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'circOut' }}
              className="font-display tracking-wider text-center leading-none mix-blend-difference"
              style={{ fontSize: 'var(--text-hero)' }}
            >
              MIKE WILL
              <br />
              <span style={{ color: 'var(--accent-primary)' }}>MADE-IT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-8 font-mono text-sm tracking-[0.5em] uppercase"
              style={{ color: 'var(--fg-muted)' }}
            >
              The Architect of the Sound
            </motion.p>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
          >
            <span
              className="text-[10px] font-mono uppercase tracking-[0.3em]"
              style={{ color: 'var(--fg-subtle)' }}
            >
              Scroll to Explore
            </span>
            <motion.div
              className="w-px h-12"
              style={{ background: 'linear-gradient(to bottom, var(--accent-primary), transparent)' }}
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2: CHAPTER I TEASER (R3SET)
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="chapter-one" aria-labelledby="chapter-one-heading" className="relative z-10">
          <ChapterOneTeaser />
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3: ALBUM COVER ART SHOWCASE
        ═══════════════════════════════════════════════════════════════════ */}
        <AlbumShowcase />

        {/* ═══════════════════════════════════════════════════════════════════
            VIDEO TRANSITION: Young → Old Mike Forest (clip-2)
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="relative z-0">
          <ScrollVideoSequence
            basePath={`/sequences/${scrollSequences[1].name}`}
            frameCount={scrollSequences[1].frames}
            chapterLabel="THE EVOLUTION"
            scrollSpeedMultiplier={2.0}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4: DISCOGRAPHY
        ═══════════════════════════════════════════════════════════════════ */}
        <DiscographySection />

        {/* ═══════════════════════════════════════════════════════════════════
            VIDEO TRANSITION: Studio Session (clip-3)
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="relative z-0">
          <ScrollVideoSequence
            basePath={`/sequences/${scrollSequences[2].name}`}
            frameCount={scrollSequences[2].frames}
            chapterLabel="THE LAB"
            scrollSpeedMultiplier={1.5}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5: MEDIA (Videos + Photos)
        ═══════════════════════════════════════════════════════════════════ */}
        <MediaSection />

        {/* ═══════════════════════════════════════════════════════════════════
            VIDEO TRANSITION (clip-4)
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="relative z-0">
          <ScrollVideoSequence
            basePath={`/sequences/${scrollSequences[3].name}`}
            frameCount={scrollSequences[3].frames}
            chapterLabel="THE WORLD"
            scrollSpeedMultiplier={2.0}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 6: BIO
        ═══════════════════════════════════════════════════════════════════ */}
        <BioSection />

        {/* ═══════════════════════════════════════════════════════════════════
            VIDEO TRANSITION: Warehouse (clip-5)
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="relative z-0">
          <ScrollVideoSequence
            basePath={`/sequences/${scrollSequences[4].name}`}
            frameCount={scrollSequences[4].frames}
            chapterLabel="THE LEGACY"
            scrollSpeedMultiplier={1.8}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 7: MERCH (Shopify Integration)
        ═══════════════════════════════════════════════════════════════════ */}
        <MerchSection />



        {/* ═══════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════ */}
        <footer
          className="relative z-10 py-20"
          style={{
            background: 'var(--bg-void)',
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}
          role="contentinfo"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Logo */}
              <div className="text-center md:text-left">
                <h3
                  className="font-display text-2xl tracking-wider mb-2"
                  style={{ color: 'var(--fg-primary)' }}
                >
                  MIKE WILL MADE-IT
                </h3>
                <p
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: 'var(--fg-subtle)' }}
                >
                  The R3SET Era • 2026
                </p>
              </div>

              {/* Links */}
              <div className="flex items-center gap-6">
                <a
                  href="/legal/privacy"
                  className="font-mono text-xs uppercase tracking-wider transition-colors hover:text-accent"
                  style={{ color: 'var(--fg-subtle)' }}
                >
                  Privacy
                </a>
                <a
                  href="/legal/terms"
                  className="font-mono text-xs uppercase tracking-wider transition-colors hover:text-accent"
                  style={{ color: 'var(--fg-subtle)' }}
                >
                  Terms
                </a>
                <a
                  href="https://mwm-merch.myshopify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider transition-colors hover:text-accent"
                  style={{ color: 'var(--fg-subtle)' }}
                >
                  Shop
                </a>
              </div>

              {/* Copyright */}
              <p
                className="font-mono text-[10px] uppercase tracking-widest text-center md:text-right"
                style={{ color: 'var(--fg-dim)' }}
              >
                © 2026 Eardrummer Records
                <br />
                All Rights Reserved
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
