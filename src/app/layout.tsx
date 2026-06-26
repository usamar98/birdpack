import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://packorapackaging.example"),
  title: "Packora Packaging | Premium Packaging Solutions",
  description:
    "Packora Packaging showcases premium paper bags, cardboard boxes, food packaging, gift boxes, courier bags, bakery packaging, retail packaging, and custom printed packaging for modern businesses.",
  keywords: [
    "packaging products",
    "custom packaging",
    "paper bags",
    "cardboard boxes",
    "food packaging",
    "gift boxes",
    "courier bags",
    "bakery packaging",
    "retail packaging",
    "Packora Packaging",
  ],
  openGraph: {
    title: "Packora Packaging",
    description: "Premium Packaging Solutions for Modern Businesses",
    type: "website",
    images: ["/images/packora-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ff5a0a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}



