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
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight drop-shadow-md">NEW COLLECTION</h2>
        <h1
          className={`${logo.className} my-[-20px] sm:my-[-30px] md:my-[-40px] text-[80px] sm:text-[100px] md:text-[120px] lg:text-[150px] drop-shadow-lg`}
        >
          ILUMINARE
        </h1>
        <Link
          href={"/search/iluminare"}
          className="text-sm sm:text-md px-3 py-1.5 sm:px-4 sm:py-2 font-semibold mt-3 sm:mt-4 z-50"
          passHref
        >
          <Button variant="secondary">Conoce más</Button>
        </Link>
      </ImageComparisonSlider>
    </section>
  );
};
