'use client';

import { useState } from 'react';
import { Youtube, Download, ExternalLink, Copy, Check, Image, AlertCircle } from 'lucide-react';

interface ThumbnailData {
    quality: string;
    url: string;
    resolution: string;
}

export default function YouTubeThumbnailDownloaderPage() {
    const [videoUrl, setVideoUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [thumbnails, setThumbnails] = useState<ThumbnailData[]>([]);
    const [error, setError] = useState('');
    const [copiedUrl, setCopiedUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const extractVideoId = (url: string): string | null => {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
            /^([a-zA-Z0-9_-]{11})$/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        return null;
    };

    const handleGetThumbnails = () => {
        setError('');
        setThumbnails([]);
        setIsLoading(true);

        const id = extractVideoId(videoUrl.trim());

        if (!id) {
            setError('Please enter a valid YouTube video URL');
            setIsLoading(false);
            return;
        }

        setVideoId(id);

        // Generate thumbnail URLs for different resolutions
        const thumbnailData: ThumbnailData[] = [
            { quality: 'Max Resolution', url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`, resolution: '1280x720' },
            { quality: 'Standard', url: `https://img.youtube.com/vi/${id}/sddefault.jpg`, resolution: '640x480' },
            { quality: 'High Quality', url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`, resolution: '480x360' },
            { quality: 'Medium Quality', url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`, resolution: '320x180' },
            { quality: 'Default', url: `https://img.youtube.com/vi/${id}/default.jpg`, resolution: '120x90' },
        ];

        setThumbnails(thumbnailData);
        setIsLoading(false);
    };

    const handleDownload = async (url: string, quality: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `youtube-thumbnail-${videoId}-${quality.toLowerCase().replace(' ', '-')}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (err) {
            // Fallback: open in new tab
            window.open(url, '_blank');
        }
    };

    const handleCopyUrl = async (url: string) => {
        await navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(''), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <div className="p-3 rounded-xl bg-red-500/10">
                        <Youtube className="h-10 w-10 text-red-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-foreground">
                    YouTube Thumbnail Downloader
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Download YouTube video thumbnails in all available resolutions. Free, fast, and no signup required.
                </p>
            </div>

            {/* Main Tool */}
            <div className="p-6 rounded-xl border bg-card space-y-6">
                <div className="space-y-4">
                    <label className="block text-sm font-medium">
                        Enter YouTube Video URL
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="flex-1"
                            onKeyDown={(e) => e.key === 'Enter' && handleGetThumbnails()}
                        />
                        <button
                            onClick={handleGetThumbnails}
                            disabled={isLoading || !videoUrl.trim()}
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Image className="h-5 w-5" />
                            Get Thumbnails
                        </button>
                    </div>
                    {error && (
                        <div className="flex items-center gap-2 text-red-500 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}
                </div>

                {/* Thumbnail Results */}
                {thumbnails.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Download className="h-5 w-5 text-primary" />
                            Available Thumbnails
                        </h2>
                        <div className="grid gap-4">
                            {thumbnails.map((thumb, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-muted/30">
                                    <div className="relative group w-full md:w-48 flex-shrink-0">
                                        <img
                                            src={thumb.url}
                                            alt={`${thumb.quality} thumbnail`}
                                            className="w-full rounded-lg object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between gap-3">
                                        <div>
                                            <h3 className="font-semibold text-lg">{thumb.quality}</h3>
                                            <p className="text-sm text-muted-foreground">{thumb.resolution}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => handleDownload(thumb.url, thumb.quality)}
                                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                                            >
                                                <Download className="h-4 w-4" />
                                                Download
                                            </button>
                                            <button
                                                onClick={() => handleCopyUrl(thumb.url)}
                                                className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                            >
                                                {copiedUrl === thumb.url ? (
                                                    <>
                                                        <Check className="h-4 w-4 text-green-500" />
                                                        Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="h-4 w-4" />
                                                        Copy URL
                                                    </>
                                                )}
                                            </button>
                                            <a
                                                href={thumb.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                Open
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Watch & Download Video Section */}
                        <div className="p-5 rounded-xl border-2 border-dashed border-red-200 dark:border-red-800/50 bg-red-50/50 dark:bg-red-900/10 space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                                <Youtube className="h-5 w-5 text-red-500" />
                                Video Options
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={`https://www.youtube.com/watch?v=${videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <Youtube className="h-4 w-4" />
                                    Watch on YouTube
                                </a>
                                <a
                                    href={`https://www.y2mate.com/youtube/${videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Download Video (Y2Mate)
                                </a>
                                <a
                                    href={`https://en.savefrom.net/1-youtube-video-downloader-${videoId}/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Download Video (SaveFrom)
                                </a>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Video downloads are provided by third-party services. We are not affiliated with these services. Please respect YouTube&apos;s Terms of Service and copyright laws when downloading content.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Comprehensive SEO Content */}
            <div className="space-y-10 border-t pt-8 mt-8">

                {/* What is YouTube Thumbnail Downloader */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">What is a YouTube Thumbnail Downloader?</h2>
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <p className="leading-relaxed">
                            A <strong>YouTube Thumbnail Downloader</strong> is a free online tool that allows you to download the preview image (thumbnail) of any YouTube video. Thumbnails are the static images you see before playing a video – they're crucial for attracting viewers and creating compelling content.
                        </p>
                        <p className="leading-relaxed">
                            Our tool extracts thumbnails in <strong>multiple resolutions</strong> including HD (1280x720), SD (640x480), and smaller sizes. Simply paste a YouTube video URL, and instantly get all available thumbnail versions to download for free.
                        </p>
                    </div>
                </section>

                {/* How to Use */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">How to Download YouTube Thumbnails</h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="p-5 rounded-xl border bg-card text-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3">
                                <span className="text-xl font-bold text-red-500">1</span>
                            </div>
                            <h3 className="font-semibold mb-2">Copy URL</h3>
                            <p className="text-sm text-muted-foreground">Copy the YouTube video URL from your browser</p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card text-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3">
                                <span className="text-xl font-bold text-red-500">2</span>
                            </div>
                            <h3 className="font-semibold mb-2">Paste</h3>
                            <p className="text-sm text-muted-foreground">Paste the URL into the input field above</p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card text-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3">
                                <span className="text-xl font-bold text-red-500">3</span>
                            </div>
                            <h3 className="font-semibold mb-2">Get Thumbnails</h3>
                            <p className="text-sm text-muted-foreground">Click the button to fetch all available resolutions</p>
                        </div>
                        <div className="p-5 rounded-xl border bg-card text-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3">
                                <span className="text-xl font-bold text-red-500">4</span>
                            </div>
                            <h3 className="font-semibold mb-2">Download</h3>
                            <p className="text-sm text-muted-foreground">Click download on your preferred resolution</p>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Why Download YouTube Thumbnails?</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">🎨</div>
                            <h3 className="font-bold text-lg mb-2">Design Inspiration</h3>
                            <p className="text-sm text-muted-foreground">Study successful thumbnails to improve your own designs. Learn what makes thumbnails click-worthy.</p>
                        </div>
                        <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">📊</div>
                            <h3 className="font-bold text-lg mb-2">Content Research</h3>
                            <p className="text-sm text-muted-foreground">Analyze thumbnail strategies of top creators in your niche for competitive research.</p>
                        </div>
                        <div className="p-5 rounded-xl border hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">📝</div>
                            <h3 className="font-bold text-lg mb-2">Presentations</h3>
                            <p className="text-sm text-muted-foreground">Include video thumbnails in presentations, documents, or blog posts when referencing YouTube content.</p>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                            <summary className="font-medium flex items-center justify-between">
                                Is it legal to download YouTube thumbnails?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-muted-foreground">
                                YouTube thumbnails are publicly accessible images. Downloading them for personal use, research, or educational purposes is generally acceptable. However, you should not claim ownership of others' work or use thumbnails commercially without permission.
                            </p>
                        </details>

                        <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                            <summary className="font-medium flex items-center justify-between">
                                What thumbnail resolutions are available?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-muted-foreground">
                                YouTube provides thumbnails in multiple sizes: Max Resolution (1280x720), Standard (640x480), High Quality (480x360), Medium Quality (320x180), and Default (120x90). Not all videos have max resolution thumbnails available.
                            </p>
                        </details>

                        <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                            <summary className="font-medium flex items-center justify-between">
                                Why is max resolution not available for some videos?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-muted-foreground">
                                Max resolution (1280x720) thumbnails are only available for videos that have custom thumbnails uploaded or were uploaded in HD quality. Older videos or those without custom thumbnails may only have lower resolution options.
                            </p>
                        </details>

                        <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                            <summary className="font-medium flex items-center justify-between">
                                Does this tool store my data?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-muted-foreground">
                                No, our tool runs entirely in your browser. We don't store any URLs you enter, and thumbnail downloads happen directly between you and YouTube's servers. Your privacy is completely protected.
                            </p>
                        </details>

                        <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                            <summary className="font-medium flex items-center justify-between">
                                Can I download thumbnails from YouTube Shorts?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-muted-foreground">
                                Yes! Our tool supports all YouTube video formats including regular videos, YouTube Shorts, and embedded videos. Just paste the URL and we'll extract the video ID automatically.
                            </p>
                        </details>

                        <details className="group border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                            <summary className="font-medium flex items-center justify-between">
                                What URL formats are supported?
                                <span className="group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-muted-foreground">
                                We support all common YouTube URL formats: youtube.com/watch?v=..., youtu.be/..., youtube.com/embed/..., youtube.com/shorts/..., and even just the 11-character video ID directly.
                            </p>
                        </details>
                    </div>
                </section>

                {/* Related Tools */}
                <section className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                    <h3 className="text-xl font-bold mb-4 text-center">Related Free Tools</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <a href="/qr-code-generator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
                            <div className="font-medium">QR Code Generator</div>
                            <div className="text-xs text-muted-foreground">Create QR codes</div>
                        </a>
                        <a href="/image-resizer" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
                            <div className="font-medium">Image Resizer</div>
                            <div className="text-xs text-muted-foreground">Resize images</div>
                        </a>
                        <a href="/password-generator" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
                            <div className="font-medium">Password Generator</div>
                            <div className="text-xs text-muted-foreground">Secure passwords</div>
                        </a>
                        <a href="/word-counter" className="p-4 rounded-lg bg-background hover:bg-muted transition-colors border">
                            <div className="font-medium">Word Counter</div>
                            <div className="text-xs text-muted-foreground">Analyze text</div>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
