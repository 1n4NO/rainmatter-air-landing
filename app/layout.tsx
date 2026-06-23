import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rainmatter Air — Real-time air quality in your browser",
  description:
    "A free, open-source Chrome extension that keeps live air quality data one click away. Supports OpenAQ and OAQ (oaq.notf.in). Built for Indian cities.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-128.png",       sizes: "128x128", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "48x48", type: "image/png" },
  },
  openGraph: {
    title: "Rainmatter Air",
    description: "Live air quality in your Chrome toolbar. Free and open source.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rainmatter Air",
    description: "Live air quality in your Chrome toolbar. Free and open source.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
