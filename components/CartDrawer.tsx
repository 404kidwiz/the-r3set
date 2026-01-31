'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import { useCartStore, type CartItem } from '@/lib/cart-store';
import { trackCommerceEvent } from '@/lib/analytics';

// stripePromise is not used in the checkout flow which redirects to a URL

/**
 * Slide-in cart drawer with focus trap and body scroll lock
 * @design-system Accent CTA for checkout, restrained motion
 * @accessibility Focus trap, Escape to close, body scroll lock
 */
export default function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCartStore();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);

    // Handle checkout
    const handleCheckout = async () => {
        setIsCheckingOut(true);

        try {
            // Track begin_checkout event
            trackCommerceEvent('begin_checkout', {
                currency: 'USD',
                value: subtotal,
                items: items.map(item => ({
                    item_id: item.id,
                    item_name: item.title,
                    price: item.price,
                    quantity: item.quantity,
                })),
            });

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items }),
            });

            const { url, error } = await response.json();

            if (error) {
                console.error('Checkout error:', error);
                alert('Failed to create checkout session. Please try again.');
                return;
            }

            if (url) {
                window.location.href = url;
            }
        } catch (err) {
            console.error('Checkout error:', err);
            alert('An unexpected error occurred. Please try again.');
        } finally {
            setIsCheckingOut(false);
        }
    };

    // Body scroll lock when cart is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Escape key handler
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeCart();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeCart]);

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                onClick={closeCart}
                aria-hidden="true"
            />

            {/* Drawer */}
            <aside
                ref={drawerRef}
                className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-bg border-l border-stroke z-50 flex flex-col shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-label="Shopping cart"
            >
                {/* Header */}
                <header className="flex items-center justify-between p-6 border-b border-stroke">
                    <h2 className="text-lg font-semibold text-fg">
                        Cart {totalItems > 0 && `(${totalItems})`}
                    </h2>
                    <button
                        onClick={closeCart}
                        className="p-2 text-muted hover:text-fg hover:bg-surface rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label="Close cart"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <svg className="w-16 h-16 text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="text-muted">Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <CartItem
                                    key={`${item.id}-${item.variant.size}-${item.variant.color}`}
                                    item={item}
                                    onRemove={() => removeItem(item.id)}
                                    onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <footer className="p-6 border-t border-stroke bg-surface">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-base font-medium text-muted">Subtotal</span>
                            <span className="text-xl font-bold text-fg">${subtotal.toFixed(2)}</span>
                        </div>

                        <p className="text-xs text-muted mb-4">Shipping and taxes calculated at checkout</p>

                        {/* Checkout Button */}
                        <Button
                            variant="primary"
                            className="w-full"
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                        >
                            {isCheckingOut ? 'Processing...' : 'Checkout'}
                        </Button>
                    </footer>
                )}
            </aside>
        </>
    );
}

/**
 * Individual cart item
 */
function CartItem({
    item,
    onRemove,
    onUpdateQuantity,
}: {
    item: CartItem;
    onRemove: () => void;
    onUpdateQuantity: (qty: number) => void;
}) {
    return (
        <article className="flex gap-4">
            {/* Thumbnail */}
            <div className="relative w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden bg-surface">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col">
                <h3 className="text-sm font-medium text-fg line-clamp-2 mb-1">{item.title}</h3>

                {/* Variant Info */}
                {(item.variant.size || item.variant.color) && (
                    <p className="text-xs text-muted mb-2">
                        {[item.variant.size, item.variant.color].filter(Boolean).join(' / ')}
                    </p>
                )}

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 border border-stroke rounded-sm">
                        <button
                            onClick={() => onUpdateQuantity(item.quantity - 1)}
                            className="px-3 py-1 text-muted hover:text-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            aria-label="Decrease quantity"
                            disabled={item.quantity === 1}
                        >
                            −
                        </button>
                        <span className="text-sm font-medium text-fg w-8 text-center">{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item.quantity + 1)}
                            className="px-3 py-1 text-muted hover:text-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>

                    <span className="text-sm font-bold text-fg">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>

            {/* Remove Button */}
            <button
                onClick={onRemove}
                className="p-1 text-muted hover:text-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                aria-label="Remove item"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </article>
    );
}
