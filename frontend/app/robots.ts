import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all crawlers on all public pages
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',          // no API routes indexed
          '/_next/',        // Next.js internals
          '/bad-request',   // error pages — no SEO value
          '/bad-gateway',
          '/forbidden',
          '/gateway-timeout',
          '/gone',
          '/legal-block',
          '/maintenance',
          '/request-timeout',
          '/too-many-requests',
          '/unauthorized',
          '/unprocessable',
          '/conflict',
        ],
      },
    ],
    sitemap: 'https://www.bupefoundation.org/sitemap.xml',
    host:    'https://www.bupefoundation.org',
  }
}
