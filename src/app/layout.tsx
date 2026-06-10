import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Syne } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { OrganizationJsonLd } from "@/components/JsonLd";
import SubscribeBar from "@/components/SubscribeBar";

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
        <Header />
        <PageTransition>
          <main id="main-content" className="flex-1">{children}</main>
        </PageTransition>
        <SubscribeBar />
        <Footer />
      </body>
    </html>
  );
}
