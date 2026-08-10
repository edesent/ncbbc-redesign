import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CtaBand, Footer, Header } from "@/components/SiteShell";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} | Online Bible College`,
    template: `%s | ${site.name}`,
  },
  description: "Online Baptist Bible college training students for faithful ministry through the local New Testament church.",
  openGraph: {
    title: site.fullName,
    description: "Bible-centered online ministry training in Brighton, Colorado.",
    url: site.url,
    siteName: site.fullName,
    images: [{ url: "/hero-campus.jpg", width: 1920, height: 957 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ "--font-sans-site": "Arial, Helvetica, sans-serif", "--font-serif-site": "Georgia, 'Times New Roman', serif" } as React.CSSProperties}>
        <Header />
        {children}
        <CtaBand />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
