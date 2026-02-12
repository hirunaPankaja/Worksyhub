import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://worksyhub.online';
  const currentDate = new Date();

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

  const highTrafficTools = [
    '/bmi-calculator',
    '/age-calculator',
    '/percentage-calculator',
    '/scientific-calculator',
    '/basic-calculator',
    '/word-counter',
    '/password-generator',
    '/qr-code-generator',
    '/youtube-thumbnail-downloader',
    '/image-resizer',
    '/unit-converter',
    '/emi-calculator',
    '/discount-calculator',
    '/days-between-dates',
    '/countdown-timer',
    '/stopwatch',
    '/world-clock',
    '/favorites',
    '/freelancer-calculator',
    '/video-player',
  ];

  const toolPages: MetadataRoute.Sitemap = highTrafficTools.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticPages, ...toolPages];
}