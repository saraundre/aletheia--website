import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aletheia - Building research technologies that solve real-world problems',
  description: 'A collective of creative adults building brands and bridging communities through world-class artistry and technologies. Truth in tech, action in society.',
  keywords: ['Aletheia', 'technology', 'research', 'STEM', 'innovation', 'design', 'strategy'],
  authors: [{ name: 'Aletheia Collective' }],
  creator: 'Aletheia Collective',
  publisher: 'Aletheia Collective',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aletheia.sg'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Aletheia - Truth in Tech, Action in Society',
    description: 'Building research technologies that solve real-world problems. A collective of creative adults building brands and bridging communities.',
    url: 'https://aletheia.sg',
    siteName: 'Aletheia',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aletheia - Truth in Tech, Action in Society',
      },
    ],
    locale: 'en_SG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aletheia - Truth in Tech, Action in Society',
    description: 'Building research technologies that solve real-world problems.',
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
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 