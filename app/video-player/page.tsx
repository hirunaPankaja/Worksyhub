'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
    Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward,
    Upload, Film, Settings, RotateCcw, MonitorPlay, FileVideo,
    Gauge, Trash2
} from 'lucide-react';

export default function VideoPlayerPage() {
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const [videoName, setVideoName] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showSpeedMenu, setShowSpeedMenu] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');

    const videoRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    const supportedFormats = ['video/mp4', 'video/webm', 'video/ogg', 'video/x-matroska', 'video/avi', 'video/quicktime'];
    const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

    const handleFileSelect = useCallback((file: File) => {
        setError('');
        if (!file.type.startsWith('video/')) {
            setError('Please select a video file (MP4, WebM, OGG, MKV, AVI, MOV).');
            return;
        }
        if (videoSrc) URL.revokeObjectURL(videoSrc);
        const url = URL.createObjectURL(file);
        setVideoSrc(url);
        setVideoName(file.name);
        setIsPlaying(false);
        setCurrentTime(0);
        setPlaybackRate(1);
    }, [videoSrc]);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
        e.target.value = '';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    };

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (videoRef.current) {
            videoRef.current.volume = val;
            setIsMuted(val === 0);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setCurrentTime(val);
        if (videoRef.current) videoRef.current.currentTime = val;
    };

    const skip = (seconds: number) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    };

    const changeSpeed = (speed: number) => {
        setPlaybackRate(speed);
        if (videoRef.current) videoRef.current.playbackRate = speed;
        setShowSpeedMenu(false);
    };

    const toggleFullscreen = () => {
        const container = document.querySelector('.video-container');
        if (!container) return;
        if (!document.fullscreenElement) {
            container.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    const clearVideo = () => {
        if (videoSrc) URL.revokeObjectURL(videoSrc);
        setVideoSrc(null);
        setVideoName('');
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setError('');
    };

    const formatTime = (s: number): string => {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = Math.floor(s % 60);
        if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        return `${m}:${sec.toString().padStart(2, '0')}`;
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!videoSrc) return;
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            switch (e.key) {
                case ' ': case 'k': e.preventDefault(); togglePlay(); break;
                case 'ArrowLeft': e.preventDefault(); skip(-10); break;
                case 'ArrowRight': e.preventDefault(); skip(10); break;
                case 'ArrowUp': e.preventDefault(); handleVolumeChange({ target: { value: String(Math.min(1, volume + 0.1)) } } as React.ChangeEvent<HTMLInputElement>); break;
                case 'ArrowDown': e.preventDefault(); handleVolumeChange({ target: { value: String(Math.max(0, volume - 0.1)) } } as React.ChangeEvent<HTMLInputElement>); break;
                case 'm': toggleMute(); break;
                case 'f': toggleFullscreen(); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <div className="p-3 rounded-xl bg-purple-500/10">
                        <MonitorPlay className="h-10 w-10 text-purple-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-foreground">
                    Free Offline Video Player
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Play videos directly in your browser — no upload, 100% private. Supports MP4, WebM, OGG & more.
                </p>
            </div>

            {!videoSrc ? (
                /* Drop Zone */
                <div
                    ref={dropZoneRef}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`p-16 rounded-2xl border-2 border-dashed cursor-pointer transition-all text-center space-y-4 ${isDragging
                            ? 'border-purple-500 bg-purple-500/10 scale-[1.01]'
                            : 'border-border hover:border-purple-400 hover:bg-muted/50'
                        }`}
                >
                    <FileVideo className="h-16 w-16 mx-auto text-purple-400/60" />
                    <div>
                        <p className="text-xl font-semibold text-foreground">
                            Drop a video file here or click to browse
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            Supports MP4, WebM, OGG, MKV, AVI, MOV — your file never leaves your device
                        </p>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleFileInput}
                        className="hidden"
                    />
                </div>
            ) : (
                /* Video Player */
                <div className="space-y-4">
                    <div className="video-container rounded-2xl overflow-hidden bg-black relative group">
                        <video
                            ref={videoRef}
                            src={videoSrc}
                            onClick={togglePlay}
                            onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
                            onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
                            onEnded={() => setIsPlaying(false)}
                            onError={() => setError('This video format may not be supported by your browser. Try MP4 or WebM.')}
                            className="w-full max-h-[75vh] cursor-pointer"
                            playsInline
                        />

                        {/* Play overlay */}
                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="p-5 rounded-full bg-black/50 backdrop-blur-sm">
                                    <Play className="h-12 w-12 text-white fill-white" />
                                </div>
                            </div>
                        )}

                        {/* Controls bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* Progress bar */}
                            <input
                                type="range"
                                min={0}
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                step={0.1}
                                className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer mb-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                                style={{
                                    background: `linear-gradient(to right, #a855f7 ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) ${(currentTime / (duration || 1)) * 100}%)`
                                }}
                            />

                            <div className="flex items-center justify-between text-white">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => skip(-10)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors" title="Rewind 10s">
                                        <SkipBack className="h-5 w-5" />
                                    </button>
                                    <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 fill-white" />}
                                    </button>
                                    <button onClick={() => skip(10)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors" title="Forward 10s">
                                        <SkipForward className="h-5 w-5" />
                                    </button>

                                    <span className="text-sm font-mono ml-2">
                                        {formatTime(currentTime)} / {formatTime(duration)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* Volume */}
                                    <div className="flex items-center gap-2">
                                        <button onClick={toggleMute} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                                            {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                                        </button>
                                        <input
                                            type="range"
                                            min={0}
                                            max={1}
                                            step={0.05}
                                            value={isMuted ? 0 : volume}
                                            onChange={handleVolumeChange}
                                            className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                                        />
                                    </div>

                                    {/* Speed */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                                            className="px-2.5 py-1 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
                                        >
                                            <Gauge className="h-4 w-4" />
                                            {playbackRate}x
                                        </button>
                                        {showSpeedMenu && (
                                            <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-white/10">
                                                {speeds.map(s => (
                                                    <button
                                                        key={s}
                                                        onClick={() => changeSpeed(s)}
                                                        className={`block w-full px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors ${playbackRate === s ? 'text-purple-400 font-semibold' : 'text-white'}`}
                                                    >
                                                        {s}x
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Fullscreen */}
                                    <button onClick={toggleFullscreen} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors" title="Fullscreen (F)">
                                        <Maximize className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* File info + actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border bg-card">
                        <div className="flex items-center gap-3">
                            <Film className="h-5 w-5 text-purple-500" />
                            <span className="text-sm font-medium text-foreground truncate max-w-xs">{videoName}</span>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                            >
                                <Upload className="h-4 w-4" />
                                Open Another
                            </button>
                            <button
                                onClick={clearVideo}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                            >
                                <Trash2 className="h-4 w-4" />
                                Close
                            </button>
                            <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileInput} className="hidden" />
                        </div>
                    </div>

                    {/* Keyboard shortcuts */}
                    <div className="p-4 rounded-xl border bg-muted/30">
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Settings className="h-4 w-4" /> Keyboard Shortcuts
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-muted-foreground">
                            <span><kbd className="px-1.5 py-0.5 rounded bg-muted border text-foreground font-mono">Space</kbd> Play/Pause</span>
                            <span><kbd className="px-1.5 py-0.5 rounded bg-muted border text-foreground font-mono">←</kbd> Rewind 10s</span>
                            <span><kbd className="px-1.5 py-0.5 rounded bg-muted border text-foreground font-mono">→</kbd> Forward 10s</span>
                            <span><kbd className="px-1.5 py-0.5 rounded bg-muted border text-foreground font-mono">M</kbd> Mute/Unmute</span>
                            <span><kbd className="px-1.5 py-0.5 rounded bg-muted border text-foreground font-mono">F</kbd> Fullscreen</span>
                            <span><kbd className="px-1.5 py-0.5 rounded bg-muted border text-foreground font-mono">↑</kbd> Volume Up</span>
                            <span><kbd className="px-1.5 py-0.5 rounded bg-muted border text-foreground font-mono">↓</kbd> Volume Down</span>
                            <span><kbd className="px-1.5 py-0.5 rounded bg-muted border text-foreground font-mono">K</kbd> Play/Pause</span>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
                    {error}
                </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-3">🔒</div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">100% Private</h3>
                    <p className="text-sm text-muted-foreground">Your video never leaves your device. Everything runs locally in your browser — no upload, no servers.</p>
                </div>
                <div className="p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-3">⚡</div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">Instant Playback</h3>
                    <p className="text-sm text-muted-foreground">No buffering, no waiting. Videos play instantly from your local file system with full hardware acceleration.</p>
                </div>
                <div className="p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-3">🎛️</div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">Full Controls</h3>
                    <p className="text-sm text-muted-foreground">Playback speed control (0.25x–2x), keyboard shortcuts, volume control, fullscreen, and seek bar.</p>
                </div>
            </div>
        </div>
    );
}
