'use client';

import { useState } from 'react';
import Image from 'next/image';
import Tag from './Tag';

export interface DiscographyItem {
    id: string;
    title: string;
    year: number;
    role: 'Artist' | 'Producer' | 'Mixtape' | 'Single';
    category: 'Albums' | 'Mixtapes' | 'Singles' | 'Production';
    artwork: string;
    links?: {
        spotify?: string;
        apple?: string;
        youtube?: string;
    };
    credits?: string;
}

interface DiscographyGridProps {
    items: DiscographyItem[];
}

const filters = ['All', 'Albums', 'Mixtapes', 'Singles', 'Production'] as const;
type Filter = typeof filters[number];

/**
 * Discography grid with filter chips
 * @design-system Editorial layout, accent discipline on active filter
 * @accessibility Keyboard nav on filters, semantic HTML, ARIA labels
 */
export default function DiscographyGrid({ items }: DiscographyGridProps) {
    const [activeFilter, setActiveFilter] = useState<Filter>('All');

    const filteredItems = items.filter(
        (item) => activeFilter === 'All' || item.category === activeFilter
    );

    return (
        <div className="w-full">
            {/* Filter Chips */}
            <div
                className="flex flex-wrap justify-center gap-3 mb-12"
                role="group"
                aria-label="Filter discography by category"
            >
                {filters.map((filter) => {
                    const isActive = activeFilter === filter;
                    return (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`
                px-5 py-2 text-sm font-medium rounded-sm transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                ${isActive
                                    ? 'bg-accent text-bg' // Accent color discipline: active state only
                                    : 'bg-surface text-muted hover:bg-surface-2 hover:text-fg'
                                }
              `}
                            aria-pressed={isActive}
                            aria-label={`Filter by ${filter}`}
                        >
                            {filter}
                        </button>
                    );
                })}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredItems.map((item) => (
                    <DiscographyCard key={item.id} item={item} />
                ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-muted">No items found in this category.</p>
                </div>
            )}
        </div>
    );
}

/**
 * Individual discography card
 */
function DiscographyCard({ item }: { item: DiscographyItem }) {
    return (
        <article className="group flex flex-col">
            {/* Artwork */}
            <div className="relative aspect-square mb-4 overflow-hidden rounded-sm bg-surface">
                <Image
                    src={item.artwork}
                    alt={`${item.title} album artwork`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Metadata */}
            <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-fg line-clamp-2">{item.title}</h3>
                    <span className="text-sm text-muted shrink-0">{item.year}</span>
                </div>

                <Tag variant="category" className="w-fit">
                    {item.role}
                </Tag>

                {/* Quick Links */}
                {item.links && (
                    <div className="flex gap-3 mt-2" aria-label="Streaming links">
                        {item.links.spotify && (
                            <a
                                href={item.links.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted hover:text-accent transition-colors"
                                aria-label={`Listen to ${item.title} on Spotify`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                </svg>
                            </a>
                        )}
                        {item.links.apple && (
                            <a
                                href={item.links.apple}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted hover:text-accent transition-colors"
                                aria-label={`Listen to ${item.title} on Apple Music`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.08 5.08 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.96-1.388 1.106-.915.212-1.78-.114-2.375-.831-.407-.49-.559-1.075-.463-1.731.105-.722.478-1.285 1.1-1.656.49-.292 1.032-.39 1.595-.46.83-.102 1.66-.074 2.49-.1v-2.73c0-.11-.003-.22-.05-.327-.053-.124-.153-.197-.287-.214-.11-.015-.223-.013-.333-.026-.883-.103-1.767-.21-2.65-.313-.65-.075-1.3-.15-1.95-.225-.078-.01-.157-.02-.235-.024-.184-.01-.305.07-.335.254-.01.063-.01.13-.01.196v7.84c0 .622-.14 1.21-.53 1.718-.498.648-1.15 1.035-1.975 1.14-.913.117-1.762-.042-2.48-.672-.225-.198-.41-.442-.58-.696-.377-.567-.497-1.196-.344-1.875.15-.667.51-1.185 1.097-1.53.52-.306 1.09-.44 1.68-.502.637-.067 1.277-.06 1.915-.094.09-.005.135-.04.134-.133-.002-.928 0-1.855 0-2.783v-5.72c0-.147.027-.29.08-.43.13-.337.372-.556.715-.65.088-.024.178-.035.268-.05 1.21-.14 2.42-.28 3.632-.42.903-.105 1.807-.21 2.71-.315.116-.013.23-.03.345-.032.368-.006.577.19.6.56.003.047 0 .095 0 .143v3.75z" />
                                </svg>
                            </a>
                        )}
                        {item.links.youtube && (
                            <a
                                href={item.links.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted hover:text-accent transition-colors"
                                aria-label={`Watch ${item.title} on YouTube`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}
