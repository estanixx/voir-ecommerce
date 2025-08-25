// app/seo.config.ts
export const SITE = {
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
  name: process.env.SITE_NAME || "VOIR",
  description:
    "Explora nuestra tienda online y descubre gorras premium, accesorios y ediciones limitadas. Compra con confianza y recibe tu pedido en cualquier ciudad de Colombia con envíos rápidos y seguros.",
  locale: "es_CO", // o es_ES / es_LA
  twitter: "voir", // sin @ si no tienes, déjalo vacío
  instagram: "voir.ow",
  email: "hola@tusitio.com",
  logo: "/logo.svg", // en /public
  ogImage: "/opengraph-image", // ya tienes rutas OG en tu proyecto
  currency: "COP",
};

export const SOCIAL_MEDIA = {
  whatsapp: "https://wa.me/+573012317387",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  x: "https://x.com",
};
