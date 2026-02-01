'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import Image from 'next/image';

interface ParallaxImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    speed?: number;
}

/**
 * ParallaxImage - Scroll-driven image parallax with scale
 * 
 * Creates depth effect by moving image at different speed than scroll.
 * Combines translateY and scale for premium feel.
 * 
 * @param speed - Parallax intensity (-20% to +20%), default 0.2
 * @design-system Cinematic Scroll Effects
 */
export function ParallaxImage({
    src,
    alt,
    width = 1920,
    height = 1080,
    className = '',
    speed = 0.2
}: ParallaxImageProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1 + speed, 1, 1 + speed]);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div style={{ y, scale }}>
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-full h-full object-cover"
                />
            </motion.div>
        </div>
    );
}

interface FadeInWhenVisibleProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

/**
 * FadeInWhenVisible - Intersection observer-based reveal
 * 
 * Fades in and slides up when element enters viewport.
 * Triggers once per page load for performance.
 * 
 * @design-system Scroll-Triggered Reveals
 */
export function FadeInWhenVisible({ children, className = '', delay = 0 }: FadeInWhenVisibleProps) {
    const ref = useRef(null);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * ScrollProgress - Fixed progress bar showing scroll position
 * 
 * Displays at top of viewport as user scrolls.
 * Uses scaleX for GPU-accelerated animation.
 * 
 * @design-system Navigation Enhancement
 */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            style={{ scaleX: scrollYProgress }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-hero origin-left z-[100]"
        />
    );
}
