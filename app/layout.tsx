import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://oyatz.com'), // Update with your domain
  title: {
    default: 'OYATZ Hair | Expert Hair Styling & Color',
    template: '%s | OYATZ Hair',
  },
  description: 'Professional hair styling services specializing in braids, locks, and natural hair. Transform your look with expert styling.',
  keywords: ['hair styling', 'braids', 'locks', 'retwists', 'colored braids', 'natural hair', 'hair braiding'],
  authors: [{ name: 'OYATZ Hair' }],
  creator: 'OYATZ Hair',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oyatz.com',
    title: 'OYATZ Hair | Expert Hair Styling & Color',
    description: 'Professional hair styling services specializing in braids, locks, and natural hair. Transform your look with expert styling.',
    siteName: 'OYATZ Hair',
    images: [
      {
        url: '/og-image.jpg', // Add your OG image
        width: 1200,
        height: 630,
        alt: 'OYATZ Hair',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OYATZ Hair | Expert Hair Styling & Color',
    description: 'Professional hair styling services specializing in braids, locks, and natural hair.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        {/* EmailJS for automatic email sending */}
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
          async
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  window.addEventListener('load', function() {
                    if (window.emailjs) {
                      window.emailjs.init('YOUR_PUBLIC_KEY_HERE'); // Replace with your EmailJS Public Key
                    }
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

