import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CosmicBadge from '@/components/CosmicBadge';
import JsonLd from '@/components/JsonLd';

const SITE_URL = 'https://ninja-cooks.cosmic.site';
const SITE_NAME = 'Ninja Cooks Dojo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ninja Cooks Dojo — Learn. Cook. Conquer.',
    template: '%s — Ninja Cooks Dojo',
  },
  description:
    'A place for people to learn and cook together. Join the Ninja Cooks dojo and be a warrior for justice and flavor.',
  keywords: ['cooking courses', 'online cooking school', 'culinary arts', 'ninja cooks', 'cooking classes'],
  authors: [{ name: 'Ninja Cooks Dojo' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: 'Ninja Cooks Dojo — Learn. Cook. Conquer.',
    description:
      'A place for people to learn and cook together. Join the Ninja Cooks dojo and be a warrior for justice and flavor.',
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: 'Ninja Cooks Dojo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ninja Cooks Dojo — Learn. Cook. Conquer.',
    description:
      'A place for people to learn and cook together. Join the Ninja Cooks dojo and be a warrior for justice and flavor.',
  },
};

// Site-wide Organization + WebSite schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  sameAs: [],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/courses?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🥷</text></svg>"
        />
        <script src="/dashboard-console-capture.js" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="font-sans antialiased min-h-screen bg-dojo-bg text-ninja-100">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}
