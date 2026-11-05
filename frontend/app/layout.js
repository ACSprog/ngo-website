import './globals.css'
import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import Loading         from './components/Loading'
import WhatsAppButton  from './components/WhatsAppButton'
import CookieBanner    from './components/CookieBanner'
import BackToTop       from './components/BackToTop'
import AnnouncementBanner from './components/AnnouncementBanner'

export const metadata = {
  // ── Basic ──────────────────────────────────────────────────────────────
  title: {
    default:  'Bupe Foundation — He Left 99 To Find Me',
    template: '%s | Bupe Foundation',
  },
  description:
    'A Christ-centered NGO in Zambia restoring hope, dignity and a future to orphaned and vulnerable children through faith, love and community.',
  keywords: [
    'Bupe Foundation',
    'Zambia NGO',
    'orphaned children Zambia',
    'child welfare Zambia',
    'donate Zambia',
    'vulnerable children Zambia',
    'Christian NGO Africa',
    'He Left 99 To Find Me',
    'child sponsorship Zambia',
    'volunteer Zambia',
    'Lusaka NGO',
    'Zambia charity',
  ],

  // ── Canonical ────────────────────────────────────────────────────────────
  metadataBase: new URL('https://www.bupefoundation.org'),
  alternates:   { canonical: '/' },

  // ── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type:        'website',
    locale:      'en_ZM',
    url:         'https://www.bupefoundation.org',
    siteName:    'Bupe Foundation',
    title:       'Bupe Foundation — Restoring Hope to Children in Zambia',
    description: 'A Christ-centered NGO restoring hope, dignity and a future to orphaned and vulnerable children in Zambia.',
    images: [
      {
        url:    '/images/og-image.jpg',
        width:  1200,
        height: 630,
        alt:    'Bupe Foundation — He Left 99 To Find Me',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card:        'summary_large_image',
    site:        '@BupeFoundation',
    creator:     '@BupeFoundation',
    title:       'Bupe Foundation — Restoring Hope to Children in Zambia',
    description: 'A Christ-centered NGO restoring hope, dignity and a future to orphaned and vulnerable children in Zambia.',
    images:      ['/images/og-image.jpg'],
  },

  // ── Icons ────────────────────────────────────────────────────────────────
  icons: {
    icon:    '/favicon.ico',
    shortcut:'/favicon.ico',
    apple:   '/favicon.png',
  },

  // ── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:  true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  // ── Verification (add once you have these) ───────────────────────────────
  // verification: {
  //   google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',
  //   yandex: 'YOUR_YANDEX_TOKEN',
  // },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon"             href="/favicon.ico" />
        <link rel="shortcut icon"    href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body>
        <Loading />
        <AnnouncementBanner />
        <Navbar />
        <main style={{ minHeight: '60vh' }}>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
        <BackToTop />
      </body>
    </html>
  )
}
