// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://worksyhub.online';
  const currentDate = new Date();

  // Explicit literal types for changeFrequency
  type ChangeFreq = 'weekly' | 'monthly' | 'always' | 'hourly' | 'daily' | 'yearly' | 'never';

  // Your main static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.5,
    },
  ];

  // Tool routes
  const toolRoutes = [
    '/time-zone-converter',
    '/age-calculator',
    '/days-between-dates',
    '/unix-timestamp',
    '/countdown-timer',
    '/length-converter',
    '/weight-converter',
    '/temperature-converter',
    '/area-converter',
    '/speed-converter',
    '/volume-converter',
    '/basic-calculator',
    '/scientific-calculator',
    '/percentage-calculator',
    '/bmi-calculator',
    '/emi-calculator',
    '/discount-calculator',
    '/grade-average-calculator',
    '/gpa-calculator',
    '/password-generator',
    '/qr-code-generator',
    '/barcode-generator',
    '/case-converter',
    '/word-counter',
    '/color-picker',
    '/gradient-generator',
    '/color-converter',
    '/world-clock',
    '/stopwatch',
    '/sleep-calculator',
    '/mood-tracker',
    '/json-formatter',
    '/base64-encoder-decoder',
    '/url-encoder-decoder',
    '/lorem-ipsum-generator',
    '/image-resizer',
    '/image-cropper',
    '/image-to-base64',
    '/pdf-merger',
    '/coin-flip-dice-roll',
    '/random-number-generator',
    '/decision-wheel',
    '/magic-8-ball',
    '/rock-paper-scissors',
    '/quote-generator',
  ];

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = toolRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as ChangeFreq,
    priority: 0.9,
  }));

  // Combine
  return [...staticPages, ...toolPages];
}
