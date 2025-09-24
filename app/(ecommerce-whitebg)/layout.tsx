import { CartProvider } from "@/components/cart/cart-context";
import { InvertedNavbar } from "@/components/layout/navbar/inverted-navbar";
import { getCart, getMenu } from "@/lib/shopify";
import { ReactNode } from "react";
import * as fonts from "@/fonts";
import InvertedFooter from "@/components/layout/footer/inverted-footer";
// import { RegisterSW } from '../components/register-sw';

export default async function EcommerceLayout({
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
    <CartProvider cartPromise={cart}>
      {/* <BackgroundTransition /> */}
      <InvertedNavbar menu={headerMenu} shopMenus={navShopMenus} />

      <main className={`${fonts.complementary.className} relative w-full bg-white text-black min-h-screen`}>
        {children}
      </main>
      <InvertedFooter />
    </CartProvider>
  );
}
