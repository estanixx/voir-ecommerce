import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import "./globals.css";
import clsx from "clsx";

import { PasscodeProvider } from "@/components/shared/passcode-context";
import { SITE } from "@/lib/seo";
import { Viewport } from "next";
import { Toaster } from "@/components/ui/sonner";
import Head from "next/head";
export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `${SITE.name} %s`,
  },
  description: SITE.description,
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter || undefined,
    creator: SITE.twitter || undefined,
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
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
  icons: { icon: "/favicon.ico" },
  category: "ecommerce",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const localStorageKey = process.env.PASSCODE_LOCALSTORAGE_KEY!;
  const passcodeValue = process.env.PREACCESS_CODE;
  if (!localStorageKey || !passcodeValue)
    throw new Error("Error de variables de entorno.");
  return (
    <PasscodeProvider
      localStorageKey={localStorageKey}
      passcodeValue={passcodeValue}
    >
      <html
        lang="en"
        translate="no"
        className={clsx(GeistSans.variable, "!p-0")}
      >
        <Head>
          <meta property="og:image" content="<generated>" />
          <meta property="og:image:type" content="<generated>" />
          <meta property="og:image:width" content="<generated>" />
          <meta property="og:image:height" content="<generated>" />
        </Head>
        <body className="bg-black !m-0 !p-0">
          {children}
          <Toaster />
        </body>
      </html>
    </PasscodeProvider>
  );
}
