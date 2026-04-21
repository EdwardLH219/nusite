import type { Metadata } from "next";
import { geistSans, geistMono } from "@/lib/fonts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PreviewModalProvider } from "@/components/preview-modal";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nusite.com"),
  title: {
    default: "NuSite — Your Business Deserves a Better First Impression",
    template: "%s — NuSite",
  },
  description:
    "NuSite transforms outdated business websites into modern, credible first impressions that build trust and drive enquiries. Free preview, no commitment.",
  keywords: [
    "website redesign",
    "business website",
    "professional website",
    "small business website",
    "modern website design",
  ],
  authors: [{ name: "NuSite" }],
  creator: "NuSite",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://nusite.com",
    siteName: "NuSite",
    title: "NuSite — Your Business Deserves a Better First Impression",
    description:
      "Transform your outdated website into a modern, credible first impression. Free preview, no commitment.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "NuSite — Professional website transformations for service businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NuSite — Your Business Deserves a Better First Impression",
    description:
      "Transform your outdated website into a modern, credible first impression. Free preview, no commitment.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <PreviewModalProvider>
          <Header />
          {children}
          <Footer />
        </PreviewModalProvider>
      </body>
    </html>
  );
}
