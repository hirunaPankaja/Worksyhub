// src/app/image-cropper/page.tsx
'use client';

import { useState, useRef } from 'react';
import {
  Crop,
  BookOpen,
  Download,
  RefreshCw,
  Image as ImageIcon,
  Shield,
} from 'lucide-react';
import ReactCrop, {
  type Crop as T_Crop,
  type PixelCrop,
  type PercentCrop,
  centerCrop,
  makeAspectCrop,
  convertToPixelCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// Utility Function for cropping
function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = (rotate * Math.PI) / 180;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();
  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.rotate(rotateRads);
  ctx.scale(scale, scale);
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );
  ctx.restore();
}

export default function ImageCropperPage() {
  const [cropImgSrc, setCropImgSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<T_Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [croppedImgUrl, setCroppedImgUrl] = useState<string | null>(null);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const onCropFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCrop(undefined); // Clear old crop
      setCompletedCrop(undefined);
      setCroppedImgUrl(null);
      setRotation(0);
      setCropImgSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect || width / height, // Use image aspect ratio if 'Free'
        width,
        height
      ),
      width,
      height
    );
    setCrop(newCrop);
    
    // Convert percent crop to pixel crop for completedCrop
    if (imgRef.current) {
      const pixelCrop = convertToPixelCrop(newCrop, imgRef.current.width, imgRef.current.height);
      setCompletedCrop(pixelCrop);
    }
  }

  const showCroppedImage = () => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      alert('Error: Crop data or image not ready. Please try again.');
      return;
    }
    canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, 1, rotation);

    const dataUrl = previewCanvasRef.current.toDataURL('image/png');
    setCroppedImgUrl(dataUrl);
  };

  function onAspectChange(newAspect: number | undefined) {
    setAspect(newAspect);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      const newCrop = centerCrop(
        makeAspectCrop(
          { unit: '%', width: 90 },
          newAspect || width / height,
          width,
          height
        ),
        width,
        height
      );
      setCrop(newCrop);
      
      // Convert percent crop to pixel crop
      const pixelCrop = convertToPixelCrop(newCrop, width, height);
      setCompletedCrop(pixelCrop);
    }
  }

  // Handle crop completion - convert percent crop to pixel crop
  const handleCropComplete = (crop: PixelCrop, percentageCrop: PercentCrop) => {
    if (imgRef.current) {
      const pixelCrop = convertToPixelCrop(percentageCrop, imgRef.current.width, imgRef.current.height);
      setCompletedCrop(pixelCrop);
    }
  };

  const tutorials = {
    title: 'How to Crop an Image',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Upload Image:** Click "Choose File" to select your image.',
          '**2. Adjust Crop:** Drag the box to move it. Drag the **sides or corners** to resize it.',
          '**3. Set Aspect Ratio:** Click "1:1" (square), "4:3", "16:9", or "Free" to change the shape of the crop box.',
          '**4. Rotate:** Use the "Rotation" slider to straighten or rotate your image.',
          '**5. Crop:** Click the "Crop Image" button.',
          '**6. Download:** A "Download Cropped Image" button will appear.',
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hidden Canvas for Cropping */}
      <canvas ref={previewCanvasRef} className="hidden" />
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Image Cropper & Rotator
        </h1>
        <p className="text-lg text-muted-foreground">
          Crop, rotate, and set aspect ratios for your images. 100% private.
        </p>
      </div>

      {/* --- Image Cropper Tool --- */}
      <div className="p-6 rounded-xl border bg-card space-y-6">
        <h2 className="text-2xl font-bold text-card-foreground">
          Image Cropper
        </h2>
        {!cropImgSrc ? (
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Image to Crop
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onCropFileChange}
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>
        ) : (
          <>
            <div className="w-full bg-muted rounded-lg flex justify-center p-4">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={handleCropComplete}
                aspect={aspect}
              >
                <img
                  ref={imgRef}
                  src={cropImgSrc}
                  onLoad={onImageLoad}
                  alt="Crop preview"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
              </ReactCrop>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Rotation: {rotation}°</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Aspect Ratio</label>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => onAspectChange(1/1)} className={`px-3 py-1 rounded-md text-sm ${aspect === 1/1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>1:1 (Square)</button>
                  <button onClick={() => onAspectChange(4/3)} className={`px-3 py-1 rounded-md text-sm ${aspect === 4/3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>4:3 (Standard)</button>
                  <button onClick={() => onAspectChange(16/9)} className={`px-3 py-1 rounded-md text-sm ${aspect === 16/9 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>16:9 (Widescreen)</button>
                  <button onClick={() => onAspectChange(undefined)} className={`px-3 py-1 rounded-md text-sm ${aspect === undefined ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>Free</button>
                </div>
              </div>
            </div>

            <button
              onClick={showCroppedImage}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
            >
              Crop Image
            </button>
            {croppedImgUrl && (
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-semibold">Cropped Image:</h3>
                <img
                  src={croppedImgUrl}
                  alt="Cropped"
                  className="max-w-full h-auto rounded-lg border"
                />
                <a
                  href={croppedImgUrl}
                  download="cropped-image.png"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                >
                  <Download className="h-4 w-4" />
                  Download Cropped Image
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
            {tutorials.sections.map((section: { title: string, content: string[] }, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                  {section.title}
                </h3>
                <div className="prose prose-lg max-w-none text-foreground">
                  {section.content.map((line: string, lineIndex: number) => (
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

        {/* --- What is Cropping? --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Crop className="h-6 w-6 text-primary" />
            What is Image Cropping?
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p>Image cropping is the removal of unwanted outer areas from an image. It's a fundamental tool in photo editing used to improve composition, frame subjects, and change the aspect ratio.</p>
            <ul className="list-disc pl-5">
              <li><strong>Improve Composition:</strong> By removing distracting background elements, you can draw the viewer's eye to your main subject.</li>
              <li><strong>Change Aspect Ratio:</strong> You can change a rectangular photo into a square (1:1) for an Instagram post, or a wide (16:9) format for a website banner.</li>
              <li>**Zoom and Reframe:** Cropping allows you to "zoom in" on a part of your photo after it has been taken.</li>
            </ul>
          </div>
        </div>
        
        {/* --- Aspect Ratios Table --- */}
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Common Aspect Ratios Explained
          </h2>
          <p className="text-muted-foreground mb-4">An aspect ratio describes the proportional relationship between an image's width and height.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border border-border">Ratio</th>
                  <th className="p-3 border border-border">Common Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-semibold">1:1 (Square)</td>
                  <td className="p-3 border border-border">Instagram posts, profile pictures, logos.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">4:3 (Standard)</td>
                  <td className="p-3 border border-border">Traditional TV, older computer monitors, many digital cameras.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-semibold">16:9 (Widescreen)</td>
                  <td className="p-3 border border-border">Modern TVs, computer monitors, YouTube videos, website banners.</td>
                </tr>
                 <tr>
                  <td className="p-3 border border-border font-semibold">Free</td>
                  <td className="p-3 border border-border">No restrictions. Allows you to create a crop box of any size and shape.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">Need More Tools?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/image-resizer" className="p-3 rounded-lg bg-background hover:bg-muted transition-colors">
            Image Resizer
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