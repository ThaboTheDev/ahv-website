import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { INSTITUTION } from "@content/global";

const SITE_URL = "https://africanhiddenvoices.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${INSTITUTION.name} · An independent research institution`,
    template: `%s · ${INSTITUTION.abbreviation} Research Institution`,
  },
  description: INSTITUTION.description,
  keywords: [
    "African Hidden Voices",
    "AHV Research Institution",
    "African Indigenous Spirituality",
    "AIS",
    "Ezomoya Zakwantu",
    "Imboni",
    "Iimboni Database",
    "African Indigenous Spirituality research",
  ],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: INSTITUTION.name,
    title: INSTITUTION.name,
    description: INSTITUTION.description,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    site: "@african_voices",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA">
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main"
          className="sr-only-focusable focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-sm focus:bg-brand-800 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-paper focus:[clip:auto]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
