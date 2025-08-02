import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sumalya Chatterjee - India's #1 Next.js & React.js Developer",
  description:
    "Professional web developer specializing in Next.js, React.js, and SEO optimization. Creator of web games with 200k+ plays and browser extensions with 4k+ daily users.",
  keywords:
    "Next.js developer, React.js developer, web developer India, SEO optimization, web games, browser extensions, frontend developer",
  authors: [{ name: "Sumalya Chatterjee" }],
  creator: "Sumalya Chatterjee",
  publisher: "Sumalya Chatterjee",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sumalya-portfolio.vercel.app",
    title: "Sumalya Chatterjee - India's #1 Next.js & React.js Developer",
    description: "Professional web developer specializing in Next.js, React.js, and SEO optimization.",
    siteName: "Sumalya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumalya Chatterjee - India's #1 Next.js & React.js Developer",
    description: "Professional web developer specializing in Next.js, React.js, and SEO optimization.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://sumalya-portfolio.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
