import { IlluminareSection } from "@/components/home/illuminare-section";
import NewsletterForm from "@/components/home/newsletter-form";
import ModalTrigger from "@/components/home/newsletter-modal";

import { type Metadata } from "next";
import { VoirVideoHeader } from "@/components/home/voir-video-header";
import { SITE } from "@/lib/seo";

const { SITE_NAME } = process.env;

export const metadata: Metadata = {
  title: `Oficcial Store – Premium Caps`,
  description:
    "En VOIR, cuando el camino se despeja la luz aparece. Diseñamos gorras premium inspiradas en cada fase del día y en la filosofía One Way. Descubre nuestras ediciones limitadas y suscríbete para acceder a la preventa.",
  robots: {
    follow: true,
    index: true,
  },
  alternates: {
    canonical: "/", // Sets the canonical URL for the homepage
  },
  openGraph: {
    url: `${SITE.url}`, // The canonical URL for Open Graph
    siteName: SITE_NAME,
    title: `${SITE.name} Oficcial Store – Premium Caps`,
    description:
      "Gorras de alta calidad con ediciones limitadas inspiradas en la luz de la colección Illuminare. Descubre VOIR y suscríbete para ser el primero en conocer el lanzamiento.",
    type: "website",
  },
};

export default async function HomePage() {
  return (
    <>
      <ModalTrigger />
      <VoirVideoHeader
        backgroundVideo="/resources/illuminare.mp4"
        backgroundImageSmall="https://picsum.photos/seed/mobile/768/1024"
      />
      <IlluminareSection />
      <NewsletterForm />
    </>
  );
}
