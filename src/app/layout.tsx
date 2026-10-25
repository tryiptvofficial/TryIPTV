
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import dynamic from "next/dynamic";
import "./globals.css";
import { cn } from "@/lib/utils";

const LazyToaster = dynamic(() => import("@/components/ui/lazy-toaster").then((mod) => mod.LazyToaster));
const ContactSheet = dynamic(() => import("@/components/shared/ContactSheet").then((mod) => mod.ContactSheet));
import { Analytics } from "@/components/shared/Analytics";
import { Schema } from "@/components/shared/Schema";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schema";
import { SITE_URL, siteConfig } from "@/lib/site-config";

export const viewport: Viewport = {
  themeColor: [
    // Dark-only site: tint the browser UI with the page background (#040506) in both OS themes.
    { media: '(prefers-color-scheme: light)', color: '#040506' },
    { media: '(prefers-color-scheme: dark)', color: '#040506' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  // Required for env(safe-area-inset-*) to report real values on notched devices.
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Best IPTV Service 2026 | 24-Hour Free Trial | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  keywords: [
    'IPTV service',
    'IPTV provider',
    'IPTV subscription',
    'IPTV plans',
    '24-hour IPTV free trial',
    'live TV streaming',
    'sports IPTV',
    '4K IPTV',
    'IPTV USA',
    'IPTV UK',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${SITE_URL}/`,
    siteName: siteConfig.name,
    title: `Best IPTV Service 2026 | 24-Hour Free Trial | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Best IPTV Service`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tryiptv',
    title: `Best IPTV Service 2026 | 24-Hour Free Trial | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
    google: [
      'WayUe3dolb9UPFpMPHfTYy8CS-T1RkpFYqGvAkW5XqI',
      '-sJ-uRB_Ep3-Ba0pMU8MYHwpEuYclX_xQpwzWAENQc4',
    ],
    yandex: '4cafd334f7cdc146',
    other: {
      'msvalidate.01': 'CEC29E9356C1B062CC9637E64D68C778',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <html lang="en" suppressHydrationWarning className={cn("dark font-body antialiased")}>
       <head>
          <link
            rel="describedby"
            href="https://www.tryiptv.com/llms.txt"
            type="text/markdown"
          />
          <Schema id="organization" schema={generateOrganizationSchema()} />
          <Schema id="website" schema={generateWebSiteSchema()} />
        </head>
      <body>
        <Analytics />
        {isProduction ? (
          <Script
            src="https://analytics.ahrefs.com/analytics.js"
            id="ahrefs-analytics"
            strategy="lazyOnload"
          />
        ) : null}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-viewport flex-col">
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
            >
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content" className="flex-grow">{children}</main>
            <Footer />
          </div>
          <ContactSheet />
          <LazyToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
