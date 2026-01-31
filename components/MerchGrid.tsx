'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import Tag from './Tag';
import { useCartStore } from '@/lib/cart-store';

export interface MerchProduct {
    id: string;
    title: string;
    price: number;
    image: string;
    tags?: Array<'drop' | 'limited' | 'vault'>;
    variants?: {
        sizes?: string[];
        colors?: string[];
    };
    inStock: boolean;
}

interface MerchGridProps {
    products: MerchProduct[];
}

/**
 * Drop-style merch grid with Quick Add
 * @design-system Drop mode styling - tighter rhythm, bolder labels
 * @commerce Integrates with cart store, variant selection
 */
export default function MerchGrid({ products }: MerchGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

/**
 * Individual product card with variant selector
 */
function ProductCard({ product }: { product: MerchProduct }) {
    const [selectedSize, setSelectedSize] = useState<string | undefined>(
        product.variants?.sizes?.[0]
    );
    const [selectedColor, setSelectedColor] = useState<string | undefined>(
        product.variants?.colors?.[0]
    );
    const [isAdding, setIsAdding] = useState(false);

    const addItem = useCartStore((state) => state.addItem);

    const handleQuickAdd = () => {
        setIsAdding(true);
        addItem({
            id: `${product.id}-${selectedSize || 'default'}-${selectedColor || 'default'}`,
            productId: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            variant: {
                size: selectedSize,
                color: selectedColor,
            },
        });

        // Track add_to_cart
        import('@/lib/analytics').then(({ trackCommerceEvent }) => {
            trackCommerceEvent('add_to_cart', {
                item_id: product.id,
                item_name: product.title,
                price: product.price,
                quantity: 1,
                currency: 'USD',
                item_category: 'Merch',
                item_variant: `${selectedSize || ''} ${selectedColor || ''}`.trim()
            });
        });

        // Reset animation after brief delay
        setTimeout(() => setIsAdding(false), 1000);
    };

    return (
        <article className="group flex flex-col">
            {/* Product Image */}
            <div className="relative aspect-square mb-3 overflow-hidden rounded-sm bg-surface">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.tags.map((tag) => (
                            <Tag key={tag} variant={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        ))}
                    </div>
                )}

                {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <Tag variant="category">SOLD OUT</Tag>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-fg line-clamp-2">{product.title}</h3>
                    <span className="text-base font-bold text-fg shrink-0">${product.price}</span>
                </div>

                {/* Size Selector */}
                {product.variants?.sizes && product.variants.sizes.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-muted uppercase tracking-wide">Size</label>
                        <div className="flex flex-wrap gap-2">
                            {product.variants.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`
                    px-3 py-1.5 text-sm rounded-sm border transition-all
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                    ${selectedSize === size
                                            ? 'border-accent bg-accent text-bg'
                                            : 'border-stroke text-muted hover:border-fg/40 hover:text-fg'
                                        }
                  `}
                                    aria-pressed={selectedSize === size}
                                    aria-label={`Size ${size}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Color Selector */}
                {product.variants?.colors && product.variants.colors.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-muted uppercase tracking-wide">Color</label>
                        <div className="flex flex-wrap gap-2">
                            {product.variants.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`
                    px-3 py-1.5 text-sm rounded-sm border transition-all capitalize
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                    ${selectedColor === color
                                            ? 'border-accent bg-accent text-bg'
                                            : 'border-stroke text-muted hover:border-fg/40 hover:text-fg'
                                        }
                  `}
                                    aria-pressed={selectedColor === color}
                                    aria-label={`Color ${color}`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Add Button */}
                <Button
                    variant="primary"
                    onClick={handleQuickAdd}
                    disabled={!product.inStock}
                    className="mt-auto w-full"
                >
                    {isAdding ? '✓ Added' : product.inStock ? 'Quick Add' : 'Sold Out'}
                </Button>
            </div>
        </article>
    );
}
