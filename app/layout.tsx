import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Murray Partners 4 Prevention | Building a Stronger, Safer Community",
  description: "A connected and compassionate Murray where all residents are empowered to thrive, grow, and build a stronger, safer community together. Supporting Residents, Connecting Families, Empowering Youth.",
  keywords: ["Murray Partners 4 Prevention", "P4P", "Murray Utah", "Community Coalition", "Prevention", "Youth Empowerment", "Family Support"],
  authors: [{ name: "Murray Partners 4 Prevention" }],
  icons: {
    icon: [
      { url: '/images/p4p-logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/p4p-logo.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Murray Partners 4 Prevention",
    description: "Building a stronger, safer community together in Murray, Utah",
    url: "https://murrayp4p.com",
    siteName: "Murray Partners 4 Prevention",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Murray Partners 4 Prevention",
    description: "Building a stronger, safer community together in Murray, Utah",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} ${openSans.variable} antialiased min-w-full`}>
        {/* Aurora Background */}
        <div className="aurora-bg" aria-hidden="true" />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="min-w-full flex flex-col items-center relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
