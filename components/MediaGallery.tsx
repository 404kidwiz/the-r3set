'use client';

import { useState } from 'react';
import Image from 'next/image';
import Tag from './Tag';
import TrailerModal from './TrailerModal';

export interface PhotoItem {
    id: string;
    src: string;
    alt: string;
    category: string;
    photographer?: string;
}

export interface VideoItem {
    id: string;
    title: string;
    thumbnail: string;
    videoSrc: string;
    category: 'Trailer' | 'Music Videos' | 'BTS';
    duration?: string;
}

interface MediaGalleryProps {
    photos: PhotoItem[];
    videos: VideoItem[];
}

/**
 * Combined Photos + Videos gallery
 * @design-system Editorial grid for photos, category chips for videos
 * @accessibility Keyboard nav in modals, focus trap, ARIA labels
 */
export default function MediaGallery({ photos, videos }: MediaGalleryProps) {
    const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

    return (
        <div className="w-full">
            {/* Tab Switcher */}
            <div className="flex justify-center gap-4 mb-12 border-b border-stroke">
                <button
                    onClick={() => setActiveTab('photos')}
                    className={`
            px-6 py-3 text-lg font-medium transition-all relative
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            ${activeTab === 'photos' ? 'text-fg' : 'text-muted hover:text-fg'}
          `}
                    aria-pressed={activeTab === 'photos'}
                >
                    Photos
                    {activeTab === 'photos' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" aria-hidden="true" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('videos')}
                    className={`
            px-6 py-3 text-lg font-medium transition-all relative
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            ${activeTab === 'videos' ? 'text-fg' : 'text-muted hover:text-fg'}
          `}
                    aria-pressed={activeTab === 'videos'}
                >
                    Videos
                    {activeTab === 'videos' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" aria-hidden="true" />
                    )}
                </button>
            </div>

            {/* Content */}
            {activeTab === 'photos' ? <PhotoGrid photos={photos} /> : <VideoLibrary videos={videos} />}
        </div>
    );
}

/**
 * Photo grid with contact sheet toggle and modal viewer
 */
function PhotoGrid({ photos }: { photos: PhotoItem[] }) {
    const [density, setDensity] = useState<'editorial' | 'contact'>('editorial');
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

    const gridCols = density === 'editorial'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
        : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4';

    return (
        <>
            {/* Density Toggle */}
            <div className="flex justify-end mb-6">
                <div className="flex gap-2" role="group" aria-label="Grid density">
                    <button
                        onClick={() => setDensity('editorial')}
                        className={`
              px-4 py-2 text-sm rounded-sm transition-all
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
              ${density === 'editorial' ? 'bg-surface-2 text-fg' : 'text-muted hover:bg-surface'}
            `}
                        aria-pressed={density === 'editorial'}
                    >
                        Editorial
                    </button>
                    <button
                        onClick={() => setDensity('contact')}
                        className={`
              px-4 py-2 text-sm rounded-sm transition-all
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
              ${density === 'contact' ? 'bg-surface-2 text-fg' : 'text-muted hover:bg-surface'}
            `}
                        aria-pressed={density === 'contact'}
                    >
                        Contact Sheet
                    </button>
                </div>
            </div>

            {/* Photo Grid */}
            <div className={`grid ${gridCols}`}>
                {photos.map((photo, idx) => (
                    <button
                        key={photo.id}
                        onClick={() => setSelectedPhoto(idx)}
                        className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes={density === 'editorial' ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw' : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {density === 'editorial' && photo.photographer && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-xs text-white/90">Photo by {photo.photographer}</p>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Photo Modal */}
            {selectedPhoto !== null && (
                <PhotoModal
                    photos={photos}
                    initialIndex={selectedPhoto}
                    onClose={() => setSelectedPhoto(null)}
                />
            )}
        </>
    );
}

/**
 * Photo modal viewer with keyboard navigation
 */
function PhotoModal({
    photos,
    initialIndex,
    onClose,
}: {
    photos: PhotoItem[];
    initialIndex: number;
    onClose: () => void;
}) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const currentPhoto = photos[currentIndex];

    const goNext = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
    const goPrev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

    // Keyboard navigation
    useState(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close viewer"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Navigation */}
            <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Previous photo"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Next photo"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Image */}
            <div className="relative max-w-6xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
                <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                />
            </div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 rounded-full text-white text-sm">
                {currentIndex + 1} / {photos.length}
            </div>
        </div>
    );
}

/**
 * Video library with category filter
 */
function VideoLibrary({ videos }: { videos: VideoItem[] }) {
    const [category, setCategory] = useState<VideoItem['category'] | 'All'>('All');
    const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

    const categories: Array<VideoItem['category'] | 'All'> = ['All', 'Trailer', 'Music Videos', 'BTS'];
    const filteredVideos = videos.filter((v) => category === 'All' || v.category === category);

    return (
        <>
            {/* Category Chips */}
            <div className="flex flex-wrap justify-center gap-3 mb-12" role="group" aria-label="Filter videos by category">
                {categories.map((cat) => {
                    const isActive = category === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`
                px-5 py-2 text-sm font-medium rounded-sm transition-all
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                ${isActive ? 'bg-accent text-bg' : 'bg-surface text-muted hover:bg-surface-2 hover:text-fg'}
              `}
                            aria-pressed={isActive}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                    <button
                        key={video.id}
                        onClick={() => setSelectedVideo(video)}
                        className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                    >
                        <div className="relative aspect-video mb-3 overflow-hidden rounded-sm bg-surface">
                            <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Play Icon */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/90 group-hover:bg-accent transition-all group-hover:scale-110">
                                    <svg className="w-6 h-6 text-bg ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                            {video.duration && (
                                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white">
                                    {video.duration}
                                </div>
                            )}
                        </div>
                        <h3 className="text-base font-medium text-fg group-hover:text-accent transition-colors">
                            {video.title}
                        </h3>
                        <Tag variant="category" className="mt-2">
                            {video.category}
                        </Tag>
                    </button>
                ))}
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <TrailerModal
                    isOpen={true}
                    onClose={() => setSelectedVideo(null)}
                    videoSrc={selectedVideo.videoSrc}
                />
            )}
        </>
    );
}
