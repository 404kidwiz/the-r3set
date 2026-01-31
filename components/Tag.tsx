import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'drop' | 'limited' | 'vault' | 'category';
    children: React.ReactNode;
}

/**
 * Tag component for labels (DROP/LIMITED/VAULT)
 * @design-system Enforces accent color usage only on tags (streetwear cue)
 * @typography Uppercase, tight padding, rectangular badge
 */
export default function Tag({ variant = 'category', className, children, ...props }: TagProps) {
    const baseStyles = `
    inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm
  `;

    const variantStyles = {
        // DROP: Accent fill (design system approved use)
        drop: 'bg-accent text-bg',

        // LIMITED: Inverted palette
        limited: 'bg-fg text-bg',

        // VAULT: Subtle, mysterious
        vault: 'bg-surface-2 text-muted border border-stroke',

        // CATEGORY: Neutral
        category: 'bg-surface text-muted',
    };

    return (
        <span
            className={clsx(baseStyles, variantStyles[variant], className)}
            {...props}
        >
            {children}
        </span>
    );
}
