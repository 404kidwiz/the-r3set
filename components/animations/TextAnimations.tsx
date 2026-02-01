'use client';

import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface SplitTextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
}

/**
 * SplitTextReveal - Animated text reveal by words
 * 
 * Splits text into words and animates each with stagger effect.
 * Perfect for hero subtitles and section descriptions.
 * 
 * @design-system Premium Typography Animations
 */
export function SplitTextReveal({
    text,
    className = '',
    delay = 0,
    staggerDelay = 0.03
}: SplitTextRevealProps) {
    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay
            },
        },
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
        },
    };

    return (
        <motion.div
            className={`flex flex-wrap ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
            style={{ overflow: 'hidden' }}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    style={{ marginRight: '0.25em', display: 'inline-block' }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    animate?: boolean;
}

/**
 * GradientText - Animated gradient text fill
 * 
 * Applies cinematic gradient with optional animation.
 * Uses background-clip for WebKit compatibility.
 * 
 * @design-system Midnight Studio Gradients
 */
export function GradientText({ children, className = '', animate = false }: GradientTextProps) {
    const animationProps = animate ? {
        initial: { backgroundPosition: '0% 50%' },
        animate: {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        },
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "linear" as const
        }
    } : {};

    return (
        <motion.span
            {...animationProps}
            className={`text-gradient ${className}`}
            style={{
                background: 'var(--gradient-text)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
            }}
        >
            {children}
        </motion.span>
    );
}
