import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: 'var(--bg)',
                fg: 'var(--fg)',
                muted: 'var(--muted)',
                surface: 'var(--surface)',
                'surface-2': 'var(--surface-2)',
                stroke: 'var(--stroke)',
                accent: 'var(--accent)',
                danger: 'var(--danger)',
                success: 'var(--success)',
            },
            fontFamily: {
                sans: ['var(--font-sans)'],
                display: ['var(--font-display)'],
                mono: ['var(--font-mono)'],
            },
            boxShadow: {
                DEFAULT: 'var(--shadow)',
            },
        },
    },
    plugins: [],
} satisfies Config;
