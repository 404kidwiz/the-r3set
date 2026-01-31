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
    category: 'Trailer' | 'Music Videos' | 'BTS' | 'Produced By';
    duration?: string;
    type?: 'file' | 'youtube';
}

interface MediaGalleryProps {
    photos: PhotoItem[];
    videos: VideoItem[];
}

type MediaItem = (PhotoItem & { mediaType: 'photo' }) | (VideoItem & { mediaType: 'video' });

export default function MediaGallery({ photos, videos }: MediaGalleryProps) {
    const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

    // Merge and interleave content for "Creative Stream"
    // Simple shuffle-like join: [Video, Photo, Photo, Video, Photo...]
    const mergedContent: MediaItem[] = [];
    const maxLength = Math.max(photos.length, videos.length);

    for (let i = 0; i < maxLength; i++) {
        if (videos[i]) mergedContent.push({ ...videos[i], mediaType: 'video' });
        if (photos[i]) mergedContent.push({ ...photos[i], mediaType: 'photo' });
        if (photos[i + 1]) mergedContent.push({ ...photos[i + 1], mediaType: 'photo' }); // Weights more photos
        i++; // skip next photo since we used it
    }

    return (
        <div className="w-full">
            {/* Creative Stream Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-dense">
                {mergedContent.map((item, idx) => {
                    const isVideo = item.mediaType === 'video';
                    // Randomly span large for visual interest (based on index)
                    const isLarge = idx % 7 === 0 || idx === 0;
                    const spanClass = isLarge ? 'sm:col-span-2 sm:row-span-2' : 'col-span-1 row-span-1';

                    return (
                        <button
                            key={item.id}
                            onClick={() => isVideo ? setSelectedVideo(item as VideoItem) : setSelectedPhoto(idx)}
                            className={`group relative overflow-hidden rounded-sm bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${spanClass} aspect-square sm:aspect-auto`}
                        >
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={isVideo ? (item as VideoItem).thumbnail : (item as PhotoItem).src}
                                    alt={isVideo ? (item as VideoItem).title : (item as PhotoItem).alt}
                                    fill
                                    sizes={isLarge ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 50vw, 25vw'}
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Overlays */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                            {isVideo && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent/90 group-hover:bg-accent group-hover:scale-110 transition-all shadow-lg backdrop-blur-sm">
                                        <svg className="w-5 h-5 text-bg ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {!isVideo && (item as PhotoItem).photographer && (
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-xs text-white/90 font-medium tracking-wide">
                                        📷 {(item as PhotoItem).photographer}
                                    </p>
                                </div>
                            )}

                            {/* Hover info for videos */}
                            {isVideo && (
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-sm font-bold text-white mb-1 line-clamp-1">{(item as VideoItem).title}</p>
                                    <Tag variant="category">{(item as VideoItem).category}</Tag>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <TrailerModal
                    isOpen={true}
                    onClose={() => setSelectedVideo(null)}
                    videoSrc={selectedVideo.videoSrc}
                    videoType={selectedVideo.type}
                />
            )}

            {/* Photo View Modal */}
            {selectedPhoto !== null && (
                <PhotoModal
                    photos={photos}
                    // Find the ID of the photo at the selected index in mergedContent, 
                    // but we need to ensure we are passing a valid ID that exists in the photos array
                    initialId={mergedContent[selectedPhoto].id}
                    onClose={() => setSelectedPhoto(null)}
                />
            )}
        </div>
    );
}

/**
 * Photo modal viewer
 */
function PhotoModal({
    photos,
    initialId,
    onClose,
}: {
    photos: PhotoItem[];
    initialId: string;
    onClose: () => void;
}) {
    const initialIndex = photos.findIndex(p => p.id === initialId);
    const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
    const currentPhoto = photos[currentIndex];

    // Safety check if id not found
    if (!currentPhoto) return null;

    const goNext = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
    const goPrev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

    // Keyboard navigation
    useState(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab') { e.preventDefault(); /* trap */ }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-200"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent bg-black/20 rounded-full"
                aria-label="Close viewer"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Navigation */}
            <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 z-40 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Previous photo"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 z-40 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Next photo"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Image */}
            <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                />
            </div>

            {/* Caption */}
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <div className="inline-block bg-black/60 backdrop-blur-md px-6 py-3 rounded-full text-white text-sm border border-white/10">
                    <span className="font-medium mr-2">{currentIndex + 1} / {photos.length}</span>
                    <span className="opacity-70 border-l border-white/20 pl-2 ml-2">{currentPhoto.category}</span>
                </div>
            </div>
        </div>
    );
}
