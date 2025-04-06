import { CartProvider } from "@/components/cart/cart-context";
import { Navbar } from "@/components/layout/navbar";
import { GeistSans } from "geist/font/sans";
import { getCart, getMenu } from "@/lib/shopify";
import { ReactNode } from "react";
import * as fonts from "../fonts";
import "./globals.css";
import { baseUrl } from "@/lib/utils";
import Footer from "@/components/layout/footer/footer";
import { NewsletterModal } from "@/components/home/newsletter-modal";
const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
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
  // Don't await the fetch, pass the Promise to the context provider
  const headerMenu = await getMenu("frontend-header-menu");
  const navShopMenus = {
    Essentials: await getMenu("frontend-shop-base"),
    Productos: await getMenu("frontend-shop-products"),
    Colecciones: await getMenu("frontend-shop-collection"),
  };

  const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="text-white border-white bg-neutral-50 selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <CartProvider cartPromise={cart}>
          <Navbar menu={headerMenu} shopMenus={navShopMenus} />
          <main className={`${fonts.complementary.className} relative`}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
