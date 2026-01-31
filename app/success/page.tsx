export const metadata = {
    title: 'Order Successful - THE R3SET',
};

export default function SuccessPage({
    searchParams,
}: {
    searchParams: { session_id?: string };
}) {
    const sessionId = searchParams.session_id;

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center">
                {/* Success Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                        <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Success Message */}
                <h1 className="text-display-l font-display mb-4">Order Confirmed!</h1>
                <p className="text-body text-muted mb-8">
                    Thank you for your purchase. You'll receive a confirmation email shortly with your order details and tracking information.
                </p>

                {/* Order ID */}
                {sessionId && (
                    <div className="mb-8 p-4 bg-surface rounded-sm border border-stroke">
                        <p className="text-sm text-muted mb-1">Order Reference</p>
                        <p className="text-sm font-mono text-fg">{sessionId}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/"
                        className="px-6 py-3 bg-accent text-bg rounded-sm font-medium hover:bg-accent/90 transition-colors"
                    >
                        Back to Home
                    </a>
                    <a
                        href="/#merch"
                        className="px-6 py-3 bg-surface text-fg rounded-sm font-medium hover:bg-surface-2 transition-colors border border-stroke"
                    >
                        Continue Shopping
                    </a>
                </div>

                {/* Additional Info */}
                <div className="mt-12 pt-8 border-t border-stroke">
                    <p className="text-sm text-muted">
                        Questions about your order? Contact us at{' '}
                        <a href="mailto:support@ther3set.com" className="text-accent hover:underline">
                            support@ther3set.com
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
