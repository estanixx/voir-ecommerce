import { CartProvider } from "@/components/cart/cart-context";
import { Navbar } from "@/components/layout/navbar";
import { getCart, getMenu } from "@/lib/shopify";
import { ReactNode } from "react";
import * as fonts from "@/fonts";
import Footer from "@/components/layout/footer/footer";
import { SITE } from "@/lib/seo";
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

  const ldWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE.url,
    name: SITE.name,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/shop?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const ldOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${SITE.logo}`,
    sameAs: [
      SITE.twitter
        ? `https://twitter.com/${SITE.twitter.replace("@", "")}`
        : undefined,
      SITE.instagram
        ? `https://www.instagram.com/${SITE.instagram}`
        : undefined,
    ].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: SITE.email,
        contactType: "customer support",
        areaServed: "CO",
        availableLanguage: ["es"],
      },
    ],
  };
  return (
    <CartProvider cartPromise={cart}>
      {/* <BackgroundTransition /> */}
      <Navbar menu={headerMenu} shopMenus={navShopMenus} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldWebsite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldOrg) }}
      />
      <main className={`${fonts.complementary.className} relative w-full`}>
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}
