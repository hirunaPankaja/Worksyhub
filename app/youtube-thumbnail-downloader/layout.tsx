import { Metadata } from 'next';
import {
    SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
    SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
    title: 'YouTube Thumbnail Downloader - Download HD Thumbnails Free | 1080p, 4K Quality',
    description:
        'Free YouTube thumbnail downloader — download any YouTube video thumbnail in HD, Full HD (1080p), or max resolution. No watermark, no signup. Just paste the URL.',
    keywords: [
        'YouTube thumbnail downloader', 'YouTube thumbnail download',
        'download YouTube thumbnail', 'YouTube thumbnail grab',
        'YouTube thumbnail saver', 'YouTube thumbnail extractor',
        'YouTube thumbnail image downloader', 'YT thumbnail downloader',
        'YouTube thumbnail HD', 'YouTube thumbnail 4K',
        'YouTube thumbnail full size', 'YouTube thumbnail high quality',
        'YouTube thumbnail 1080p', 'YouTube thumbnail max resolution',
        'get YouTube thumbnail', 'save YouTube thumbnail',
        'YouTube thumbnail URL', 'YouTube thumbnail link',
        'YouTube video thumbnail', 'YouTube thumbnail free',
        'YouTube thumbnail download online', 'YouTube thumbnail no watermark',
        'YouTube thumbnail generator', 'YouTube thumbnail maker',
        'YouTube thumbnail ideas', 'YouTube thumbnail size',
        'YouTube thumbnail dimensions', 'best YouTube thumbnails',
        'YouTube thumbnail template', 'YouTube thumbnail design',
        'download video thumbnail', 'video thumbnail downloader',
        'YouTube thumbnail for free', 'YouTube thumbnail grabber online',
        'how to download YouTube thumbnails', 'how to save YouTube thumbnails',
        'YouTube thumbnail quality', 'YouTube thumbnail resolution',
        'maxresdefault thumbnail', 'hqdefault thumbnail',
        'sddefault thumbnail', 'mqdefault thumbnail',
        'YouTube thumbnail 1280x720', 'YouTube thumbnail download HD free',
    ],
    alternates: { canonical: 'https://worksyhub.online/youtube-thumbnail-downloader' },
    openGraph: {
        title: 'Free YouTube Thumbnail Downloader — HD, Full Size, No Watermark',
        description: 'Download any YouTube video thumbnail in HD or max resolution. Free, fast, no signup required.',
        url: 'https://worksyhub.online/youtube-thumbnail-downloader',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YouTube Thumbnail Downloader - HD Free',
        description: 'Download YouTube thumbnails in HD! Just paste the video URL. No watermark, no signup.',
    },
};

