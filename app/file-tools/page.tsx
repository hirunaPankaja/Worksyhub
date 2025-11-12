// src/app/file-tools/page.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  FileImage,
  Crop,
  Code,
  FileText,
  BookOpen,
  Upload,
  Download,
  Clipboard,
  Check,
  RefreshCw,
  Trash2,
  Lock,
  Unlock,
  X,
} from 'lucide-react';
// NEW IMPORTS
import ReactCrop, {
  type Crop as T_Crop,
  type PixelCrop, // Import PixelCrop
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'; // <-- Import the new CSS
import { PDFDocument } from 'pdf-lib';

// --- NEW Utility Function for react-image-crop ---
function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: T_Crop, // Use T_Crop which is { x, y, width, height }
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

// --- Component ---

export default function FileToolsPage() {
  const [activeTab, setActiveTab] = useState('resize');
  const [activeTutorial, setActiveTutorial] = useState('resize');

  // --- State for Tools ---
  const [resizeFile, setResizeFile] = useState<File | null>(null);
  const [resizePreviewUrl, setResizePreviewUrl] = useState<string | null>(null);
  const [originalAspectRatio, setOriginalAspectRatio] = useState(1);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [resizeWidth, setResizeWidth] = useState(800);
  const [resizeHeight, setResizeHeight] = useState(600);
  const [resizedImgUrl, setResizedImgUrl] = useState<string | null>(null);

  // --- NEW Cropper State ---
  const [cropImgSrc, setCropImgSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<T_Crop>();
  const [completedCrop, setCompletedCrop] = useState<T_Crop>(); // Use T_Crop for percentage-based crops
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(4 / 3);
  const [croppedImgUrl, setCroppedImgUrl] = useState<string | null>(null);
  // Refs for the new cropper
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  // --- End NEW Cropper State ---

  const [base64File, setBase64File] = useState<File | null>(null);
  const [base64Output, setBase64Output] = useState('');
  const [copiedBase64, setCopiedBase64] = useState(false);

  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState(false);

  // --- Tabs Definition ---
  const tabs = [
    { id: 'resize', label: 'Image Resizer', icon: FileImage },
    { id: 'crop', label: 'Image Cropper', icon: Crop },
    { id: 'base64', label: 'Image to Base64', icon: Code },
    { id: 'pdfmerge', label: 'PDF Merger', icon: FileText },
  ];

  // --- Effects ---
  useEffect(() => {
    setActiveTutorial(activeTab);
  }, [activeTab]);

  // --- Tool Functions ---

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Image Resizer (Unchanged) ---
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
        setResizePreviewUrl(url); // Set original image preview
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

  // --- Image Cropper (NEW LOGIC) ---
  const onCropFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCrop(undefined); // Clear old crop
      setCompletedCrop(undefined);
      setCroppedImgUrl(null);
      setRotation(0);
      setCropImgSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Set a default crop area when the image loads
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect || 1, // Use aspect or 1:1 as fallback
        width,
        height
      ),
      width,
      height
    );
    setCrop(newCrop);
    setCompletedCrop(newCrop);
  }

  // This is the function for the "Crop Image" button. It's working now.
  const showCroppedImage = () => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      alert('Error: Crop data or image not ready. Please try again.');
      return;
    }
    // Draw the crop onto the hidden canvas
    canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, 1, rotation);

    // Get the data URL from the canvas
    const dataUrl = previewCanvasRef.current.toDataURL('image/png');
    setCroppedImgUrl(dataUrl);
  };
  
  // Update aspect ratio helper
  function onAspectChange(newAspect: number | undefined) {
    setAspect(newAspect);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      const newCrop = centerCrop(
        makeAspectCrop(
          { unit: '%', width: 90 },
          newAspect || 1,
          width,
          height
        ),
        width,
        height
      );
      setCrop(newCrop);
      setCompletedCrop(newCrop);
    }
  }

  // --- Image to Base64 (Unchanged) ---
  const handleBase64FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBase64File(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setBase64Output(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- PDF Merger (NEW LOGIC) ---
  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Add new files to the existing list
      setPdfFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files!)]);
      setMergedPdfUrl(null);
      
      // Clear the file input so the user can add the same file again if needed
      e.target.value = ""; 
    }
  };

  const removePdfFile = (index: number) => {
    setPdfFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleMergePDFs = async () => {
    if (pdfFiles.length < 2) {
      alert('Please add at least 2 PDF files to merge.');
      return;
    }
    setIsMerging(true);
    setMergedPdfUrl(null);

    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of pdfFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert(`An error occurred while merging PDFs: ${error}`);
    }
    setIsMerging(false);
  };

  // --- Tutorials Content (Updated) ---
  const tutorials = {
    resize: {
      title: 'Image Resizer Guide',
      sections: [
        {
          title: 'How to Resize an Image',
          content: [
            'This tool resizes your image to specific dimensions. No data leaves your device.',
            '**1. Upload Image:** Click "Choose File" and select an image (PNG, JPG, etc.). A preview of your original image will appear.',
            '**2. Set Dimensions:** Enter the desired "Width" and "Height" in pixels.',
            '**3. Lock Aspect Ratio:** Check the "Lock Aspect Ratio" box (default) to prevent your image from being stretched. Changing one value will automatically update the other.',
            '**4. Resize:** Click the "Resize Image" button.',
            '**5. Download:** A preview of the resized image will appear with a "Download" button.',
          ],
        },
      ],
    },
    crop: {
      title: 'Image Cropper Guide',
      sections: [
        {
          title: 'How to Crop an Image',
          content: [
            'This tool lets you cut out a specific portion of your image.',
            '**1. Upload Image:** Click "Choose File" to select your image.',
            '**2. Adjust Crop:** Drag the box to move it. Drag the **sides or corners** to resize it.',
            '**3. Set Aspect Ratio:** Click "1:1" (square), "4:3", "16:9", or "Free" to change the shape of the crop box.',
            '**4. Rotate:** Use the "Rotation" slider to straighten or rotate your image.',
            '**5. Crop:** Click the "Crop Image" button.',
            '**6. Download:** A "Download Cropped Image" button will appear.',
          ],
        },
      ],
    },
    base64: {
      title: 'Image to Base64 Guide',
      sections: [
        {
          title: 'How to Convert an Image to Base64',
          content: [
            'This tool converts an image file into a Base64 Data URL that you can copy and use inline or for testing.',
            '**1. Upload Image:** Click "Choose File" and select an image (PNG, JPG, etc.).',
            '**2. Preview:** The Base64 Data URL will appear in the textarea below.',
            '**3. Copy:** Click the copy button to copy the Base64 string to your clipboard.',
            '',
            'Note: Base64 strings are larger than the original file size and are best used for very small images like icons or logos.',
          ],
        },
      ],
    },
    pdfmerge: {
      title: 'PDF Merger Guide',
      sections: [
        {
          title: 'How to Merge PDFs',
          content: [
            'This tool combines multiple PDF files into a single PDF document, right in your browser.',
            '**1. Add PDFs:** Click "Add PDF(s)" and select one or more files. You can repeat this step to add more files to the list.',
            '**2. Manage Files:** A list of your files will appear. Click the "X" to remove a file. Files will be merged in the order they appear in the list.',
            '**3. Merge:** Click the "Merge PDFs" button.',
            '**4. Download:** A "Download Merged PDF" button will appear.',
            '',
            'All processing is done locally. Your documents are never sent to a server.',
          ],
        },
      ],
    },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* --- Hidden Canvas for Cropping --- */}
      <canvas ref={previewCanvasRef} className="hidden" />
      {/* --- End Hidden Canvas --- */}
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          File & Media Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          Resize, crop, and convert images, or merge PDFs. 100% private.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* --- Image Resizer (NEW UI) --- */}
      {activeTab === 'resize' && (
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
      )}

      {/* --- Image Cropper (NEW UI & LOGIC) --- */}
      {activeTab === 'crop' && (
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
                {/* ===> CHANGE 1: This is the new Cropper component <=== */}
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                  // 'rotate' prop removed from here
                >
                  <img
                    ref={imgRef}
                    src={cropImgSrc}
                    onLoad={onImageLoad}
                    alt="Crop me"
                    // ===> CHANGE 2: Rotation is applied via style here <===
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
                    <button onClick={() => onAspectChange(1/1)} className={`px-3 py-1 rounded-md text-sm ${aspect === 1/1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>1:1</button>
                    <button onClick={() => onAspectChange(4/3)} className={`px-3 py-1 rounded-md text-sm ${aspect === 4/3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>4:3</button>
                    <button onClick={() => onAspectChange(16/9)} className={`px-3 py-1 rounded-md text-sm ${aspect === 16/9 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>16:9</button>
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
      )}

      {/* --- Image to Base64 (Unchanged) --- */}
      {activeTab === 'base64' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Image to Base64 Converter
          </h2>
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBase64FileChange}
              className="w-full p-3 rounded-lg border bg-background"
            />
          </div>
          {base64Output && (
            <div className="relative">
              <textarea
                readOnly
                value={base64Output}
                rows={10}
                className="w-full p-3 rounded-lg border bg-background/50 font-mono text-sm"
                placeholder="Base64 Data URL will appear here..."
              ></textarea>
              <button
                onClick={() => copyToClipboard(base64Output, setCopiedBase64)}
                className="absolute top-3 right-3 p-2 rounded-lg bg-background hover:bg-muted"
              >
                {copiedBase64 ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Clipboard className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- PDF Merger (NEW UI) --- */}
      {activeTab === 'pdfmerge' && (
        <div className="p-6 rounded-xl border bg-card space-y-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            PDF Merger (Client-Side)
          </h2>
          <div>
            <label className="block text-sm font-medium mb-2">
              1. Add PDF(s)
            </label>
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handlePdfFileChange}
              className="w-full p-3 rounded-lg border bg-background"
            />
             <p className="text-xs text-muted-foreground mt-2">You can add more files multiple times.</p>
          </div>
          {pdfFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">2. Files to Merge (in order):</h3>
              <ul className="space-y-2 max-h-60 overflow-y-auto p-3 rounded-lg bg-muted border">
                {pdfFiles.map((file, index) => (
                  <li key={`${file.name}-${index}`} className="flex justify-between items-center text-sm p-2 bg-background rounded">
                    <span>{file.name}</span>
                    <button onClick={() => removePdfFile(index)} className="text-muted-foreground hover:text-red-600">
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setPdfFiles([])}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </button>
            </div>
          )}
          <button
            onClick={handleMergePDFs}
            disabled={pdfFiles.length < 2 || isMerging}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {isMerging ? 'Merging...' : `3. Merge ${pdfFiles.length} PDFs`}
          </button>
          {mergedPdfUrl && (
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold">Merge Complete!</h3>
              <a
                href={mergedPdfUrl}
                download="merged.pdf"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                <Download className="h-4 w-4" />
                Download Merged PDF
              </a>
            </div>
          )}
        </div>
      )}

      {/* --- Tutorials Section (Updated) --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Tutorials & Guides</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-2">
            <h3 className="font-semibold mb-3 text-lg">Select Tutorial:</h3>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTutorial(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all border ${
                  activeTutorial === tab.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-muted border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                {tutorials[activeTutorial as keyof typeof tutorials]?.title}
              </h3>
              <div className="space-y-6">
                {/* ===> CHANGE 3: Fixed 'any' type for sectionIndex <=== */}
                {(() => {
                    // Local type for tutorial sections
                    type TutorialSection = {
                        title: string;
                        content: string[];
                    };

                    const sections = tutorials[
                        activeTutorial as keyof typeof tutorials
                    ]?.sections as TutorialSection[] | undefined;

                    return sections?.map((section: TutorialSection, sectionIndex: number) => (
                        <div key={sectionIndex} className="space-y-4">
                            <h4 className="text-xl font-semibold text-foreground border-b pb-2">
                                {section.title}
                            </h4>
                            <div className="prose prose-lg max-w-none text-foreground">
                                {/* ===> CHANGE 4: Fixed 'any' type for lineIndex <=== */}
                                {section.content.map((line: string, lineIndex: number) => (
                                    <p key={lineIndex} className="text-foreground leading-relaxed">
                                        {line.startsWith('**') ? (
                                            <strong>{line.replace(/\*\*/g, '')}</strong>
                                        ) : line.startsWith('  -') ? (
                                            <span className="ml-4">{line}</span>
                                        ) : line === '' ? (
                                            <br />
                                        ) : (
                                            line
                                        )}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ));
                })()}
              </div>
            </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-3 text-blue-800">Pro Tip</h4>
              <p className="text-blue-700">
                {activeTutorial === 'resize' &&
                  'Check "Lock Aspect Ratio" to prevent your image from looking stretched or squashed.'}
                {activeTutorial === 'crop' &&
                  'Use the Rotation slider to straighten crooked photos before cropping. You can also drag the sides of the crop box!'}
                {activeTutorial === 'base64' &&
                  'Base64 strings are larger than the original file, so they are best used for very small images like icons or logos.'}
                {activeTutorial === 'pdfmerge' &&
                  'Your files are never uploaded. This tool is perfect for merging sensitive documents like contracts or reports, as it is 100% private.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section (Unchanged) --- */}
      <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Need More Tools?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a
            href="/text-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Text & Coding
          </a>
          <a
            href="/design-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Design Tools
          </a>
          <a
            href="/misc-tools"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            Fun Tools
          </a>
          <a
            href="/"
            className="p-3 rounded-lg bg-background hover:bg-muted transition-colors"
          >
            All Tools
          </a>
        </div>
      </div>
    </div>
  );
}