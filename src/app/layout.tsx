import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Michroma } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header";
import SkipNav from "@/components/skip-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { jsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { metadataBaseUrl } from "@/lib/utils";

// Body and headings. A variable font, so every weight between 400 and 700
// comes from one file.
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

// Extended display face, used only for the wordmark and the hero name.
const michroma = Michroma({
  subsets: ["latin"],
  variable: "--font-michroma",
  weight: "400",
});

const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
const siteDescription = process.env.NEXT_PUBLIC_SITE_META_DESCRIPTION;

export const metadata: Metadata = {
  description: siteDescription,
  metadataBase: metadataBaseUrl,
  openGraph: {
    description: siteDescription,
    locale: "en_US",
    siteName,
    title: siteName,
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  publisher: siteName,
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: siteName ?? "",
    template: `%s | ${siteName}`,
  },
  twitter: {
    card: "summary_large_image",
    description: siteDescription,
    title: siteName,
  },
};

// Mobile browser chrome matches the field, so the frame runs edge to edge.
export const viewport: Viewport = {
  themeColor: [
    { color: "#ff4a1c", media: "(prefers-color-scheme: light)" },
    { color: "#141210", media: "(prefers-color-scheme: dark)" },
  ],
};

/**
 * Root layout component for the entire application
 * @param children - Child components to render
 * @returns Root layout with theme provider and global components
 */
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${instrumentSans.variable} ${michroma.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipNav />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        {/* JSON-LD — see lib/schema.ts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(organizationSchema),
          }}
        />
      </body>
    </html>
  );
};

RootLayout.displayName = "RootLayout";

export default RootLayout;
