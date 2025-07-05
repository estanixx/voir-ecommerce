import { CartProvider } from "@/components/cart/cart-context";
import { Navbar } from "@/components/layout/navbar";
import { GeistSans } from "geist/font/sans";
import { getCart, getMenu } from "@/lib/shopify";
import { ReactNode } from "react";
import * as fonts from "../fonts";
import "./globals.css";
import { baseUrl } from "@/lib/utils";
import Footer from "@/components/layout/footer/footer";
import clsx from "clsx";
// import { RegisterSW } from '../components/register-sw';
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
    <html lang="en" className={clsx(GeistSans.variable, '!p-0')}>
      {/* <RegisterSW /> */}
      <CartProvider cartPromise={cart}>
        <body className="bg-black !m-0 !p-0">
          {/* <BackgroundTransition /> */}
          <Navbar menu={headerMenu} shopMenus={navShopMenus} />
          <main className={`${fonts.complementary.className} relative w-full`}>
            {children}
          </main>
          <Footer />
        </body>
      </CartProvider>
    </html>
  );
}
