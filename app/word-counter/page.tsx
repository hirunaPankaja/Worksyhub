// src/app/word-counter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  ListOrdered,
  BookOpen,
  Clipboard,
  Check,
  Trash2,
  FileText,
  Twitter,
  Zap,
  BarChart3,
  Clock,
  Type,
  Hash,
  AlertCircle,
  CheckCircle2,
  Download,
  Upload,
  Eye,
  EyeOff,
  Users,
  School,
  PenTool,
  Search,
  MessageSquare,
  Mail,
  Book,
  Linkedin,
  Facebook,
  Instagram,
  FileWarning,
  Loader2,
  FileText as FileTextIcon
} from 'lucide-react';

// Browser-native text extraction function
const extractTextFromFile = async (file: File): Promise<{ text: string; warning?: string }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileName = file.name.toLowerCase();
      const reader = new FileReader();

      if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
        // Plain text files - full support
        reader.onload = (e) => {
          const text = e.target?.result as string;
          resolve({ text });
        };
        reader.onerror = () => reject(new Error('Failed to read text file'));
        reader.readAsText(file);
      }
      else if (fileName.endsWith('.pdf')) {
        // PDF files - show informative message
        resolve({
          text: 'PDF file detected. For accurate text extraction from PDF files, please copy and paste the text content directly, or convert the PDF to a text file first. PDF text extraction requires additional libraries that are not available in this environment.',
          warning: 'PDF text extraction not available. Please use plain text files for accurate counting.'
        });
      }
      else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        // Word documents - show informative message
        resolve({
          text: 'Word document detected. For accurate text extraction from Word documents, please copy and paste the text content directly, or save the document as a text file first. DOCX text extraction requires additional libraries that are not available in this environment.',
          warning: 'Word document extraction not available. Please use plain text files for accurate counting.'
        });
      }
      else if (fileName.endsWith('.rtf')) {
        // RTF files - basic text extraction
        reader.onload = (e) => {
          const rawText = e.target?.result as string;
          // Basic RTF stripping - remove control words and groups
          const text = rawText
            .replace(/\\[a-z]+\d*\s?/g, '') // Remove control words
            .replace(/[{}\\]/g, ' ') // Remove braces and backslashes
            .replace(/\s+/g, ' ') // Normalize whitespace
            .trim();

          resolve({
            text: text || 'No extractable text found in RTF file.',
            warning: text ? 'RTF formatting removed. Some content may be lost.' : 'No text content found in RTF file.'
          });
        };
        reader.readAsText(file);
      }
      else {
        reject(new Error(`Unsupported file type: ${file.name}. Please use .txt or .md files for accurate word counting.`));
      }
    } catch (error) {
      reject(error instanceof Error ? error : new Error('Failed to process file'));
    }
  });
};

// Enhanced text analysis with better language support
const analyzeText = (text: string) => {
  const cleanText = text.trim();
  if (!cleanText) {
    return {
      words: [],
      wordCount: 0,
      charCount: 0,
      charCountNoSpaces: 0,
      sentences: [],
      sentenceCount: 0,
      paragraphs: [],
      paragraphCount: 0,
      longestWord: '',
      avgWordLength: 0,
      avgSentenceLength: 0,
      readabilityScore: 0
    };
  }

  // Enhanced word splitting that handles multiple languages and edge cases
  const words = cleanText
    .split(/[\s\p{P}]+/u) // Split by whitespace and punctuation (Unicode aware)
    .filter(word => {
      // Filter out empty strings and pure punctuation
      return word.length > 0 && /\p{L}/u.test(word);
    });

  const wordCount = words.length;

  // Character counts
  const charCount = cleanText.length;
  const charCountNoSpaces = cleanText.replace(/\s/g, '').length;

  // Enhanced sentence detection
  const sentences = cleanText
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  const sentenceCount = sentences.length;

  // Paragraph detection
  const paragraphs = cleanText
    .split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
  const paragraphCount = paragraphs.length;

  // Longest word
  const longestWord = words.length > 0 ?
    words.reduce((a, b) => a.length > b.length ? a : b) : '';

  // Advanced statistics
  const avgWordLength = words.length > 0 ?
    words.reduce((sum, word) => sum + word.length, 0) / words.length : 0;

  const avgSentenceLength = sentenceCount > 0 ?
    wordCount / sentenceCount : 0;

  // Enhanced readability scoring
  const readabilityScore = calculateReadabilityScore(avgWordLength, avgSentenceLength, wordCount);

  return {
    words,
    wordCount,
    charCount,
    charCountNoSpaces,
    sentences,
    sentenceCount,
    paragraphs,
    paragraphCount,
    longestWord,
    avgWordLength: Number(avgWordLength.toFixed(1)),
    avgSentenceLength: Number(avgSentenceLength.toFixed(1)),
    readabilityScore: Number(readabilityScore.toFixed(1))
  };
};

