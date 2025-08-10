import { IlluminareSection } from "@/components/home/illuminare-section";
import NewsletterForm from "@/components/home/newsletter-form";
import ModalTrigger from "@/components/home/newsletter-modal";

import { type Metadata } from "next";
import { VoirVideoHeader } from "@/components/home/voir-video-header";

const { SITE_NAME } = process.env;

export const metadata: Metadata = {
  title: `One Way`,
  description:
    "Discover Voir, a fashion-forward brand dedicated to clarity, vision, and progress. Explore our curated collections, including the latest 'Illuminare' line, and find your way forward in style.",
  robots: {
    follow: true,
    index: true,
  },
  alternates: {
    canonical: "/", // Sets the canonical URL for the homepage
  },
  openGraph: {
    url: "/", // The canonical URL for Open Graph
    siteName: SITE_NAME,
    title: `One Way`,
    description:
      "Discover Voir, a fashion-forward brand dedicated to clarity, vision, and progress.",
    type: "website",
    images: [
      {
        url: "/opengraph-image.tsx", // Your Open Graph image file
        width: 1200,
        height: 630,
        alt: `The official logo and branding for Voir`,
      },
    ],
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
