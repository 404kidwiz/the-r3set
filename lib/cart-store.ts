import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    productId: string;
    title: string;
    price: number;
    image: string;
    variant: {
        size?: string;
        color?: string;
    };
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;

    // Actions
    addItem: (product: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;

    // Computed
    get totalItems(): number;
    get subtotal(): number;
}

/**
 * Cart state management with Zustand
 * @persistence LocalStorage persistence for cart resilience
 */
export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (product) => {
                const items = get().items;
                const existingIndex = items.findIndex(
                    (item) =>
                        item.productId === product.productId &&
                        item.variant.size === product.variant.size &&
                        item.variant.color === product.variant.color
                );

                if (existingIndex > -1) {
                    // Item exists, increment quantity
                    const updatedItems = [...items];
                    updatedItems[existingIndex].quantity += 1;
                    set({ items: updatedItems, isOpen: true });
                } else {
                    // New item
                    set({ items: [...items, { ...product, quantity: 1 }], isOpen: true });
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) });
            },

            updateQuantity: (id, quantity) => {
                if (quantity === 0) {
                    get().removeItem(id);
                    return;
                }
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                });
            },

            clearCart: () => {
                set({ items: [] });
            },

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            get totalItems() {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            get subtotal() {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'r3set-cart',
            partialize: (state) => ({ items: state.items }), // Only persist items, not UI state
        }
    )
);
