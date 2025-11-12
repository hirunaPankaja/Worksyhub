// src/app/pdf-merger/page.tsx
'use client';

import { useState, useRef } from 'react';
import { FileText, BookOpen, Download, Trash2, X, Shield, Upload } from 'lucide-react';

export default function PDFMergerPage() {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Add PDFs (supports re-adding & duplicates)
  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setPdfFiles((prev) => [...prev, ...newFiles]);
      setMergedPdfUrl(null);
      e.target.value = ''; // reset for future uploads
    }
  };

  // ✅ Remove one file
  const removePdfFile = (index: number) => {
    setPdfFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Clear all files
  const clearAll = () => {
    setPdfFiles([]);
    setMergedPdfUrl(null);
  };

  // ✅ Merge PDFs using pdf-lib
  const handleMergePDFs = async () => {
    if (pdfFiles.length < 2) {
      alert('Please add at least 2 PDF files to merge.');
      return;
    }

    setIsMerging(true);
    setMergedPdfUrl(null);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const mergedPdf = await PDFDocument.create();

      for (const file of pdfFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      // ✅ Fix: Create a new Uint8Array to ensure proper typing for Blob (copies data, but satisfies TS)
      const pdfBytes = new Uint8Array(mergedPdfBytes);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('An error occurred while merging PDFs. Please try again.');
    }

    setIsMerging(false);
  };

  // ✅ Tutorial content
  const tutorial = {
    title: 'How to Merge PDF Files',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Add PDFs:** Click "Add PDF(s)" or drag and drop multiple files.',
          '**2. Manage Files:** Remove or reorder files before merging.',
          '**3. Merge:** Click "Merge PDFs" to combine them.',
          '**4. Download:** Save your new merged PDF instantly.',
        ],
      },
    ],
  };

  // ✅ Drag & Drop handler
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === 'application/pdf'
    );
    if (droppedFiles.length > 0) {
      setPdfFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">PDF Merger</h1>
        <p className="text-lg text-muted-foreground">
          Combine multiple PDF files directly in your browser — no uploads, no limits.
        </p>
      </div>

      {/* --- PDF Merger Tool --- */}
      <div
        className="p-6 rounded-xl border bg-card space-y-6"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h2 className="text-2xl font-bold text-card-foreground">
          PDF Merger (Client-Side)
        </h2>

        {/* File Input */}
        <div className="text-center space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            multiple
            onChange={handlePdfFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            type="button"
          >
            <Upload className="h-5 w-5" />
            Add PDF(s)
          </button>
          <p className="text-sm text-muted-foreground">
            Or drag and drop your PDFs here
          </p>
        </div>

        {/* File List */}
        {pdfFiles.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium">
              Files to Merge ({pdfFiles.length}):
            </h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto p-3 rounded-lg bg-muted border">
              {pdfFiles.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex justify-between items-center text-sm p-2 bg-background rounded"
                >
                  <span className="truncate" title={file.name}>
                    {index + 1}. {file.name}
                  </span>
                  <button
                    onClick={() => removePdfFile(index)}
                    className="text-muted-foreground hover:text-red-600 ml-2"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={clearAll}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-600"
              type="button"
            >
              <Trash2 className="h-4 w-4" /> Clear All
            </button>
          </div>
        )}

        {/* Merge Button */}
        <button
          onClick={handleMergePDFs}
          disabled={pdfFiles.length < 2 || isMerging}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          {isMerging ? 'Merging PDFs...' : `Merge ${pdfFiles.length} PDF${pdfFiles.length > 1 ? 's' : ''}`}
        </button>

        {/* Download Link */}
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

      {/* --- Tutorial Section --- */}
      <div className="p-6 rounded-lg bg-muted/50 space-y-8">
        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            How to Use This Tool
          </h2>
          {tutorial.sections.map((section, i) => (
            <div key={i} className="space-y-3">
              <h3 className="text-xl font-semibold">{section.title}</h3>
              {section.content.map((line, j) => (
                <p key={j} className="text-foreground leading-relaxed">
                  {line.replace(/\*\*/g, '')}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="bg-background border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            100% Private and Secure
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>No Uploads:</strong> Files never leave your device.</li>
            <li><strong>Fast:</strong> Everything runs locally in your browser.</li>
            <li><strong>Works Offline:</strong> No server or internet required.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}