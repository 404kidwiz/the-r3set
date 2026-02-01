'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, ShoppingBag } from 'lucide-react';

// Product interface for type safety
interface Product {
    id: string;
    title: string;
    price: number;
    compareAtPrice: number | null;
    image: string;
    fallbackImage: string;
    url: string;
    sizes: string[];
    badge: string | null;
}

// Shopify products - Manager controls via Shopify admin
// These will be replaced with dynamic API fetch when token is available
const products: Product[] = [
    {
        id: '1',
        title: 'MWM - "Virgil Tweet" Pullover Hoodie',
        price: 100.00,
        compareAtPrice: null,
        image: 'https://cdn.shopify.com/s/files/1/0xxx/xxxx/products/hoodie-front.jpg',
        fallbackImage: '/merch/hoodie-pullover.jpg',
        url: 'https://mwm-merch.myshopify.com/products/untitled-jan30_21-49?variant=48408704581855',
        sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        badge: 'NEW'
    },
    {
        id: '2',
        title: 'MWM - "Virgil Tweet" Zip Hoodie',
        price: 110.00,
        compareAtPrice: null,
        image: 'https://cdn.shopify.com/s/files/1/0xxx/xxxx/products/hoodie-zip.jpg',
        fallbackImage: '/merch/hoodie-zip.jpg',
        url: 'https://mwm-merch.myshopify.com/products/general-clothes-example-product-1?variant=48408701993183',
        sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        badge: 'NEW'
    }
];

/**
 * MerchSection - Premium E-commerce Showcase
 * Pulls products from Shopify, redirects to Shopify checkout
 */
export default function MerchSection() {
    return (
        <section
            id="merch"
            className="relative py-32 overflow-hidden"
            style={{ background: 'var(--bg-void)' }}
        >
            {/* Ambient glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse, rgba(255, 215, 0, 0.15) 0%, transparent 70%)'
                }}
            />

            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2
                        className="font-display text-6xl sm:text-7xl md:text-8xl tracking-wider mb-3"
                        style={{ color: 'var(--fg-primary)' }}
                    >
                        OFFICIAL
                    </h2>
                    <div className="flex items-baseline gap-4">
                        <span
                            className="font-display text-6xl sm:text-7xl md:text-8xl tracking-wider"
                            style={{ color: 'var(--accent-secondary)' }} // Grammy gold
                        >
                            MERCH_
                        </span>
                        <span
                            className="font-mono text-xs tracking-widest uppercase"
                            style={{ color: 'var(--fg-subtle)' }}
                        >
                            Limited Drops
                        </span>
                    </div>
                </motion.div>

                {/* Featured Product Hero */}
                {products.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mb-16"
                    >
                        <Link
                            href={products[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block relative overflow-hidden rounded-lg"
                            style={{
                                background: 'var(--bg-surface)',
                                boxShadow: 'var(--shadow-card)'
                            }}
                        >
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Product Image */}
                                <div className="relative aspect-square overflow-hidden">
                                    {/* Gradient overlay */}
                                    <div
                                        className="absolute inset-0 z-10 opacity-40"
                                        style={{
                                            background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.5) 100%)'
                                        }}
                                    />

                                    {/* Placeholder until real image loads */}
                                    <div
                                        className="w-full h-full flex items-center justify-center"
                                        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0c0c10 100%)' }}
                                    >
                                        <div className="text-center p-8">
                                            <ShoppingBag
                                                className="w-20 h-20 mx-auto mb-4 opacity-20"
                                                style={{ color: 'var(--fg-muted)' }}
                                            />
                                            <p
                                                className="font-mono text-sm uppercase tracking-widest"
                                                style={{ color: 'var(--fg-subtle)' }}
                                            >
                                                Virgil Tweet Collection
                                            </p>
                                        </div>
                                    </div>

                                    {/* Badge */}
                                    {products[0].badge && (
                                        <span
                                            className="absolute top-4 left-4 z-20 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-sm"
                                            style={{
                                                background: 'var(--accent-primary)',
                                                color: 'white'
                                            }}
                                        >
                                            {products[0].badge}
                                        </span>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <p
                                        className="font-mono text-xs tracking-widest uppercase mb-4"
                                        style={{ color: 'var(--accent-secondary)' }}
                                    >
                                        Featured Drop
                                    </p>
                                    <h3
                                        className="font-display text-3xl sm:text-4xl tracking-wider mb-4 group-hover:text-accent transition-colors"
                                        style={{ color: 'var(--fg-primary)' }}
                                    >
                                        {products[0].title.replace('MWM - ', '')}
                                    </h3>
                                    <p
                                        className="font-body text-lg mb-6"
                                        style={{ color: 'var(--fg-muted)' }}
                                    >
                                        Heavy-weight premium hoodie featuring Virgil Abloh's iconic 2012 tweet:
                                        "@MikeWiLLMadeIt beats sound like CHANEL."
                                    </p>
                                    <div className="flex items-center gap-4 mb-8">
                                        <span
                                            className="font-display text-4xl"
                                            style={{ color: 'var(--fg-primary)' }}
                                        >
                                            ${products[0].price.toFixed(2)}
                                        </span>
                                        {products[0].compareAtPrice && (
                                            <span
                                                className="font-mono text-sm line-through"
                                                style={{ color: 'var(--fg-subtle)' }}
                                            >
                                                ${products[0].compareAtPrice.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        className="inline-flex items-center gap-2 font-body font-semibold text-sm tracking-wider uppercase"
                                        style={{ color: 'var(--accent-primary)' }}
                                    >
                                        Shop Now
                                        <ExternalLink className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Hover shine effect */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)'
                                }}
                            />
                        </Link>
                    </motion.div>
                )}

                {/* Product Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1"
                                style={{
                                    background: 'var(--bg-surface)',
                                    boxShadow: 'var(--shadow-card)'
                                }}
                            >
                                {/* Product Image */}
                                <div className="relative aspect-square overflow-hidden">
                                    <div
                                        className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                                        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0c0c10 100%)' }}
                                    >
                                        <ShoppingBag
                                            className="w-16 h-16 opacity-20"
                                            style={{ color: 'var(--fg-muted)' }}
                                        />
                                    </div>

                                    {/* Quick view overlay */}
                                    <div
                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: 'rgba(0,0,0,0.6)' }}
                                    >
                                        <span
                                            className="px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-sm"
                                            style={{
                                                background: 'var(--accent-primary)',
                                                color: 'white'
                                            }}
                                        >
                                            View Product
                                        </span>
                                    </div>

                                    {/* Badge */}
                                    {product.badge && (
                                        <span
                                            className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-sm"
                                            style={{
                                                background: 'var(--accent-primary)',
                                                color: 'white'
                                            }}
                                        >
                                            {product.badge}
                                        </span>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <h4
                                        className="font-body font-semibold text-sm mb-2 line-clamp-2 group-hover:text-accent transition-colors"
                                        style={{ color: 'var(--fg-primary)' }}
                                    >
                                        {product.title}
                                    </h4>
                                    <p
                                        className="font-display text-xl"
                                        style={{ color: 'var(--fg-primary)' }}
                                    >
                                        ${product.price.toFixed(2)}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Shop All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <Link
                        href="https://mwm-merch.myshopify.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3.5 font-body font-medium text-sm tracking-wider uppercase rounded-sm transition-all hover:border-accent"
                        style={{
                            background: 'transparent',
                            color: 'var(--fg-primary)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}
                    >
                        Shop All Merch
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
