import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://birdpacks.com"),
  title: "Bird Pack | Premium Packaging Solutions",
  description:
    "Bird Pack showcases premium paper bags, cardboard boxes, food packaging, gift boxes, courier bags, bakery packaging, retail packaging, and custom printed packaging for modern businesses.",
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
    "Bird Pack",
  ],
  openGraph: {
    title: "Bird Pack",
    description: "Premium Packaging Solutions for Modern Businesses",
    type: "website",
    images: ["/images/products/customprint.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff1bd",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}



