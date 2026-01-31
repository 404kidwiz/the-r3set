'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
    loading?: boolean;
    children: React.ReactNode;
}

/**
 * Button component with strict accent color discipline
 * @design-system Only 'primary' variant uses accent color (CTA enforcement)
 * @accessibility Visible focus states, loading indication, disabled states
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'secondary', loading = false, disabled, className, children, ...props }, ref) => {
        const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
    `;

        const variantStyles = {
            // PRIMARY: Accent fill - CTA only (enforces design system accent discipline)
            primary: `
        bg-accent text-bg
        hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] hover:-translate-y-0.5
        active:translate-y-0
        px-6 py-3 rounded-sm
      `,
            // SECONDARY: Outline
            secondary: `
        border border-stroke text-fg bg-transparent
        hover:bg-surface hover:border-fg/20
        active:bg-surface-2
        px-6 py-3 rounded-sm
      `,
            // GHOST: Text only
            ghost: `
        text-fg hover:text-accent hover:bg-surface
        active:bg-surface-2
        px-4 py-2 rounded-sm
      `,
            // ICON: Minimal for modal controls
            icon: `
        text-muted hover:text-fg hover:bg-surface
        active:bg-surface-2
        p-2 rounded-full
      `,
        };

        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={clsx(baseStyles, variantStyles[variant], className)}
                {...props}
            >
                {loading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
