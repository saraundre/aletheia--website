import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aletheia',
  description: 'Aletheia website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
