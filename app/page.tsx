import { Carousel } from "@/components/carousel";
// import { ThreeItemGrid } from '@/components/grid/three-items';
import Footer from "@/components/layout/footer/footer";
import Link from "next/link";
import { NextCollectionSection } from "@/components/home/next-collection-section";
import * as fonts from "@/fonts";
import LogoIcon from "@/components/icons/logo";
import { HomeImages } from "@/components/home/home-images";
import { Button } from "@/components/ui/button";

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
      
      <section className="flex flex-col items-center justify-center h-screen text-white">
        <h1 className={`${fonts.logo.className} text-[120px]`}>VOIR</h1>
        <LogoIcon className="size-32 mt-[-70px]" />
      </section>

      <section className="flex flex-col items-center justify-center text-white">
        <h1 className={`text-xl text-center font-bold`}>NEW COLLECTION</h1>
        <h1
          className={` ${fonts.logo.className} my-[-50px] text-[150px] text-center`}
        >
          ILUMINARE
        </h1>
        <p className="text-sm w-1/2 flex flex-col">
          Iluminare es un viaje, un reflejo del alma en constante evolución. Es
          el amanecer que te susurra nuevos comienzos, el día que te impulsa a
          brillar sin miedo, el atardecer que te envuelve en gratitud y la noche
          que te invita a soñar más alto.
          <Link
            href={"/search/iluminare"}
            className={`text-md px-2 py-1 self-end font-semibold mr-3`}
          >
            <Button variant="secondary">Conoce más</Button>
          </Link>
        </p>
        {/* <Carousel cols={4} collection={"Illuminare"} className="mt-2 px-1" /> */}
        <NextCollectionSection />
        <HomeImages />
      </section>
    </>
  );
}
