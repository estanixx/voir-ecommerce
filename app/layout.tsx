import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import "./globals.css";
import clsx from "clsx";

import { baseUrl } from "@/lib/utils";
import { PasscodeProvider } from "@/components/shared/passcode-context";
const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `${SITE_NAME} | %s`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const localStorageKey = process.env.PASSCODE_LOCALSTORAGE_KEY!
  const passcodeValue = process.env.PREACCESS_CODE
  if(!localStorageKey || !passcodeValue) throw new Error('Malo hhh');
  return (
    <PasscodeProvider localStorageKey={localStorageKey} passcodeValue={passcodeValue}>
    <html lang="en" translate="no" className={clsx(GeistSans.variable, "!p-0")}>
      <body className="bg-black !m-0 !p-0">{children}</body>
    </html>
    </PasscodeProvider>
  );
}
