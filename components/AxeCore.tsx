'use client';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function AxeCore() {
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
            import('@axe-core/react').then((axe) => {
                // Debounce to allow hydration to complete
                setTimeout(() => {
                    console.log('[Accessibility] Axe-core auditing started');
                    axe.default(React, ReactDOM, 1000);
                }, 1000);
            });
        }
    }, []);

    return null;
}
