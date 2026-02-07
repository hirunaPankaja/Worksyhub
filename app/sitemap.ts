// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://worksyhub.online';
  const currentDate = new Date();

  // STATIC PAGES
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // HIGH-TRAFFIC TOOLS - All Priority 1.0
  // These are the only tools we keep, optimized for maximum search volume
  const highTrafficTools = [
    '/bmi-calculator',           // 100K+ monthly searches
    '/age-calculator',           // 150K+ monthly searches  
    '/percentage-calculator',    // 200K+ monthly searches
    '/scientific-calculator',    // 100K+ monthly searches
    '/basic-calculator',         // 80K+ monthly searches
    '/word-counter',             // 80K+ monthly searches
    '/password-generator',       // 90K+ monthly searches
    '/qr-code-generator',        // 150K+ monthly searches
    '/youtube-thumbnail-downloader', // 100K+ monthly searches
    '/image-resizer',            // 60K+ monthly searches
    '/unit-converter',           // 120K+ monthly searches (NEW - consolidated)
    '/emi-calculator',           // 80K+ monthly searches
    '/discount-calculator',      // 50K+ monthly searches
    '/days-between-dates',       // 40K+ monthly searches
    '/countdown-timer',          // 50K+ monthly searches
    '/stopwatch',                // 40K+ monthly searches
    '/world-clock',              // 50K+ monthly searches
  ];

  const toolPages: MetadataRoute.Sitemap = highTrafficTools.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 1.0,
  }));

  return [...staticPages, ...toolPages];
}