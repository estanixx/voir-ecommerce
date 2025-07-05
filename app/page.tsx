import { VoirHeader } from "@/components/home/voir-header";
import { IlluminareSection } from "@/components/home/illuminare-section";
import NewsletterForm from "@/components/home/newsletter-form";
import { ProductImages } from "@/components/home/product-images";
import ModalTrigger from '@/components/home/newsletter-modal';

import { type Metadata } from 'next';

const { SITE_NAME } = process.env;

export const metadata: Metadata = {
  title: `${SITE_NAME} | One Way`,
  description:
    "Discover Voir, a fashion-forward brand dedicated to clarity, vision, and progress. Explore our curated collections, including the latest 'Illuminare' line, and find your way forward in style.",
  robots: {
    follow: true,
    index: true
  },
  alternates: {
    canonical: '/' // Sets the canonical URL for the homepage
  },
  openGraph: {
    url: '/', // The canonical URL for Open Graph
    siteName: SITE_NAME,
    title: `${SITE_NAME} | One Way`,
    description: 'Discover Voir, a fashion-forward brand dedicated to clarity, vision, and progress.',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.tsx', // Your Open Graph image file
        width: 1200,
        height: 630,
        alt: `The official logo and branding for Voir`
      }
    ]
  }
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
