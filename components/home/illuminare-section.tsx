import { logo } from "@/fonts";
import { Button } from "../ui/button";
import { ImageComparisonSlider } from "./image-slider";
import Link from "next/link";
export const IlluminareSection = () => {
  return (
    <section className="relative  h-auto">
      <ImageComparisonSlider
        hAbove="https://picsum.photos/seed/h_above/1600/900"
        hBellow="https://picsum.photos/seed/h_bellow/1600/900"
        vImage="https://picsum.photos/seed/v_above/900/1600"
      >
        {/* Content for the overlay */}
        <h2 className="text-xl mb-7 sm:text-2xl md:text-3xl font-bold tracking-tight drop-shadow-md">
          NEW COLLECTION
        </h2>
        <h1
          className={`${logo.className} my-[-60px] sm:my-[-80px] md:my-[-100px] text-[180px] sm:text-[200px] md:text-[220px] lg:text-[250px] drop-shadow-lg`}
        >
          ILUMINARE
        </h1>
        <Link
          href={"/shop/iluminare"}
          className="text-sm sm:text-md px-3 py-1.5 sm:px-4 sm:py-2 font-semibold mt-3 sm:mt-4 z-50 cursor-pointer"
          passHref
        >
          <Button variant="secondary" className={`cursor-pointer`}>
            Ver drop
          </Button>
        </Link>
      </ImageComparisonSlider>
    </section>
  );
};
