import { CartProvider } from "@/components/cart/cart-context";
import { Navbar } from "@/components/layout/navbar";
import { getCart, getMenu } from "@/lib/shopify";
import { ReactNode } from "react";
import * as fonts from "@/fonts";
import Footer from "@/components/layout/footer/footer";
import WhatsAppFloatingModal from "@/components/home/whatsapp-floating-modal";
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
      <Navbar menu={headerMenu} shopMenus={navShopMenus} />
    
      <main className={`${fonts.complementary.className} relative w-full`}>
        {children}
      </main>
      <WhatsAppFloatingModal whatsapp={process.env.WHATSAPP_CONTACT} />
      <Footer />
    </CartProvider>
  );
}
