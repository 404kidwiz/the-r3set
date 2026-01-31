'use client';

import { useEffect } from 'react';
import { initPostHog } from '@/lib/analytics';

export default function AnalyticsSetup() {
    useEffect(() => {
        initPostHog();
    }, []);
    return null;
}
