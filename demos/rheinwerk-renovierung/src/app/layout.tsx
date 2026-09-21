import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rheinwerk-renovierung.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "RheinWerk Renovierung | Renovierung & Fliesenarbeiten Mannheim",
  description: "Concept-Website für einen modernen Renovierungsbetrieb in Mannheim – Badsanierung, Fliesenarbeiten, Bodenverlegung und Innenrenovierung.",
  applicationName: "RheinWerk Renovierung",
  keywords: ["Renovierung Mannheim", "Badsanierung Mannheim", "Fliesenarbeiten", "Innenrenovierung", "Rhein-Neckar"],
  alternates: { canonical: "/" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  openGraph: { type: "website", locale: "de_DE", url: "/", siteName: "RheinWerk Renovierung", title: "RheinWerk Renovierung | Concept Project", description: "Premium Konzept-Website für Renovierung, Badsanierung und Innenausbau in Mannheim." },
  twitter: { card: "summary", title: "RheinWerk Renovierung | Concept Project", description: "Premium Konzept-Website für Renovierung und Innenausbau in Mannheim." },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#d8ccba", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "WebSite", name: "RheinWerk Renovierung – Concept Project", url: siteUrl, description: "Fiktives Portfolio-Konzept für einen Renovierungsbetrieb in Mannheim.", isPartOf: { "@type": "CreativeWork", name: "LinkedLab Portfolio Concept" } };
  return <html lang="de"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
