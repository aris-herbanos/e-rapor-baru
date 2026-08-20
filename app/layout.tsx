import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ulilalbab.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "E-Rapor Ulil Albab Al Islami",
    template: "%s | E-Rapor Ulil Albab Al Islami",
  },

  description:
    "E-Rapor Ulil Albab Al Islami adalah sistem rapor digital terpadu untuk pengelolaan penilaian santri, asesmen pembelajaran, tahfidz Al-Qur'an, kehadiran, akhlak, kepribadian, dan administrasi akademik pesantren.",

  applicationName: "E-Rapor Ulil Albab Al Islami",

  generator: "Next.js",

  keywords: [
    "E-Rapor",
    "E-Rapor Pesantren",
    "Rapor Digital Pesantren",
    "Rapor Digital Santri",
    "Sistem Akademik Pesantren",
    "Sistem Penilaian Santri",
    "Aplikasi Rapor Santri",
    "Aplikasi Pesantren",
    "Sistem Informasi Pesantren",
    "Penilaian Santri",
    "Tahfidz Al-Qur'an",
    "Akhlak Santri",
    "Pondok Pesantren",
    "Ulil Albab Al Islami",
  ],

  authors: [
    {
      name: "Pondok Pesantren Ulil Albab Al Islami",
    },
  ],

  creator: "Pondok Pesantren Ulil Albab Al Islami",

  publisher: "Pondok Pesantren Ulil Albab Al Islami",

  category: "education",

  classification: "Educational Technology",

  referrer: "origin-when-cross-origin",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: [
      {
        url: "/logo.png",
        type: "image/png",
      },
    ],

    shortcut: "/logo.png",

    apple: [
      {
        url: "/logo.png",
        type: "image/png",
      },
    ],
  },

  manifest: "/manifest.json",

  openGraph: {
    type: "website",

    locale: "id_ID",

    url: siteUrl,

    siteName: "E-Rapor Ulil Albab Al Islami",

    title: "E-Rapor Ulil Albab Al Islami",

    description:
      "Sistem rapor digital terpadu untuk pengelolaan akademik, penilaian santri, tahfidz Al-Qur'an, kehadiran, akhlak, dan kepribadian di Pondok Pesantren Ulil Albab Al Islami.",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "E-Rapor Ulil Albab Al Islami",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "E-Rapor Ulil Albab Al Islami",

    description:
      "Sistem rapor digital terpadu Pondok Pesantren Ulil Albab Al Islami.",

    images: ["/opengraph-image"],
  },

  appleWebApp: {
    capable: true,
    title: "E-Rapor",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  maximumScale: 1,

  viewportFit: "cover",

  themeColor: "#059669",

  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Theme */}
        <meta
          name="theme-color"
          content="#059669"
        />

        {/* Mobile */}
        <meta
          name="mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />

        <meta
          name="apple-mobile-web-app-title"
          content="E-Rapor"
        />
      </head>

      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}