import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service - THE R3SET',
    robots: 'noindex',
};

export default function TermsPage() {
    return (
        <main className="min-h-screen py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-display-l font-display mb-8">Terms of Service</h1>

                <div className="prose prose-invert max-w-none space-y-6 text-muted">
                    <p className="text-body">
                        <strong>Last updated:</strong> January 2026
                    </p>

                    <section>
                        <h2 className="text-h2 font-semibold text-fg mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using this website, you accept and agree to be bound by the terms
                            and provision of this agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-h2 font-semibold text-fg mb-4">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily access the materials on this website for personal,
                            non-commercial transitory viewing only.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-h2 font-semibold text-fg mb-4">3. Disclaimer</h2>
                        <p>
                            The materials on this website are provided on an &apos;as is&apos; basis. We make no warranties,
                            expressed or implied, and hereby disclaim and negate all other warranties including,
                            without limitation, implied warranties or conditions of merchantability, fitness for a
                            particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-h2 font-semibold text-fg mb-4">4. Limitations</h2>
                        <p>
                            In no event shall we or our suppliers be liable for any damages (including, without
                            limitation, damages for loss of data or profit, or due to business interruption)
                            arising out of the use or inability to use the materials on this website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-h2 font-semibold text-fg mb-4">5. Modifications</h2>
                        <p>
                            We may revise these terms of service at any time without notice. By using this website
                            you are agreeing to be bound by the then current version of these terms of service.
                        </p>
                    </section>

                    <div className="mt-12 pt-8 border-t border-stroke">
                        <Link href="/" className="text-accent hover:underline">
                            ← Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
