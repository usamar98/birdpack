import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://birdpacks.com"),
  title: "BirdPacks | Premium Packaging Solutions",
  description:
    "BirdPacks showcases premium paper bags, cardboard boxes, food packaging, gift boxes, courier bags, bakery packaging, retail packaging, and custom printed packaging for modern businesses.",
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
    "BirdPacks",
  ],
  openGraph: {
    title: "BirdPacks",
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
  themeColor: "#f2d875",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}



