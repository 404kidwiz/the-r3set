import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy - THE R3SET',
    robots: 'noindex',
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-display-l font-display mb-8">Privacy Policy</h1>

                <div className="prose prose-invert max-w-none space-y-6 text-muted">
                    <p className="text-body">
                        <strong>Last updated:</strong> January 2026
                    </p>

                    <section>
                        <h2 className="text-h2 font-semibold text-fg mb-4">1. Information We Collect</h2>
                        <p>
                            We collect information you provide directly to us, including when you create an account,
                            make a purchase, sign up for our newsletter, or contact us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-h2 font-semibold text-fg mb-4">2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services,
                            process transactions, send you technical notices and support messages, and communicate
                            with you about products, services, and events.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-h2 font-semibold text-fg mb-4">3. Information Sharing</h2>
                        <p>
                            We do not share your personal information with third parties except as described in
                            this policy or with your consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-h2 font-semibold text-fg mb-4">4. Cookies</h2>
                        <p>
                            We use cookies and similar tracking technologies to track activity on our service and
                            hold certain information. You can instruct your browser to refuse all cookies or to
                            indicate when a cookie is being sent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-h2 font-semibold text-fg mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us.
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
