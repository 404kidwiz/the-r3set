import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsSetup from "@/components/AnalyticsSetup";
import AxeCore from "@/components/AxeCore";
import LenisProvider from "@/components/LenisProvider";

// Primary body font
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-body',
  display: 'swap',
});

// Monospace font for metadata/dates
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "THE R3SET - Mike Will Made-It",
  description: "Experience the new era by Mike Will Made-It. Grammy-winning producer behind hits for Beyoncé, Kendrick Lamar, and Rihanna. THE R3SET drops 2026.",
  keywords: ["Mike WiLL Made-It", "THE R3SET", "hip-hop producer", "Eardrummer Records", "Grammy producer"],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "THE R3SET - Mike Will Made-It",
    description: "Experience the new era by Mike Will Made-It",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE R3SET - Mike Will Made-It",
    description: "Experience the new era by Mike Will Made-It",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preload Bebas Neue display font (loaded via CSS) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased" style={{ fontFamily: 'var(--font-body)' }}>
        <LenisProvider>
          <AnalyticsSetup />
          <AxeCore />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
