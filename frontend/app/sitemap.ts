import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.bupefoundation.org'

  // Use fixed dates for static pages — only bump when you actually update them.
  // Google uses these to decide how often to re-crawl.

  return [
    // ── Core pages — highest priority ──────────────────────────────────────
    {
      url:             base,
      lastModified:    new Date('2026-05-01'),
      changeFrequency: 'weekly',
      priority:        1.0,
    },
    {
      url:             `${base}/donate`,
      lastModified:    new Date('2026-05-01'),
      changeFrequency: 'monthly',
      priority:        1.0,
    },

    // ── Programme & impact pages — second tier ──────────────────────────────
    {
      url:             `${base}/programs`,
      lastModified:    new Date('2026-04-01'),
      changeFrequency: 'monthly',
      priority:        0.9,
    },
    {
      url:             `${base}/about`,
      lastModified:    new Date('2026-04-01'),
      changeFrequency: 'monthly',
      priority:        0.9,
    },
    {
      url:             `${base}/impact`,
      lastModified:    new Date('2026-04-01'),
      changeFrequency: 'monthly',
      priority:        0.8,
    },

    // ── Engagement pages ────────────────────────────────────────────────────
    {
      url:             `${base}/get-involved`,
      lastModified:    new Date('2026-04-01'),
      changeFrequency: 'monthly',
      priority:        0.8,
    },
    {
      url:             `${base}/news`,
      lastModified:    new Date(),          // always fresh — news changes regularly
      changeFrequency: 'weekly',
      priority:        0.8,
    },
    {
      url:             `${base}/contact`,
      lastModified:    new Date('2026-04-01'),
      changeFrequency: 'yearly',
      priority:        0.7,
    },
    {
      url:             `${base}/share-story`,
      lastModified:    new Date('2026-04-01'),
      changeFrequency: 'monthly',
      priority:        0.6,
    },

    // ── Legal pages — low priority, rarely change ───────────────────────────
    {
      url:             `${base}/privacy`,
      lastModified:    new Date('2026-02-01'),
      changeFrequency: 'yearly',
      priority:        0.2,
    },
    {
      url:             `${base}/terms`,
      lastModified:    new Date('2026-02-01'),
      changeFrequency: 'yearly',
      priority:        0.2,
    },
    {
      url:             `${base}/cookie-policy`,
      lastModified:    new Date('2026-02-01'),
      changeFrequency: 'yearly',
      priority:        0.2,
    },
  ]
}
