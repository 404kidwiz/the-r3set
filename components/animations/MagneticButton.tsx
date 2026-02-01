'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number;
}

/**
 * MagneticButton - Premium micro-interaction for CTAs
 * 
 * Creates magnetic effect where button follows cursor within radius.
 * Uses spring physics for natural, premium feel.
 * 
 * @param strength - Magnetic strength (0-1), default 0.3
 * @design-system 2026 Premium Interactions
 */
export function MagneticButton({
    children,
    className = '',
    onClick,
    strength = 0.3
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        x.set(deltaX * strength);
        y.set(deltaY * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={className}
            whileTap={{ scale: 0.97 }}
        >
            {children}
        </motion.button>
    );
}
