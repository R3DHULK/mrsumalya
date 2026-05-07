import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space'
})

export const metadata: Metadata = {
  title: 'Sumalya Studios | Game Developer',
  description: 'Hi, I am Sumalya Chatterjee, a passionate game developer creating engaging browser games. Explore my portfolio of 35+ games with over 272,000 total plays.',
  keywords: ['game developer', 'browser games', 'Y8 games', 'indie games', 'Sumalya Chatterjee'],
  authors: [{ name: 'Sumalya Chatterjee' }],
  openGraph: {
    title: 'Sumalya Studios | Game Developer',
    description: 'Explore the portfolio of Sumalya Chatterjee - 35+ browser games with over 272,000 total plays',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