const calculateReadabilityScore = (avgWordLength: number, avgSentenceLength: number, wordCount: number): number => {
  if (wordCount === 0) return 0;

  // Enhanced readability calculation
  let score = 100;

  // Penalize long words more heavily
  score -= Math.min(avgWordLength * 2, 40);

  // Penalize long sentences
  score -= Math.min(avgSentenceLength * 0.5, 30);

  // Bonus for optimal word count range
  if (wordCount >= 200 && wordCount <= 1000) {
    score += 5;
  }

  return Math.max(0, Math.min(100, score));
};

export default function WordCounterPage() {
  const [counterText, setCounterText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [charCountNoSpaces, setCharCountNoSpaces] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [speakingTime, setSpeakingTime] = useState(0);
  const [longestWord, setLongestWord] = useState('');
  const [copied, setCopied] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [showWhitespace, setShowWhitespace] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadWarning, setUploadWarning] = useState<string | null>(null);
  const [textStats, setTextStats] = useState({
    avgWordLength: 0,
    avgSentenceLength: 0,
    readabilityScore: 0
  });

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && counterText) {
      localStorage.setItem('wordCounterText', counterText);
    }
  }, [counterText, autoSave]);

  useEffect(() => {
    const savedText = localStorage.getItem('wordCounterText');
    if (savedText && autoSave) {
      setCounterText(savedText);
    }
  }, [autoSave]);

  // Text analysis effect
  useEffect(() => {
    const analysis = analyzeText(counterText);

    setWordCount(analysis.wordCount);
    setCharCount(analysis.charCount);
    setCharCountNoSpaces(analysis.charCountNoSpaces);
    setSentenceCount(analysis.sentenceCount);
    setParagraphCount(analysis.paragraphCount);
    setLongestWord(analysis.longestWord);
    setReadingTime(Math.ceil(analysis.wordCount / 200));
    setSpeakingTime(Math.ceil(analysis.wordCount / 150));
    setTextStats({
      avgWordLength: analysis.avgWordLength,
      avgSentenceLength: analysis.avgSentenceLength,
      readabilityScore: analysis.readabilityScore
    });
  }, [counterText]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(counterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setCounterText('');
    setUploadError(null);
    setUploadWarning(null);
    if (autoSave) {
      localStorage.removeItem('wordCounterText');
    }
  };

  const downloadText = () => {
    const blob = new Blob([counterText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `word-counter-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setUploadError(null);
    setUploadWarning(null);

    try {
      // File validation
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size too large. Please upload files smaller than 5MB.');
      }

      const fileName = file.name.toLowerCase();
      const allowedExtensions = ['.txt', '.md', '.rtf'];
      const isAllowed = allowedExtensions.some(ext => fileName.endsWith(ext));

      if (!isAllowed) {
        throw new Error(`Please upload .txt, .md, or .rtf files for accurate word counting. For PDF or Word documents, copy and paste the text content directly.`);
      }

      const { text, warning } = await extractTextFromFile(file);

      if (!text || text.trim().length === 0) {
        throw new Error('No text content could be extracted from this file.');
      }

      setCounterText(text);

      if (warning) {
        setUploadWarning(warning);
      }

    } catch (error) {
      console.error('File processing error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process file. Please try again.';
      setUploadError(errorMessage);
    } finally {
      setIsLoading(false);
      event.target.value = '';
    }
  };

  const stats = [
    { icon: Type, label: 'Words', value: wordCount, color: 'primary' },
    { icon: Hash, label: 'Characters', value: charCount, color: 'blue' },
    { icon: Hash, label: 'Chars (no spaces)', value: charCountNoSpaces, color: 'green' },
    { icon: ListOrdered, label: 'Sentences', value: sentenceCount, color: 'purple' },
    { icon: FileText, label: 'Paragraphs', value: paragraphCount, color: 'orange' },
    { icon: Clock, label: 'Read Time', value: `${readingTime}m`, color: 'red' },
    { icon: Clock, label: 'Speak Time', value: `${speakingTime}m`, color: 'pink' },
    { icon: BarChart3, label: 'Readability', value: `${textStats.readabilityScore}`, color: 'indigo' },
  ];

  // Tutorials data - Now properly used in JSX
  const tutorials = {
    title: 'How to Use the Advanced Word & Character Counter',
    sections: [
      {
        title: 'Step-by-Step Guide',
        content: [
          '**1. Input Text:** Type directly, paste text, or upload files (.txt, .md, .docx, .pdf)',
          '**2. Real-time Analytics:** Watch 8 different metrics update instantly as you type or edit',
          '**3. File Processing:** Upload documents with full text extraction support',
          '**4. Export Options:** Copy text to clipboard or download as .txt file',
          '',
          '**Advanced Features:**',
          '  - **Auto-save:** Your work is automatically saved in your browser',
          '  - **Whitespace Visualization:** See spaces, tabs, and line breaks clearly',
          '  - **Readability Scoring:** Get instant feedback on text complexity',
          '  - **Writing Goals:** Track progress against platform-specific limits',
        ],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* --- Advanced Word Counter Tool --- */}
      <div className="p-8 rounded-2xl border bg-card shadow-xl space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-card-foreground capitalize flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            Advanced Word & Character Counter
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAutoSave(!autoSave)}
              className={`p-2 rounded-lg transition-colors ${autoSave
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}
              title={autoSave ? 'Auto-save enabled' : 'Auto-save disabled'}
            >
              {autoSave ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setShowWhitespace(!showWhitespace)}
              className={`p-2 rounded-lg transition-colors ${showWhitespace
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}
              title={showWhitespace ? 'Hide whitespace' : 'Show whitespace'}
            >
              {showWhitespace ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Professional text analysis with real-time statistics
        </p>

        {/* Upload Status */}
        {isLoading && (
          <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <Loader2 className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
            <span className="text-blue-700 dark:text-blue-300">Processing file...</span>
          </div>
        )}

        {uploadError && (
          <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <FileWarning className="h-5 w-5 text-red-600 dark:text-red-400" />
            <span className="text-red-700 dark:text-red-300">{uploadError}</span>
          </div>
        )}

        {uploadWarning && (
          <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <span className="text-yellow-700 dark:text-yellow-300">{uploadWarning}</span>
          </div>
        )}

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 rounded-lg bg-muted text-center">
              <stat.icon className={`h-6 w-6 mx-auto mb-2 text-${stat.color}-500`} />
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Text Input Area */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-lg font-semibold text-card-foreground">Your Text</label>
            <div className="flex gap-2">
              <input
                type="file"
                accept=".txt,.md,.rtf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={isLoading}
              />
              <label
                htmlFor="file-upload"
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${isLoading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {isLoading ? 'Processing...' : 'Upload File'}
              </label>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={showWhitespace ? counterText.replace(/ /g, '·').replace(/\t/g, '→ ').replace(/\n/g, '↵\n') : counterText}
              onChange={(e) => setCounterText(showWhitespace ? e.target.value.replace(/·/g, ' ').replace(/→ /g, '\t').replace(/↵\n/g, '\n') : e.target.value)}
              rows={16}
              className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground text-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono resize-y"
              style={{ minHeight: '320px' }}
              placeholder="Type or paste your text here... Or upload .txt, .md, or .rtf files. For PDF or Word documents, copy and paste the text content directly. All statistics update in real-time as you type."
              disabled={isLoading}
            />

            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-background hover:bg-muted border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Copy text to clipboard"
                disabled={!counterText || isLoading}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Clipboard className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* File Support Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
              <FileTextIcon className="h-4 w-4" />
              File Support Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700 dark:text-blue-300">
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  <span><strong>.txt files:</strong> Full support</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  <span><strong>.md files:</strong> Full support</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 text-yellow-500" />
                  <span><strong>.rtf files:</strong> Basic support</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <FileWarning className="h-3 w-3 text-orange-500" />
                  <span><strong>PDF/DOCX:</strong> Copy & paste text</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileWarning className="h-3 w-3 text-orange-500" />
                  <span><strong>Word docs:</strong> Copy & paste text</span>
                </div>
                <div className="text-xs mt-1">
                  Max file size: 5MB
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Statistics */}
        {counterText.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-muted rounded-xl">
            <div>
              <h4 className="font-semibold text-card-foreground mb-3">Text Statistics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Avg Word Length:</span>
                  <span className="font-semibold">{textStats.avgWordLength} chars</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Sentence Length:</span>
                  <span className="font-semibold">{textStats.avgSentenceLength} words</span>
                </div>
                <div className="flex justify-between">
                  <span>Longest Word:</span>
                  <span className="font-semibold text-blue-600" title={longestWord}>
                    {longestWord ? (longestWord.length > 15 ? `${longestWord.substring(0, 15)}...` : longestWord) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-card-foreground mb-3">Writing Goals</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Blog Post:</span>
                  <span className={`font-semibold ${wordCount >= 300 && wordCount <= 500 ? 'text-green-500' : 'text-orange-500'
                    }`}>
                    {wordCount >= 300 && wordCount <= 500 ? '✓ Optimal' : `${wordCount}/500`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Twitter:</span>
                  <span className={`font-semibold ${charCount <= 280 ? 'text-green-500' : 'text-red-500'}`}>
                    {charCount <= 280 ? '✓ Fits' : `${charCount}/280`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Meta Description:</span>
                  <span className={`font-semibold ${charCount <= 160 ? 'text-green-500' : 'text-orange-500'}`}>
                    {charCount <= 160 ? '✓ Perfect' : `${charCount}/160`}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-card-foreground mb-3">Content Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Readability:</span>
                  <span className={`font-semibold ${textStats.readabilityScore >= 80 ? 'text-green-500' :
                    textStats.readabilityScore >= 60 ? 'text-blue-500' :
                      textStats.readabilityScore >= 40 ? 'text-orange-500' : 'text-red-500'
                    }`}>
                    {textStats.readabilityScore}/100
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Content Density:</span>
                  <span className="font-semibold">
                    {paragraphCount > 0 ? ((wordCount / paragraphCount).toFixed(1)) : 0} w/para
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sentence Variety:</span>
                  <span className="font-semibold">
                    {sentenceCount > 0 ? ((wordCount / sentenceCount).toFixed(1)) : 0} w/sent
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={downloadText}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!counterText || isLoading}
          >
            <Download className="h-4 w-4" />
            Download Text
          </button>
          <button
            onClick={clearText}
            className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!counterText || isLoading}
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </button>
        </div>
      </div>

      {/* SEO Intro Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-8 rounded-2xl border">
        <h2 className="text-4xl font-bold text-foreground mb-4 text-center">
          Professional Word Counter & Character Counter Tool
        </h2>
        <p className="text-2xl text-muted-foreground mb-8 text-center">
          Advanced Text Analysis for Writers, Students & Content Creators
        </p>
        <div className="prose prose-xl max-w-none text-foreground">
          <p className="text-xl leading-relaxed mb-6">
            Welcome to the most comprehensive <strong className="text-primary">word counter tool</strong> and
            professional <strong className="text-blue-600 dark:text-blue-400">character counter</strong> available online.
            Our advanced <strong className="text-purple-600 dark:text-purple-400">text analysis platform</strong> provides
            real-time counting of words, characters, sentences, paragraphs, and much more. Whether you're a
            <strong> student writing essays</strong>, a <strong>professional content creator</strong>, an
            <strong> SEO specialist optimizing web content</strong>, or a <strong>social media manager</strong> crafting
            perfect posts, our <strong>word count tool</strong> delivers precise, instant results for all your
            <strong> writing needs</strong>.
          </p>
          <p className="text-xl leading-relaxed">
            This free <strong>online word counter</strong> goes beyond basic counting to provide
            <strong> advanced writing analytics</strong> including reading time estimates, speaking time calculations,
            readability scores, and comprehensive text statistics. Our <strong>character count tool</strong> supports
            multiple counting methods and helps you meet specific platform requirements like
            <strong> Twitter's 280-character limit</strong> or <strong>Google's meta description guidelines</strong>.
            With features like auto-save, file upload, and detailed writing insights, this is the ultimate
            <strong> writing assistant tool</strong> for professionals and students worldwide.
          </p>
        </div>
      </div>

      {/* --- Rich Content Sections --- */}
      <div className="space-y-8">

        {/* --- How to Use Tutorial --- */}
        <div className="bg-card border rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-6 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            {tutorials.title}
          </h2>
          <div className="space-y-6">
            {tutorials.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-2xl font-semibold text-card-foreground border-b pb-3 border-border">
                  {section.title}
                </h3>
                <div className="prose prose-lg max-w-none text-foreground">
                  {section.content.map((line, lineIndex) => (
                    <div key={lineIndex} className="mb-4">
                      {line.startsWith('**') ? (
                        <strong className="text-card-foreground text-xl">{line.replace(/\*\*/g, '')}</strong>
                      ) : line.trim().startsWith('-') ? (
                        <p className="text-foreground leading-relaxed ml-6">{line}</p>
                      ) : line === '' ? (
                        <div className="my-6 border-t border-border"></div>
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

        {/* --- Professional Applications --- */}
        <div className="bg-card border rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-6 flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Who Uses Our Word Counter Tool?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 bg-blue-500/10 rounded-xl">
              <School className="h-10 w-10 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-card-foreground mb-2">Students & Academics</h4>
                <p className="text-foreground">
                  Meet essay word count requirements, format research papers, and ensure academic writing meets specific length guidelines.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-green-500/10 rounded-xl">
              <PenTool className="h-10 w-10 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-card-foreground mb-2">Content Writers & Bloggers</h4>
                <p className="text-foreground">
                  Craft perfectly sized articles, optimize blog post length for SEO, and maintain consistent content quality.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-purple-500/10 rounded-xl">
              <Search className="h-10 w-10 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-card-foreground mb-2">SEO Specialists</h4>
                <p className="text-foreground">
                  Optimize meta descriptions, title tags, and content length for search engine rankings and user engagement.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-orange-500/10 rounded-xl">
              <MessageSquare className="h-10 w-10 text-orange-600 dark:text-orange-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-card-foreground mb-2">Social Media Managers</h4>
                <p className="text-foreground">
                  Create platform-perfect posts for Twitter, Facebook, Instagram, and LinkedIn with character limit compliance.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-red-500/10 rounded-xl">
              <Mail className="h-10 w-10 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-card-foreground mb-2">Email Marketers</h4>
                <p className="text-foreground">
                  Craft compelling subject lines and email content that drives opens and clicks while maintaining optimal length.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-indigo-500/10 rounded-xl">
              <Book className="h-10 w-10 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-card-foreground mb-2">Authors & Editors</h4>
                <p className="text-foreground">
                  Manage manuscript length, chapter word counts, and maintain consistent pacing throughout books and publications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- FAQ Section --- */}
        <div className="bg-card border rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-card-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">How accurate is the word counter?</h3>
              <p className="text-lg text-foreground">
                Our <strong className="text-primary">word counter tool</strong> is extremely accurate and uses advanced
                algorithms to count words, characters, and other text metrics. It handles various text formats,
                punctuation, and special characters with precision, making it reliable for
                <strong> professional writing</strong>, <strong>academic work</strong>, and
                <strong> content creation</strong>.
              </p>
            </div>
            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">What's the difference between character count with and without spaces?</h3>
              <p className="text-lg text-foreground">
                <strong className="text-green-600 dark:text-green-400">Character count with spaces</strong> includes
                all characters in your text, including spaces, tabs, and line breaks.
                <strong className="text-blue-600 dark:text-blue-400"> Character count without spaces</strong> only
                counts visible characters, which is useful for platforms with strict character limits like
                <strong> Twitter</strong> and <strong>meta descriptions</strong>.
              </p>
            </div>
            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">How is reading time calculated?</h3>
              <p className="text-lg text-foreground">
                <strong className="text-primary">Reading time</strong> is calculated based on an average reading speed
                of 200 words per minute. This is a standard metric used in content publishing and helps
                <strong> content creators</strong> and <strong>readers</strong> understand the time commitment
                required for different pieces of content.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Can I use this word counter for different languages?</h3>
              <p className="text-lg text-foreground">
                Yes! Our <strong className="text-purple-600 dark:text-purple-400">word counter tool</strong> supports
                multiple languages including <strong className="text-green-600 dark:text-green-400">English</strong>,
                <strong className="text-blue-600 dark:text-blue-400"> Spanish</strong>,
                <strong className="text-orange-600 dark:text-orange-400"> French</strong>,
                <strong className="text-red-600 dark:text-red-400"> German</strong>, and many others. The character
                counting and basic word counting work across most languages, making it perfect for
                <strong> international content creation</strong> and <strong>multilingual projects</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Need More Tools? Section --- */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
        <h3 className="text-2xl font-semibold text-card-foreground mb-6 text-center">Explore More Professional Writing Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <a href="/password-generator" className="p-4 rounded-xl bg-card hover:bg-muted transition-all transform hover:scale-105 border border-border shadow-sm">
            <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="font-semibold text-card-foreground">Password Generator</div>
          </a>
          <a href="/qr-code-generator" className="p-4 rounded-xl bg-card hover:bg-muted transition-all transform hover:scale-105 border border-border shadow-sm">
            <FileText className="h-6 w-6 mx-auto mb-2 text-green-600 dark:text-green-400" />
            <div className="font-semibold text-card-foreground">QR Code Generator</div>
          </a>
          <a href="/unit-converter" className="p-4 rounded-xl bg-card hover:bg-muted transition-all transform hover:scale-105 border border-border shadow-sm">
            <FileText className="h-6 w-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <div className="font-semibold text-card-foreground">Unit Converter</div>
          </a>
          <a href="/bmi-calculator" className="p-4 rounded-xl bg-card hover:bg-muted transition-all transform hover:scale-105 border border-border shadow-sm">
            <FileText className="h-6 w-6 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
            <div className="font-semibold text-card-foreground">BMI Calculator</div>
          </a>
        </div>
      </div>
    </div>
  );
}