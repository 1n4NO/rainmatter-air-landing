import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rainmatter Air — Real-time air quality in your browser",
  description:
    "A free, open-source Chrome extension that keeps live air quality data one click away. Supports OpenAQ and OAQ (oaq.notf.in). Built for Indian cities.",
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
