import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-body',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Smart Factory - AI-Driven Consulting for Visionary Leaders",
  description: "Transforming Human Potential into Business Reality. Smart Factory is the premier AI and technology consulting partner for upper mid-size and early enterprise companies.",
  keywords: "AI consulting, enterprise AI implementation, fractional technology leadership, AI Accelerator, C-level digital transformation, AI for enterprise",
  openGraph: {
    title: "Smart Factory - AI-Driven Consulting for Visionary Leaders",
    description: "Transforming Human Potential into Business Reality. Smart Factory is the premier AI and technology consulting partner for upper mid-size and early enterprise companies.",
    url: "https://smartfactory.io",
    siteName: "Smart Factory",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Factory - AI-Driven Consulting for Visionary Leaders",
    description: "Transforming Human Potential into Business Reality. Smart Factory is the premier AI and technology consulting partner for upper mid-size and early enterprise companies.",
  },
  alternates: {
    canonical: "https://smartfactory.io/"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QRE5CDWV09"></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QRE5CDWV09');`
        }} />
      </head>
      <body>
        <div className="container">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