export default function YouTubeThumbnailLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        '@context': 'https://schema.org', '@type': 'WebApplication',
        name: 'Free YouTube Thumbnail Downloader',
        description: 'Download YouTube video thumbnails in HD, Full HD, and maximum resolution. Free, no watermark, no signup.',
        applicationCategory: 'MultimediaApplication', operatingSystem: 'Any',
        url: 'https://worksyhub.online/youtube-thumbnail-downloader',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    };
    const howToSchema = {
        '@context': 'https://schema.org', '@type': 'HowTo',
        name: 'How to Download YouTube Thumbnails',
        description: 'Step-by-step guide to downloading YouTube video thumbnails in HD quality.',
        step: [
            { '@type': 'HowToStep', name: 'Copy the YouTube video URL', text: 'Go to YouTube and copy the URL of the video whose thumbnail you want to download. The URL will look like https://www.youtube.com/watch?v=VIDEOID.' },
            { '@type': 'HowToStep', name: 'Paste the URL', text: 'Paste the copied YouTube URL into the input field on our thumbnail downloader page.' },
            { '@type': 'HowToStep', name: 'Choose resolution', text: 'Select your preferred thumbnail resolution — Maximum Resolution, HD (1280×720), Standard (640×480), or Medium (320×180).' },
            { '@type': 'HowToStep', name: 'Download', text: 'Click the download button to save the thumbnail image to your device.' },
        ],
    };
    const breadcrumbSchema = {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
            { '@type': 'ListItem', position: 2, name: 'YouTube Thumbnail Downloader', item: 'https://worksyhub.online/youtube-thumbnail-downloader' },
        ],
    };
    const faqSchema = {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: 'What resolution can I download YouTube thumbnails in?', acceptedAnswer: { '@type': 'Answer', text: 'YouTube thumbnails are available in four resolutions: Maximum Resolution (maxresdefault, typically 1920×1080 — not available for all videos), HD (hqdefault, 1280×720), Standard Definition (sddefault, 640×480), and Medium Quality (mqdefault, 320×180). We always try the highest resolution first.' } },
            { '@type': 'Question', name: 'Is it legal to download YouTube thumbnails?', acceptedAnswer: { '@type': 'Answer', text: 'YouTube thumbnails are publicly accessible images. Downloading them for personal use, reference, research, or education is generally acceptable. However, using someone else\'s thumbnail commercially or claiming it as your own work may violate copyright. Always create original thumbnails for your own videos when possible.' } },
        ]
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            {children}

            <SEOContentSection>
                <section className="space-y-4">
                    <SEOHeading level={2} id="about-thumbnail-downloader">Free YouTube Thumbnail Downloader: HD Quality, No Watermark</SEOHeading>
                    <SEOParagraph>
                        Our <strong>free YouTube thumbnail downloader</strong> lets you download the thumbnail image from any YouTube video in the highest available resolution — up to Full HD (1920×1080) — with no watermark, no signup, and no software to install. Simply paste the YouTube video URL, choose your preferred resolution, and download the thumbnail image instantly.
                    </SEOParagraph>
                    <SEOParagraph>
                        Content creators use YouTube thumbnails for inspiration and competitive analysis. Marketers analyze competitor thumbnails to understand engagement strategies. Bloggers and educators embed video thumbnails in articles and presentations. Designers study thumbnail composition, typography, and color for their own projects. Whatever your use case, our tool provides quick, reliable access to any public YouTube video&apos;s thumbnail.
                    </SEOParagraph>
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="how-to-download">How to Download YouTube Thumbnails</SEOHeading>
                    <SEONumberedList items={[
                        'Go to YouTube (youtube.com) and find the video whose thumbnail you want to download.',
                        'Copy the video URL from the address bar. It will look like: https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID',
                        'Paste the copied URL into the input field on this page.',
                        'The tool automatically fetches all available thumbnail resolutions for that video.',
                        'Choose your preferred quality — Maximum Resolution, HD (720p), Standard, or Medium.',
                        'Click the download button to save the thumbnail image directly to your device.',
                    ]} />
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="thumbnail-resolutions">YouTube Thumbnail Resolution Options</SEOHeading>
                    <SEOTable
                        caption="Available YouTube Thumbnail Quality Levels"
                        headers={['Quality Name', 'File Name on YouTube', 'Resolution (pixels)', 'Best For']}
                        rows={[
                            ['Maximum Resolution', 'maxresdefault.jpg', '1920 × 1080', 'Full HD displays, presentations, print'],
                            ['Standard HD', 'sddefault.jpg', '640 × 480', 'Blogs, articles, standard web use'],
                            ['High Quality', 'hqdefault.jpg', '480 × 360', 'Social media posts, quick reference'],
                            ['Medium Quality', 'mqdefault.jpg', '320 × 180', 'Small previews, thumbnails in lists'],
                            ['Default', 'default.jpg', '120 × 90', 'Tiny icons, favicon-sized references'],
                        ]}
                    />
                    <SEOCallout type="info">
                        <strong>Note:</strong> Not all YouTube videos have the maxresdefault (1920×1080) thumbnail available. Older videos or videos uploaded at lower resolutions may only have thumbnails up to 640×480. Our tool automatically detects and shows you the highest resolution available for each video.
                    </SEOCallout>
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="create-thumbnails">YouTube Thumbnail Best Practices for Creators</SEOHeading>
                    <SEOParagraph>
                        If you are a YouTube content creator, creating compelling thumbnails is one of the most important skills for growing your channel. Thumbnails are the first thing viewers see and directly impact your click-through rate (CTR). Here are proven best practices:
                    </SEOParagraph>
                    <SEOTable
                        caption="YouTube Thumbnail Specifications and Best Practices"
                        headers={['Element', 'Recommendation', 'Why It Matters']}
                        rows={[
                            ['Dimensions', '1280 × 720 pixels (16:9)', 'YouTube official recommendation; displays well on all devices'],
                            ['File size', 'Under 2 MB', 'YouTube upload limit; compress to WebP or optimized JPEG'],
                            ['File format', 'JPG, PNG, GIF, BMP', 'YouTube accepts these four formats'],
                            ['Minimum width', '640 pixels', 'YouTube requires at least 640px wide'],
                            ['Text size', 'Large, bold, 3-6 words max', 'Must be readable on mobile screens (small thumbnails)'],
                            ['Face / Emotion', 'Show expressive faces close-up', 'Faces with strong emotion get 38% higher CTR'],
                            ['Colors', 'High contrast, vibrant colors', 'Bright colors stand out against YouTube\'s white background'],
                            ['Branding', 'Consistent style across videos', 'Builds channel recognition and subscriber loyalty'],
                            ['Rule of thirds', 'Place key elements at intersections', 'Creates visually balanced, professional composition'],
                            ['Background', 'Simple, uncluttered backgrounds', 'Ensures the subject stands out clearly'],
                        ]}
                    />
                    <SEOBulletList items={[
                        'Use contrasting colors — yellow/black and red/white combinations catch attention fastest in search results and recommended feeds.',
                        'Make text large enough to read on mobile — most YouTube browsing happens on phones where thumbnails are very small.',
                        'Show a human face with an expressive emotion — surprise, excitement, and curiosity drive the highest click-through rates.',
                        'Keep text to 3-6 words maximum — the thumbnail should communicate the video\'s value proposition at a glance.',
                        'Avoid clickbait that does not deliver — misleading thumbnails lead to early exits, which hurt your channel\'s algorithm ranking.',
                        'Test different thumbnail styles — YouTube Studio lets you see CTR for each video; A/B test designs to find what works for your audience.',
                        'Study successful creators in your niche — analyze the thumbnail patterns of top-performing videos for inspiration (use our tool to download and study them).',
                    ]} />
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="supported-urls">Supported YouTube URL Formats</SEOHeading>
                    <SEOParagraph>Our downloader accepts all common YouTube URL formats:</SEOParagraph>
                    <SEOBulletList items={[
                        'Standard URL: https://www.youtube.com/watch?v=VIDEO_ID',
                        'Short URL: https://youtu.be/VIDEO_ID',
                        'Embedded URL: https://www.youtube.com/embed/VIDEO_ID',
                        'Mobile URL: https://m.youtube.com/watch?v=VIDEO_ID',
                        'URLs with additional parameters (timestamps, playlists, etc.) — we extract the video ID automatically.',
                    ]} />
                </section>

                <section className="space-y-4">
                    <SEOHeading level={2} id="thumbnail-faq">Frequently Asked Questions</SEOHeading>
                    <SEOFAQ items={[
                        { question: 'How do I download a YouTube video thumbnail?', answer: 'Simply copy the YouTube video URL from your browser address bar, paste it into our tool\'s input field, and click the download button. The tool automatically extracts the video ID and fetches all available thumbnail resolutions. Choose your preferred quality and save the image to your device. The entire process takes under 5 seconds.' },
                        { question: 'What is the best resolution for YouTube thumbnails?', answer: 'YouTube recommends 1280×720 pixels (16:9 aspect ratio) with a minimum width of 640 pixels and a maximum file size of 2 MB. For downloading existing thumbnails, the maxresdefault version (1920×1080) provides the highest quality available, though not all videos have this resolution.' },
                        { question: 'Can I download thumbnails from private or unlisted YouTube videos?', answer: 'Our tool works with publicly accessible YouTube videos. Private videos are not accessible from outside YouTube, so their thumbnails cannot be downloaded. Unlisted videos may work if you have the direct URL, as their thumbnails are technically publicly accessible through the YouTube image CDN.' },
                        { question: 'Are YouTube thumbnails copyrighted?', answer: 'Yes, YouTube thumbnails are typically copyrighted by the video creator. Downloading them for personal reference, competitive analysis, educational use, or review/commentary (fair use) is generally acceptable. Using them commercially, passing them off as your own work, or redistributing them without permission may violate copyright. Always create original thumbnails for your own content.' },
                        { question: 'Why is maxresdefault not available for some videos?', answer: 'The maxresdefault (1920×1080) thumbnail is only generated by YouTube when the video was uploaded in HD quality (720p or higher) AND the creator uploaded a custom thumbnail. Older videos, videos uploaded in SD quality, or videos without custom thumbnails may only have lower-resolution options (480p or 360p). Our tool falls back to the highest available resolution automatically.' },
                        { question: 'What is the ideal YouTube thumbnail size?', answer: 'YouTube officially recommends 1280×720 pixels with a 16:9 aspect ratio. The minimum width is 640 pixels. The file should be under 2 MB and in JPG, PNG, GIF, or BMP format. For best results on all devices — desktop, tablet, and mobile — design at 1280×720 with large, readable text and high-contrast colors.' },
                    ]} />
                </section>

                <SEOInternalLinks links={[
                    { href: '/image-resizer', title: 'Image Resizer', description: 'Resize images for any platform' },
                    { href: '/qr-code-generator', title: 'QR Code Generator', description: 'Create QR codes free' },
                    { href: '/word-counter', title: 'Word Counter', description: 'Count words & characters' },
                    { href: '/password-generator', title: 'Password Generator', description: 'Strong passwords' },
                ]} />
            </SEOContentSection>
        </>
    );
}
