import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Syne } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { OrganizationJsonLd } from "@/components/JsonLd";
import SubscribeBar from "@/components/SubscribeBar";
import AnchorScroll from "@/components/shared/AnchorScroll";
import CookieConsent from "@/components/consent/CookieConsent";
import TermsGate from "@/components/consent/TermsGate";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const syne = Syne({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: "Big Machine Records | Independent Nashville Label",
    template: "%s | Big Machine Records",
  },
  description:
    "Big Machine Records is an independent Nashville label home to Riley Green, Rascal Flatts, Aaron Lewis, The Band Perry, Mackenzie Carpenter, and more.",
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Big Machine Records",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Big Machine Records",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OrganizationJsonLd />
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <AnchorScroll />
        <Header />
        <PageTransition>
          <main id="main-content" className="flex-1">{children}</main>
        </PageTransition>
        <SubscribeBar />
        <Footer />
        {/* Cookie consent banner. Shows once per new visitor, persisted in
            localStorage; injects nothing before consent is granted. */}
        <CookieConsent />
        {/* Arbitration / class-action notice, shown once right after the cookie
            decision so it is never buried only in the footer. */}
        <TermsGate />
      </body>
    </html>
  );
}
