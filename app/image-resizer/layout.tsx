import { Metadata } from 'next';
import {
  SEOContentSection, SEOHeading, SEOParagraph, SEOTable, SEOBulletList,
  SEONumberedList, SEOFAQ, SEOCallout, SEOInternalLinks
} from '@/components/SEOContent';

export const metadata: Metadata = {
  title: 'Image Resizer Online Free - Resize Photos & Pictures | No Upload, 100% Private',
  description:
    'Free online image resizer — resize photos & pictures instantly in your browser. No upload needed, 100% private. Supports JPG, PNG, WebP, GIF. Social media sizes, custom dimensions.',
  keywords: [
    'image resizer', 'image resizer online', 'resize image online',
    'free image resizer', 'photo resizer', 'photo resizer online',
    'picture resizer', 'picture resizer online',
    'resize photo', 'resize image', 'resize picture',
    'image resize tool', 'image size changer', 'image dimensions changer',
    'reduce image size', 'compress image', 'image compressor',
    'resize image for Instagram', 'resize image for Facebook',
    'resize image for Twitter', 'resize image for LinkedIn',
    'resize image for YouTube thumbnail', 'resize image for Pinterest',
    'resize image for email', 'resize image for website',
    'resize image for passport photo', 'passport photo resizer',
    'resize photo for ID card', 'resize photo to 2x2',
    'crop and resize image', 'bulk image resizer',
    'resize JPG', 'resize PNG', 'resize WebP', 'resize GIF',
    'change image dimensions', 'scale image',
    'resize image to specific size', 'resize image in pixels',
    'resize image in KB', 'reduce file size of image',
    'image resizer without quality loss', 'image resizer no watermark',
    'image resizer no upload', 'private image resizer',
    'client-side image resizer', 'browser image resizer',
    'social media image sizes', 'image size guide 2025',
    'resize image for print', 'resize image DPI',
    'resize image to 1920x1080', 'resize image to 1080x1080',
    'resize image 4x6', 'resize image 5x7', 'resize image 8x10',
  ],
  alternates: { canonical: 'https://worksyhub.online/image-resizer' },
  openGraph: {
    title: 'Free Online Image Resizer — Resize Photos Privately',
    description: 'Resize photos in browser. No upload, 100% private. JPG, PNG, WebP. Social media sizes included.',
    url: 'https://worksyhub.online/image-resizer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Resizer - No Upload, 100% Private',
    description: 'Resize photos instantly without uploading. Supports JPG, PNG, WebP, GIF. All sizes included!',
  },
};

