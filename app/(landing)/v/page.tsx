import LandingPage from "@/components/v/landing-page";
import { SITE } from "@/lib/seo";



// Add JSON-LD structured data
export function generateMetadata() {
  return {
    title: `| Coming Soon`,
    description: 'El camino está a punto de despejarse y la luz está por aparecer. Muy pronto descubrirás VOIR, la marca de gorras premium con ediciones limitadas que marcan tu estilo. Suscríbete hoy y sé el primero en acceder a la preventa.',
    robots: {
      follow: true,
      index: true,
    },
    alternates: {
      canonical: `${SITE.url}/v`, // Sets the canonical URL for the landing page
    },
    openGraph: {
      url: `${SITE.url}/v`, // The canonical URL for Open Graph
      siteName: SITE.name,
      title: `| Coming Soon`,
      description: 'El camino está a punto de despejarse y la luz está por aparecer. Muy pronto descubrirás VOIR, la marca de gorras premium con ediciones limitadas que marcan tu estilo. Suscríbete hoy y sé el primero en acceder a la preventa.',
      type: 'website',
      images: [
        {
          url: `${SITE.url}/opengraph-image`, // Your Open Graph image
          width: 1200,
          height: 630,
          alt: `The official logo and branding for ${SITE.name}`,
        },
      ],
    },
    other: {
      'application-name': SITE.name,
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
