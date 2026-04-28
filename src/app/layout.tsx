import type { Metadata } from "next";
import { Bebas_Neue, Syne } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const syne = Syne({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Big Machine Records",
    template: "%s | Big Machine Records",
  },
  description:
    "Big Machine Records is an independent Nashville label home to Riley Green, Rascal Flatts, Aaron Lewis, Motley Crue, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Big Machine Records",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
