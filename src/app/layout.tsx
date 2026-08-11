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
    images: [{ url: "/hero-online-bible-degree.webp", width: 1672, height: 941 }],
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
      <body style={{ "--font-sans-site": "'Open Sans', Arial, Helvetica, sans-serif", "--font-serif-site": "'Arial Narrow', 'Helvetica Neue Condensed', Impact, sans-serif" } as React.CSSProperties}>
        <Header />
        {children}
        <CtaBand />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
