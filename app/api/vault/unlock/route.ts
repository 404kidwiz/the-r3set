import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Phase 1: Simple passcode (replace with env var in production)
const VAULT_PASSCODE = process.env.VAULT_PASSCODE || 'R3SET2026';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const passcode = formData.get('passcode');

        if (passcode === VAULT_PASSCODE) {
            // Set HttpOnly cookie for session
            const cookieStore = await cookies();
            cookieStore.set('vault_access', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            // Analytics event (optional)
            // trackEvent('vault_unlock_success');

            return NextResponse.redirect(new URL('/vault', request.url));
        }

        // Failed attempt
        // trackEvent('vault_unlock_failed');

        return NextResponse.redirect(
            new URL('/vault?error=invalid', request.url)
        );
    } catch (error) {
        console.error('Vault unlock error:', error);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}
