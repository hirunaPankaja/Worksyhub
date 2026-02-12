import { Metadata } from 'next';
import {
    SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
    SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
    title: 'Free Online Video Player - Play Videos in Browser | No Upload, 100% Private',
    description:
        'Free offline video player — play MP4, WebM, OGG, MKV videos directly in your browser without uploading. 100% private, no server, no download. Speed control, fullscreen, keyboard shortcuts.',
    keywords: [
        'online video player', 'free video player', 'video player online',
        'play video in browser', 'browser video player',
        'offline video player', 'local video player',
        'mp4 player online', 'webm player', 'play mkv online',
        'private video player', 'no upload video player',
        'video player no download', 'html5 video player',
        'free movie player', 'play movies online free',
        'video player with speed control', 'video playback speed',
        'video player keyboard shortcuts',
        'play local video files', 'watch video without upload',
        'video player for pc', 'video player for mac',
        'client side video player', 'secure video player',
    ],
    alternates: { canonical: 'https://worksyhub.online/video-player' },
    openGraph: {
        title: 'Free Offline Video Player — Play Videos Privately in Browser',
        description: 'Play any video file in your browser. No upload, 100% private. MP4, WebM, OGG support.',
        url: 'https://worksyhub.online/video-player',
    },
};

export default function VideoPlayerLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        '@context': 'https://schema.org', '@type': 'WebApplication',
        name: 'Free Online Video Player',
        description: 'Play video files directly in your browser without uploading. 100% private, supports MP4, WebM, OGG.',
        applicationCategory: 'MultimediaApplication', operatingSystem: 'Any',
        url: 'https://worksyhub.online/video-player',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    };
    const breadcrumbSchema = {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
            { '@type': 'ListItem', position: 2, name: 'Video Player', item: 'https://worksyhub.online/video-player' },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {children}

            <SEOContentSection>
                <section className="space-y-4">
                    <SEOHeading level={2} id="about-video-player">Free Offline Video Player — Watch Videos Privately in Your Browser</SEOHeading>
                    <SEOParagraph>
                        Our <strong>free online video player</strong> lets you play video files directly in your web browser without uploading them to any server. Simply drag and drop a video file or click to browse, and it starts playing instantly. Your videos stay on your device at all times — <strong>100% private, no cloud, no tracking</strong>.
                    </SEOParagraph>
                    <SEOParagraph>
                        Perfect for watching downloaded movies, reviewing video content, playing tutorial recordings, or previewing video projects. Works on any device with a modern browser — desktop, laptop, tablet, or phone.
                    </SEOParagraph>
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="supported-formats">Supported Video Formats</SEOHeading>
                    <SEOTable
                        caption="Video Format Browser Support"
                        headers={['Format', 'Extension', 'Chrome', 'Firefox', 'Safari', 'Edge']}
                        rows={[
                            ['MP4 (H.264)', '.mp4', '✅ Full', '✅ Full', '✅ Full', '✅ Full'],
                            ['WebM (VP8/VP9)', '.webm', '✅ Full', '✅ Full', '⚠️ Partial', '✅ Full'],
                            ['OGG (Theora)', '.ogg, .ogv', '✅ Full', '✅ Full', '❌ No', '✅ Full'],
                            ['MKV (Matroska)', '.mkv', '⚠️ Depends*', '⚠️ Depends*', '❌ No', '⚠️ Depends*'],
                            ['AVI', '.avi', '❌ Usually no', '❌ Usually no', '❌ No', '❌ Usually no'],
                            ['MOV (QuickTime)', '.mov', '⚠️ Partial', '⚠️ Partial', '✅ Full', '⚠️ Partial'],
                        ]}
                    />
                    <SEOCallout type="tip">
                        <strong>Best format for browser playback:</strong> MP4 (H.264) is universally supported across all browsers. If your video does not play, try converting it to MP4 using a free tool like HandBrake or VLC.
                    </SEOCallout>
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="video-player-faq">Frequently Asked Questions</SEOHeading>
                    <SEOFAQ items={[
                        { question: 'Are my videos uploaded to any server?', answer: 'No! Your video files are never uploaded anywhere. The player runs entirely in your browser using the HTML5 video element and JavaScript. The video is read directly from your local file system and played locally. You can verify this by checking your browser\'s network tab.' },
                        { question: 'What is the maximum video file size?', answer: 'There is no hard file size limit from our tool. However, very large files (over 4GB) may be slow to load depending on your device\'s available RAM. For best performance, files under 2GB work smoothly on most devices.' },
                        { question: 'Can I watch movies and full-length videos?', answer: 'Yes! You can play any video file you have on your device, including full-length movies, TV shows, tutorials, and recordings. The player supports playback speed control, fullscreen, and keyboard shortcuts for a comfortable viewing experience.' },
                        { question: 'Why does my MKV or AVI file not play?', answer: 'MKV and AVI are container formats that can use many different codecs. Browsers natively support only specific codecs (H.264, VP8, VP9). If your MKV/AVI uses an unsupported codec, it won\'t play in the browser. Convert it to MP4 (H.264) using free tools like HandBrake or VLC for universal compatibility.' },
                    ]} />
                </section>

                <SEOInternalLinks links={[
                    { href: '/youtube-thumbnail-downloader', title: 'YouTube Thumbnail Downloader', description: 'Download video thumbnails' },
                    { href: '/image-resizer', title: 'Image Resizer', description: 'Resize images privately' },
                    { href: '/stopwatch', title: 'Stopwatch', description: 'Time with precision' },
                    { href: '/countdown-timer', title: 'Countdown Timer', description: 'Set countdown alarms' },
                ]} />
            </SEOContentSection>
        </>
    );
}
