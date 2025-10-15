import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexusaudit.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NexusAudit: Web Security & AI Readiness Analyzer",
    template: "%s | NexusAudit",
  },
  description: "Free, instant web security header scanner, SEO analysis, and AI Readiness Score (GEO). Test your website's security and optimization with our advanced LLM-powered tool.",
  keywords: [
    "Security Headers",
    "Security Scan",
    "SEO Analysis",
    "AI Readiness",
    "Website Security",
    "CSP Analyzer",
    "Free SEO Tool",
    "NexusAudit",
    "GEO Score",
    "Website Analyzer",
    "تحليل أمان المواقع",
    "فحص SEO",
    "جاهزية الذكاء الاصطناعي",
  ],
  authors: [{ name: "NexusAudit" }],
  creator: "NexusAudit Team",
  publisher: "NexusAudit",
  openGraph: {
    title: "NexusAudit: Web Security & AI Readiness Analyzer",
    description: "Advanced security header scanning, SEO analysis, and AI Readiness Score powered by advanced LLM models.",
    url: siteUrl,
    siteName: "NexusAudit",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "NexusAudit - Web Security and AI Readiness Analysis",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusAudit: Web Security & AI Readiness Analyzer",
    description: "Advanced security header scanning, SEO analysis, and AI Readiness Score powered by advanced LLM models.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteUrl}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Source+Code+Pro:wght@400;500&family=Cairo:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-gradient-to-br from-gray-950 via-[#1F2937] to-gray-950">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
