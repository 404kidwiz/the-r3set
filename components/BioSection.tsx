'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import Tag from './Tag';

export interface Milestone {
    year: number;
    title: string;
}

interface BioSectionProps {
    portrait: string;
    story: string[];
    milestones: Milestone[];
    socials?: {
        instagram?: string;
        twitter?: string;
        spotify?: string;
        youtube?: string;
    };
}

/**
 * Editorial biography section with timeline and newsletter CTA
 * @design-system Editorial layout, breathing room, semantic HTML
 * @accessibility Article semantics, ARIA labels on links, form validation
 */
export default function BioSection({ portrait, story, milestones, socials }: BioSectionProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // TODO: Integrate with newsletter service (Mailchimp, ConvertKit, etc.)
        // Placeholder timeout simulation
        setTimeout(() => {
            import('@/lib/analytics').then(({ trackCTAClick }) => {
                trackCTAClick('newsletter');
            });
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
    };

    return (
        <article className="w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
                {/* Portrait */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-surface">
                    <Image
                        src={portrait}
                        alt="Mike Will Made-It portrait"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Story */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-display-l font-display mb-8">About</h2>

                    <div className="space-y-6 text-body text-muted leading-relaxed">
                        {story.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>

                    {/* Social Links */}
                    {socials && (
                        <div className="flex gap-4 mt-8" aria-label="Social media links">
                            {socials.instagram && (
                                <a
                                    href={socials.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 text-muted hover:text-accent hover:bg-surface rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                    aria-label="Follow on Instagram"
                                    onClick={() => import('@/lib/analytics').then(({ trackCTAClick }) => trackCTAClick('vault'))} // Reusing vault label or add new one? Using generic for now
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                            )}
                            {socials.twitter && (
                                <a
                                    href={socials.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 text-muted hover:text-accent hover:bg-surface rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                    aria-label="Follow on Twitter/X"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            )}
                            {socials.spotify && (
                                <a
                                    href={socials.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 text-muted hover:text-accent hover:bg-surface rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                    aria-label="Listen on Spotify"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                    </svg>
                                </a>
                            )}
                            {socials.youtube && (
                                <a
                                    href={socials.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 text-muted hover:text-accent hover:bg-surface rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                    aria-label="Subscribe on YouTube"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Milestones Timeline */}
            <section className="mb-16">
                <h3 className="text-h2 font-display mb-8 text-center">Career Highlights</h3>
                <div className="overflow-x-auto pb-4 -mx-4 px-4">
                    <div className="flex gap-4 min-w-max justify-center">
                        {milestones.map((milestone, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 w-48 p-4 bg-surface rounded-sm border border-stroke hover:border-fg/20 transition-colors"
                            >
                                <Tag variant="category" className="mb-2">{milestone.year}</Tag>
                                <p className="text-sm text-fg">{milestone.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="max-w-xl mx-auto text-center">
                <h3 className="text-h2 font-display mb-4">Stay Updated</h3>
                <p className="text-body text-muted mb-6">
                    Get the latest news, releases, and exclusive content delivered to your inbox.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                    <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={status === 'loading' || status === 'success'}
                        className="flex-1 px-4 py-3 bg-surface border border-stroke rounded-sm text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                        autoComplete="email"
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        loading={status === 'loading'}
                        disabled={status === 'success'}
                    >
                        {status === 'success' ? '✓ Subscribed' : 'Subscribe'}
                    </Button>
                </form>

                {status === 'error' && (
                    <p className="mt-3 text-sm text-red-500" role="alert">
                        Something went wrong. Please try again.
                    </p>
                )}
            </section>
        </article>
    );
}
