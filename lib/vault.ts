import { cookies } from 'next/headers';

/**
 * Vault authentication helpers
 * @security HttpOnly cookies, server-side validation
 */

const VAULT_COOKIE_NAME = 'vault_access';
const VAULT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * Validate vault access from cookies
 * Use in Server Components or API routes
 */
export async function validateVaultAccess(): Promise<boolean> {
    const cookieStore = await cookies();
    const vaultCookie = cookieStore.get(VAULT_COOKIE_NAME);

    if (!vaultCookie) {
        return false;
    }

    // In production, you might want to validate the cookie value against a secret
    // For now, presence of cookie = access granted
    return vaultCookie.value === 'granted';
}

/**
 * Set vault access cookie
 * Call in API route after successful passcode validation
 */
export function setVaultCookie(): string {
    const isProduction = process.env.NODE_ENV === 'production';

    return [
        `${VAULT_COOKIE_NAME}=granted`,
        `Max-Age=${VAULT_COOKIE_MAX_AGE}`,
        'Path=/',
        'HttpOnly',
        'SameSite=Lax',
        isProduction ? 'Secure' : '',
    ]
        .filter(Boolean)
        .join('; ');
}

/**
 * Clear vault access cookie (logout)
 */
export function clearVaultCookie(): string {
    return `${VAULT_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly`;
}

/**
 * Validate passcode
 */
export function validatePasscode(input: string): boolean {
    const correctPasscode = process.env.VAULT_PASSCODE;

    if (!correctPasscode) {
        console.warn('[Vault] VAULT_PASSCODE environment variable not set');
        return false;
    }

    return input === correctPasscode;
}
