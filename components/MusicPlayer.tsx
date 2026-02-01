'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';

interface MusicPlayerProps {
    youtubeId?: string;
    spotifyUri?: string;
    title: string;
    artist: string;
    coverUrl: string;
    onClose: () => void;
}

/**
 * Hybrid Music Player Component
 * - Primary: YouTube Player (works for everyone)
 * - Enhanced: Spotify Premium (if available)
 * - Automatic fallback logic
 */
export default function MusicPlayer({
    youtubeId,
    spotifyUri,
    title,
    artist,
    coverUrl,
    onClose
}: MusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasSpotifyPremium, setHasSpotifyPremium] = useState(false);
    const [playerType, setPlayerType] = useState<'youtube' | 'spotify'>('youtube');
    const playerRef = useRef<any>(null);

    // Check for Spotify Premium (placeholder - will implement with OAuth)
    useEffect(() => {
        // TODO: Check Spotify OAuth token for Premium status
        const checkSpotifyPremium = async () => {
            // For now, default to YouTube
            setPlayerType('youtube');
        };
        checkSpotifyPremium();
    }, []);

    // Initialize YouTube Player
    useEffect(() => {
        if (!youtubeId || playerType !== 'youtube') return;

        // Load YouTube IFrame API
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        // Initialize player when API is ready
        (window as any).onYouTubeIframeAPIReady = () => {
            playerRef.current = new (window as any).YT.Player(`youtube-player-${youtubeId}`, {
                height: '0',
                width: '0',
                videoId: youtubeId,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                },
                events: {
                    onReady: (event: any) => {
                        event.target.playVideo();
                        setIsPlaying(true);
                    },
                    onStateChange: (event: any) => {
                        setIsPlaying(event.data === 1); // 1 = playing
                    }
                }
            });
        };

        return () => {
            playerRef.current?.destroy();
        };
    }, [youtubeId, playerType]);

    const togglePlayPause = () => {
        if (playerType === 'youtube' && playerRef.current) {
            if (isPlaying) {
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
        }
        // TODO: Spotify playback control
    };

    const toggleMute = () => {
        if (playerType === 'youtube' && playerRef.current) {
            if (isMuted) {
                playerRef.current.unMute();
            } else {
                playerRef.current.mute();
            }
            setIsMuted(!isMuted);
        }
        // TODO: Spotify volume control
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
            >
                {/* Glass card container */}
                <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-4 shadow-2xl">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        aria-label="Close player"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>

                    <div className="flex items-center gap-4">
                        {/* Album art */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface">
                            <img
                                src={coverUrl}
                                alt={`${title} cover`}
                                className="w-full h-full object-cover"
                            />
                            {/* Player type badge */}
                            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-black/60 text-white/80">
                                {playerType === 'spotify' ? 'Premium' : 'Free'}
                            </div>
                        </div>

                        {/* Track info & controls */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-bold text-sm truncate">{title}</h3>
                            <p className="text-white/60 text-xs truncate">{artist}</p>

                            {/* Controls */}
                            <div className="flex items-center gap-3 mt-2">
                                <button
                                    onClick={togglePlayPause}
                                    className="w-8 h-8 rounded-full bg-accent hover:bg-accent/90 flex items-center justify-center transition-colors"
                                    aria-label={isPlaying ? 'Pause' : 'Play'}
                                >
                                    {isPlaying ? (
                                        <Pause className="w-4 h-4 text-white fill-white" />
                                    ) : (
                                        <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                                    )}
                                </button>

                                <button
                                    onClick={toggleMute}
                                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                                >
                                    {isMuted ? (
                                        <VolumeX className="w-3.5 h-3.5 text-white" />
                                    ) : (
                                        <Volume2 className="w-3.5 h-3.5 text-white" />
                                    )}
                                </button>

                                {/* Playback source indicator */}
                                <div className="ml-auto">
                                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                                        {playerType === 'youtube' ? 'YouTube Audio' : 'Spotify Premium'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hidden YouTube iframe */}
                    {playerType === 'youtube' && youtubeId && (
                        <div id={`youtube-player-${youtubeId}`} style={{ display: 'none' }} />
                    )}

                    {/* Live region for screen reader announcements - WCAG 2.1 AA */}
                    <div
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        className="sr-only"
                    >
                        {isPlaying
                            ? `Now playing ${title} by ${artist}`
                            : title
                                ? `Paused ${title}`
                                : 'No track selected'
                        }
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
