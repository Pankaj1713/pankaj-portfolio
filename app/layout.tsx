import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Pankaj Thakur - Frontend Developer',
  description: 'SDE-2 Frontend Developer | React | Next.js | 4+ Years Experience | Florasense (Shark Tank)',
  generator: 'v0.app',
  keywords: 'frontend developer, react, next.js, web development, portfolio',
  authors: [{ name: 'Pankaj Thakur' }],
  openGraph: {
    title: 'Pankaj Thakur - Frontend Developer',
    description: 'SDE-2 Frontend Developer with 4+ years of experience',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className=" scroll-smooth">
      <body className="antialiased ">
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
