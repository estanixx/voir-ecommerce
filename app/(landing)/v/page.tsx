import { baseUrl } from "@/lib/utils";
import LandingPage from "@/components/v/landing-page";


const { SITE_NAME } = process.env;

// Add JSON-LD structured data
export function generateMetadata() {
  return {
    title: `Coming Soon`,
    description: 'Voir is launching soon. Join our waitlist to be the first to know when we launch our new collection.',
    robots: {
      follow: true,
      index: true,
    },
    alternates: {
      canonical: `${baseUrl}/v`, // Sets the canonical URL for the landing page
    },
    openGraph: {
      url: `${baseUrl}/v`, // The canonical URL for Open Graph
      siteName: SITE_NAME,
      title: `Coming Soon`,
      description: 'Voir is launching soon. Join our waitlist to be the first to know when we launch our new collection.',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/opengraph-image`, // Your Open Graph image
          width: 1200,
          height: 630,
          alt: `The official logo and branding for ${SITE_NAME}`,
        },
      ],
    },
    other: {
      'application-name': SITE_NAME,
    }
  };
}

export default function VPage() {
  return (
    <>
      <LandingPage />
    </>
  );
}
