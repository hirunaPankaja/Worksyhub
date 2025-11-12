// src/app/image-resizer/page.tsx
'use client';

import { useState } from 'react';
import {
  FileImage,
  BookOpen,
  Download,
  Lock,
  Unlock,
  Shield,
  Zap,
} from 'lucide-react';

export default function ImageResizerPage() {
  const [resizeFile, setResizeFile] = useState<File | null>(null);
  const [resizePreviewUrl, setResizePreviewUrl] = useState<string | null>(null);
  const [originalAspectRatio, setOriginalAspectRatio] = useState(1);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [resizeWidth, setResizeWidth] = useState(800);
  const [resizeHeight, setResizeHeight] = useState(600);
  const [resizedImgUrl, setResizedImgUrl] = useState<string | null>(null);

  const handleResizeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResizeFile(file);
      setResizedImgUrl(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const ratio = img.width / img.height;
          setOriginalAspectRatio(ratio);
          setResizeWidth(img.width > 800 ? 800 : img.width);
          setResizeHeight(Math.round(img.width > 800 ? 800 / ratio : img.height));
        };
        const url = event.target?.result as string;
        img.src = url;
        setResizePreviewUrl(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = Number(e.target.value);
    setResizeWidth(width);
    if (lockAspectRatio) {
      setResizeHeight(Math.round(width / originalAspectRatio));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = Number(e.target.value);
    setResizeHeight(height);
    if (lockAspectRatio) {
      setResizeWidth(Math.round(height * originalAspectRatio));
    }
  };

  const handleResize = () => {
    if (!resizeFile || !resizePreviewUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = resizeWidth;
      canvas.height = resizeHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, resizeWidth, resizeHeight);
      canvas.toBlob((blob) => {
        if (blob) {
          setResizedImgUrl(URL.createObjectURL(blob));
        }
      }, resizeFile.type);
    };
    img.src = resizePreviewUrl;
  };

  const tutorial = {
    title: 'How to Resize an Image',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Upload Image:** Click "Choose File" and select an image (PNG, JPG, etc.). A preview of your original image will appear.',
          '**2. Set Dimensions:** Enter the desired "Width" and "Height" in pixels.',
          '**3. Lock Aspect Ratio:** Check the "Lock Aspect Ratio" box (default) to prevent your image from being stretched. Changing one value will automatically update the other.',
          '**4. Resize:** Click the "Resize Image" button.',
          '**5. Download:** A preview of the resized image will appear with a "Download" button.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Online Image Resizer
        </h1>
        <p className="text-lg text-muted-foreground">
          Resize, compress, and change image dimensions 100% in your browser.
        </p>
      </div>

      {/* --- Image Resizer Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Image Resizer
        </h2>
        <div>
          <label className="block text-sm font-medium mb-2">
            1. Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleResizeFileChange}
            className="w-full p-3 rounded-lg border bg-background"
          />
        </div>

        {resizePreviewUrl && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Original Preview</h3>
                <img
                  src={resizePreviewUrl}
                  alt="Original"
                  className="max-w-full h-auto rounded-lg border bg-muted"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium">
                  2. Set Dimensions (px)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium mb-2">Width</label>
                    <input
                      type="number"
                      value={resizeWidth}
                      onChange={handleWidthChange}
                      className="w-full p-3 rounded-lg border bg-background"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium mb-2">Height</label>
                    <input
                      type="number"
                      value={resizeHeight}
                      onChange={handleHeightChange}
                      className="w-full p-3 rounded-lg border bg-background"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 p-3 rounded-lg bg-background border cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lockAspectRatio}
                    onChange={(e) => setLockAspectRatio(e.target.checked)}
                    className="w-4 h-4 text-primary"
                  />
                  {lockAspectRatio ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Unlock className="h-4 w-4" />
                  )}
                  Lock Aspect Ratio
                </label>
                <button
                  onClick={handleResize}
                  disabled={!resizeFile}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
                >
                  3. Resize Image
                </button>
              </div>
            </div>

            {resizedImgUrl && (
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-semibold">Resized Image:</h3>
                <img
                  src={resizedImgUrl}
                  alt="Resized"
                  className="max-w-full h-auto rounded-lg border bg-muted"
                />
                <a
                  href={resizedImgUrl}
                  download={`resized-${resizeWidth}x${resizeHeight}-${resizeFile?.name || 'image.png'}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                >
                  <Download className="h-4 w-4" />
                  Download Resized Image
                </a>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- Rich Content Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        
        {/* --- How to Use (Tutorial) --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Use This Tool
          </h2>
          <div className="space-y-6">
            {tutorial.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  {section.title}
                </h3>
                <div className="prose prose-lg max-w-none text-foreground">
                  {section.content.map((line, lineIndex) => (
                    <div key={lineIndex} className="mb-3">
                      {line.startsWith('**') ? (
                        <strong className="text-foreground text-lg">{line.replace(/\*\*/g, '')}</strong>
                      ) : line.trim().startsWith('-') ? (
                        <p className="text-foreground leading-relaxed ml-4">{line}</p>
                      ) : line === '' ? (
                        <div className="my-4 border-t border-border"></div>
                      ) : (
                        <p className="text-foreground leading-relaxed">{line}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Why Resize? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Why Resize Images?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Resizing an image is one of the most common tasks for web developers, social media managers, and bloggers. Large, high-resolution images can slow your website down to a crawl.</p>
            <ul className="list-disc pl-5">
              <li>**Web Performance:** Smaller images load faster, improving your website's speed and SEO ranking.</li>
              <li>**Social Media:** Platforms like Instagram (1080x1080) or Twitter (1600x900) have optimal sizes. Resizing ensures your image isn't cropped or compressed badly.</li>
              <li>**Email:** Large images can get emails flagged as spam or fail to send. Resizing makes them small and email-friendly.</li>
            </ul>
          </div>
        </div>
        
        {/* --- Privacy --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Your Privacy is Guaranteed
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>This tool is 100% client-side. That means your images are **never uploaded to our server**. All resizing happens directly in your web browser on your own computer. Your files stay private and secure.</p>
          </div>
        </div>

      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/image-cropper" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Image Cropper
          </a>
          <a href="/image-to-base64" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Image to Base64
          </a>
          <a href="/pdf-merger" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            PDF Merger
          </a>
          <a href="/" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            All Tools
          </a>
        </div>
      </div>
    </div>
  );
}