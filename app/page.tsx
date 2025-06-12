import { VoirHeader } from "@/components/home/voir-header";
import { IlluminareSection } from "@/components/home/illuminare-section";
import NewsletterForm from "@/components/home/newsletter-form";
import { ProductImages } from "@/components/home/product-images";
import ModalTrigger from '@/components/home/newsletter-modal';

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  return (
    <>
      {/* <ThreeItemGrid />
      <Carousel /> */}
      <ModalTrigger />
      <VoirHeader
        backgroundImageLarge="https://picsum.photos/seed/ppp/1920/1080"
        backgroundImageSmall="https://picsum.photos/seed/mobile/768/1024"
        // breakpoint={640} // Optionally override the default 768px breakpoint
      />
      <IlluminareSection />
      <ProductImages />
      <NewsletterForm />
      {/* <Carousel cols={4} collection={"Illuminare"} className="mt-2 px-1" /> */}
      {/* <NextCollectionSection />
        <HomeImages /> */}
    </>
  );
}
