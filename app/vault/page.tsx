import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Metadata - noindex for Vault
export const metadata = {
    title: 'Vault - THE R3SET',
    robots: {
        index: false,
        follow: false,
    },
};

async function checkVaultAccess() {
    const cookieStore = await cookies();
    return cookieStore.get('vault_access')?.value === 'true';
}

export default async function VaultPage() {
    const hasAccess = await checkVaultAccess();

    if (!hasAccess) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-h1 font-display mb-2">VAULT</h1>
                        <p className="text-muted">Enter passcode to access exclusive content</p>
                    </div>

                    <form action="/api/vault/unlock" method="POST" className="space-y-4">
                        <div>
                            <label htmlFor="passcode" className="block text-sm font-medium mb-2">
                                Passcode
                            </label>
                            <input
                                type="password"
                                id="passcode"
                                name="passcode"
                                className="w-full px-4 py-3 bg-surface border border-stroke rounded-sm focus:outline-none focus:border-accent transition-colors"
                                placeholder="Enter your passcode"
                                required
                                autoComplete="off"
                            />
                        </div>

                        <button type="submit" className="w-full btn-primary">
                            Unlock Vault
                        </button>
                    </form>

                    <p className="text-xs text-muted text-center mt-6">
                        Don't have a passcode? Check your album purchase confirmation email.
                    </p>
                </div>
            </div>
        );
    }

    // Vault content (only shown if authenticated)
    return (
        <div className="min-h-screen p-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-display-l font-display">
                        <span className="tag-vault mr-4">VAULT</span>
                        Exclusive Content
                    </h1>
                    <form action="/api/vault/logout" method="POST">
                        <button type="submit" className="btn-ghost text-sm">
                            Exit Vault
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Placeholder exclusive content */}
                    <div className="card p-6">
                        <h3 className="text-h3 font-display mb-2">Unreleased Track</h3>
                        <p className="text-sm text-muted mb-4">Exclusive bonus track</p>
                        <audio controls className="w-full">
                            <source src="/vault/exclusive-track.mp3" type="audio/mpeg" />
                        </audio>
                    </div>

                    <div className="card p-6">
                        <h3 className="text-h3 font-display mb-2">Behind The Scenes</h3>
                        <p className="text-sm text-muted mb-4">Studio sessions</p>
                        <div className="aspect-video bg-surface-2 rounded-sm" />
                    </div>

                    <div className="card p-6">
                        <h3 className="text-h3 font-display mb-2">Digital Artwork</h3>
                        <p className="text-sm text-muted mb-4">High-res downloads</p>
                        <div className="aspect-square bg-surface-2 rounded-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
}
