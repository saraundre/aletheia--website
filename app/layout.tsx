import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aletheia',
  description: 'A government-aligned, research-driven EdTech ecosystem advancing equitable education, community impact, and innovation.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
