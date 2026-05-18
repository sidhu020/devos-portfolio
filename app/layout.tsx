import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devos-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "DevOS | Siddharth — Developer Portfolio",
    template: "%s | DevOS",
  },
  description:
    "Interactive developer operating system portfolio. A command-driven, terminal-powered experience built with Next.js, TypeScript, and Framer Motion.",
  keywords: [
    "developer portfolio",
    "interactive portfolio",
    "DevOS",
    "full stack developer",
    "Next.js portfolio",
    "terminal portfolio",
    "MCA student",
    "TypeScript",
    "React",
  ],
  authors: [{ name: "Siddharth" }],
  creator: "Siddharth",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "DevOS",
    title: "DevOS | Interactive Developer Portfolio",
    description:
      "A futuristic, command-driven portfolio built like a minimal operating system. Terminal navigation, command palette, and interactive UI.",
  },

  twitter: {
    card: "summary_large_image",
    title: "DevOS | Interactive Developer Portfolio",
    description:
      "A futuristic, command-driven portfolio built like a minimal operating system.",
    creator: "@your_twitter",
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

  other: {
    "color-scheme": "dark",
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

/** JSON-LD structured data for search engines */
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Siddharth",
    url: BASE_URL,
    jobTitle: "Full Stack Developer",
    description:
      "MCA student and full-stack developer focused on web, UI systems, and performance.",
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "UI Engineering",
      "Web Performance",
    ],
    sameAs: [
      "https://github.com/sidhu020",
      "https://www.linkedin.com/in/siddharthborisagar/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full bg-devos-bg text-devos-text">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
