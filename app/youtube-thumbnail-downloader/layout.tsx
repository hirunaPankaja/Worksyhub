import type { Metadata } from 'next';
import { Youtube, Video, Image } from 'lucide-react';

export const metadata: Metadata = {
    title: 'YouTube Thumbnail Downloader | Download HD Thumbnails Free - WorksyHub',
    description: 'Download YouTube video thumbnails in all resolutions (HD, SD, MQ, Default). Free online tool to save YouTube thumbnails instantly. No signup required.',
    keywords: [
        'youtube thumbnail downloader', 'download youtube thumbnail', 'youtube thumbnail grabber',
        'youtube video thumbnail', 'get youtube thumbnail', 'youtube thumbnail hd',
        'youtube thumbnail download free', 'youtube thumbnail saver', 'extract youtube thumbnail',
        'youtube thumbnail image', 'youtube thumbnail url', 'youtube thumbnail generator'
    ],
    openGraph: {
        title: 'YouTube Thumbnail Downloader - Download HD Thumbnails Free',
        description: 'Download YouTube video thumbnails in all resolutions. Free, fast, no signup.',
        type: 'website',
        url: 'https://worksyhub.online/youtube-thumbnail-downloader',
    },
    alternates: {
        canonical: 'https://worksyhub.online/youtube-thumbnail-downloader',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "YouTube Thumbnail Downloader",
                        "applicationCategory": "UtilityApplication",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "description": "Download YouTube video thumbnails in all resolutions for free.",
                        "url": "https://worksyhub.online/youtube-thumbnail-downloader",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.8",
                            "ratingCount": "1450"
                        }
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Download YouTube Thumbnails",
                        "step": [
                            {
                                "@type": "HowToStep",
                                "position": 1,
                                "text": "Copy the YouTube video URL from your browser"
                            },
                            {
                                "@type": "HowToStep",
                                "position": 2,
                                "text": "Paste the URL into the input field"
                            },
                            {
                                "@type": "HowToStep",
                                "position": 3,
                                "text": "Click 'Get Thumbnails' to fetch all available resolutions"
                            },
                            {
                                "@type": "HowToStep",
                                "position": 4,
                                "text": "Click 'Download' on your preferred resolution to save the image"
                            }
                        ]
                    })
                }}
            />
            {children}
        </>
    );
}