export default function ImageResizerLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: 'Free Online Image Resizer',
    description: 'Resize images and photos instantly in your browser without uploading. 100% private, supports JPG, PNG, WebP, GIF formats.',
    applicationCategory: 'UtilityApplication', operatingSystem: 'Any',
    url: 'https://worksyhub.online/image-resizer',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: ['Client-side processing', 'No upload required', 'JPG/PNG/WebP/GIF support', 'Custom dimensions']
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://worksyhub.online' },
      { '@type': 'ListItem', position: 2, name: 'Image Resizer', item: 'https://worksyhub.online/image-resizer' },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Is this image resizer private?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, 100% private! Our image resizer processes everything directly in your browser using client-side JavaScript. Your images are NEVER uploaded to any server, stored, or transmitted over the internet. You can even disconnect from the internet after the page loads and it will still work.' } },
      { '@type': 'Question', name: 'What image formats are supported?', acceptedAnswer: { '@type': 'Answer', text: 'Our tool supports all major web image formats: JPEG/JPG, PNG, WebP, GIF, BMP, and SVG. You can resize any of these formats and download the result in your preferred format.' } },
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}

      <SEOContentSection>
        <section className="space-y-4">
          <SEOHeading level={2} id="about-image-resizer">Free Online Image Resizer — 100% Private, No Upload Required</SEOHeading>
          <SEOParagraph>
            Our <strong>free online image resizer</strong> lets you resize any photo or image instantly, directly in your web browser. Unlike most online image resizers that upload your files to their servers (raising privacy and security concerns), our tool processes everything <strong>client-side using JavaScript</strong> — your images never leave your device. This makes it the safest way to resize sensitive photos, personal images, business documents, and confidential graphics.
          </SEOParagraph>
          <SEOParagraph>
            Whether you need to resize an image for Instagram, create the perfect Facebook cover photo, prepare a YouTube thumbnail, reduce an image file size for email, or format a passport photo to exact specifications, our tool handles it all. Simply drag and drop your image, set your desired dimensions, and download the resized result. Supports JPEG, PNG, WebP, GIF, and more.
          </SEOParagraph>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="social-media-sizes">Social Media Image Size Guide (2025)</SEOHeading>
          <SEOParagraph>
            Every social media platform has specific recommended image dimensions. Using the wrong size results in cropping, stretching, or blurry images. Here is the definitive guide to every platform&apos;s image requirements:
          </SEOParagraph>
          <SEOTable
            caption="Social Media Image Sizes — Complete 2025 Reference"
            headers={['Platform', 'Image Type', 'Recommended Size (px)', 'Aspect Ratio']}
            rows={[
              ['Instagram', 'Square Post', '1080 × 1080', '1:1'],
              ['Instagram', 'Portrait Post', '1080 × 1350', '4:5'],
              ['Instagram', 'Landscape Post', '1080 × 566', '1.91:1'],
              ['Instagram', 'Story / Reel', '1080 × 1920', '9:16'],
              ['Instagram', 'Profile Picture', '320 × 320', '1:1'],
              ['Facebook', 'Post Image', '1200 × 630', '1.91:1'],
              ['Facebook', 'Cover Photo', '820 × 312', '2.63:1'],
              ['Facebook', 'Profile Picture', '180 × 180', '1:1'],
              ['Facebook', 'Event Cover', '1200 × 628', '1.91:1'],
              ['Twitter / X', 'In-Stream Image', '1600 × 900', '16:9'],
              ['Twitter / X', 'Header Photo', '1500 × 500', '3:1'],
              ['Twitter / X', 'Profile Picture', '400 × 400', '1:1'],
              ['LinkedIn', 'Post Image', '1200 × 627', '1.91:1'],
              ['LinkedIn', 'Cover Photo', '1128 × 191', '5.91:1'],
              ['LinkedIn', 'Profile Picture', '400 × 400', '1:1'],
              ['YouTube', 'Thumbnail', '1280 × 720', '16:9'],
              ['YouTube', 'Channel Art', '2560 × 1440', '16:9'],
              ['YouTube', 'Profile Picture', '800 × 800', '1:1'],
              ['Pinterest', 'Standard Pin', '1000 × 1500', '2:3'],
              ['Pinterest', 'Profile Picture', '165 × 165', '1:1'],
              ['TikTok', 'Video Thumbnail', '1080 × 1920', '9:16'],
              ['TikTok', 'Profile Picture', '200 × 200', '1:1'],
              ['Threads', 'Post Image', '1080 × 1080', '1:1'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="print-sizes">Standard Print & Document Image Sizes</SEOHeading>
          <SEOTable
            caption="Common Print Sizes at 300 DPI (Print Quality)"
            headers={['Print Size', 'Pixel Dimensions (300 DPI)', 'Common Use']}
            rows={[
              ['Wallet (2" × 3")', '600 × 900 px', 'Wallet photos, small prints'],
              ['4" × 6"', '1200 × 1800 px', 'Standard photo print'],
              ['5" × 7"', '1500 × 2100 px', 'Greeting cards, frames'],
              ['8" × 10"', '2400 × 3000 px', 'Portrait prints, frames'],
              ['8.5" × 11" (Letter)', '2550 × 3300 px', 'Documents, flyers, resumes'],
              ['11" × 14"', '3300 × 4200 px', 'Large photo prints'],
              ['11" × 17" (Tabloid)', '3300 × 5100 px', 'Posters, large documents'],
              ['16" × 20"', '4800 × 6000 px', 'Gallery prints, wall art'],
              ['24" × 36"', '7200 × 10800 px', 'Large posters, banners'],
              ['Passport Photo (2" × 2")', '600 × 600 px', 'US passport, visa applications'],
              ['ID Photo (35mm × 45mm)', '413 × 531 px', 'European ID, visa photos'],
              ['A4 (8.27" × 11.69")', '2480 × 3508 px', 'International standard documents'],
              ['A3 (11.69" × 16.54")', '3508 × 4961 px', 'Large documents, charts'],
            ]}
          />
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="image-formats">Image Format Comparison: When to Use Each</SEOHeading>
          <SEOTable
            caption="Image Format Guide"
            headers={['Format', 'Best For', 'Transparency', 'Animation', 'Typical File Size', 'Quality']}
            rows={[
              ['JPEG / JPG', 'Photos, complex images', 'No', 'No', 'Small-Medium', 'Lossy (adjustable)'],
              ['PNG', 'Graphics, logos, screenshots', 'Yes', 'No', 'Medium-Large', 'Lossless'],
              ['WebP', 'Web images (Google format)', 'Yes', 'Yes', 'Small', 'Both lossy & lossless'],
              ['GIF', 'Simple animations, memes', 'Yes (1-bit)', 'Yes', 'Varies', '256 colors max'],
              ['SVG', 'Icons, logos, vector graphics', 'Yes', 'Yes', 'Very Small', 'Infinite (vector)'],
              ['AVIF', 'Modern web images', 'Yes', 'Yes', 'Very Small', 'Superior compression'],
              ['HEIC/HEIF', 'iPhone photos', 'No', 'No', 'Small', 'High quality'],
              ['BMP', 'Legacy Windows images', 'No', 'No', 'Very Large', 'Lossless (uncompressed)'],
              ['TIFF', 'Print, professional photography', 'Yes', 'No', 'Very Large', 'Lossless'],
            ]}
          />
          <SEOCallout type="tip">
            <strong>Best practice for websites:</strong> Use WebP format for the best balance of quality and file size. WebP images are 25-34% smaller than JPEG at equivalent quality and are supported by all modern browsers. Use PNG only when you need transparency for logos or icons. Use SVG for icons and simple graphics.
          </SEOCallout>
        </section>

        <section className="space-y-4">
          <SEOHeading level={2} id="image-resizer-faq">Frequently Asked Questions</SEOHeading>
          <SEOFAQ items={[
            { question: 'Are my images uploaded to any server?', answer: 'No! Our image resizer processes everything directly in your browser using client-side JavaScript. Your images never leave your device. We do not upload, store, track, or have any access to your photos. You can verify this by checking your browser\'s network tab — no image data is transmitted. This makes our tool ideal for sensitive photos and confidential images.' },
            { question: 'How do I resize an image without losing quality?', answer: 'When making images smaller (downscaling), quality loss is minimal with good algorithms. When making images larger (upscaling), some quality loss is inevitable. To minimize quality loss: (1) Start with the highest resolution original, (2) Use PNG format for graphics and WebP for photos, (3) Resize proportionally (maintain aspect ratio), (4) Avoid resizing more than 2x larger than the original.' },
            { question: 'What is the difference between resizing and compressing?', answer: 'Resizing changes the pixel dimensions (e.g., from 4000×3000 to 1920×1080). Compressing reduces the file size without changing dimensions by applying lossy compression (reducing quality slightly to save space). Often you want both — resize to the needed dimensions AND compress for optimal file size.' },
            { question: 'What image size should I use for Instagram?', answer: 'For Instagram feed posts, use 1080×1080 (square), 1080×1350 (portrait, recommended for maximum visibility), or 1080×566 (landscape). For Instagram Stories and Reels, use 1080×1920. For profile pictures, 320×320 minimum. Portrait (4:5) format gets the most screen space in the feed, making it ideal for engagement.' },
            { question: 'How do I make a passport photo at home?', answer: 'For a US passport photo: resize to 2"×2" (600×600 pixels at 300 DPI). The photo must have a white background, the face should occupy 50-69% of the frame, and the image must be recent (within 6 months). European passport/visa photos are typically 35mm×45mm (413×531 pixels at 300 DPI). Use our resizer to get the exact dimensions needed.' },
            { question: 'What is DPI and why does it matter for printing?', answer: 'DPI (Dots Per Inch) measures print resolution. 72 DPI is standard for screens/web. 300 DPI is the minimum for high-quality prints. Higher DPI means sharper printed images. To calculate the pixel dimensions needed for a specific print size: multiply the print dimension in inches by the DPI. For example, an 8"×10" print at 300 DPI needs 2400×3000 pixels.' },
          ]} />
        </section>

        <SEOInternalLinks links={[
          { href: '/qr-code-generator', title: 'QR Code Generator', description: 'Create QR codes' },
          { href: '/youtube-thumbnail-downloader', title: 'YouTube Thumbnail Downloader', description: 'Download thumbnails' },
          { href: '/password-generator', title: 'Password Generator', description: 'Create secure passwords' },
          { href: '/word-counter', title: 'Word Counter', description: 'Count words & characters' },
          { href: '/unit-converter', title: 'Unit Converter', description: 'Convert measurements' },
        ]} />
      </SEOContentSection>
    </>
  );
}