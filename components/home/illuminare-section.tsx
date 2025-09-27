import { logo } from "@/fonts";
import { Button } from "../ui/button";
import { ImageComparisonSlider } from "./image-slider";
import Link from "next/link";
export const IlluminareSection = () => {
  return (
    <section className="relative h-auto">
      <ImageComparisonSlider
        hAbove="https://cdn.shopify.com/s/files/1/0780/9122/3275/files/home-slider-left.jpg?v=1758944436"
        hBellow="https://cdn.shopify.com/s/files/1/0780/9122/3275/files/home-slider-right.jpg?v=1758944441"
        vImage="https://cdn.shopify.com/s/files/1/0780/9122/3275/files/IMG_7081.webp?v=1758670159"
      >
        {/* Content for the overlay */}
        <h2 className="text-xl mb-7 sm:text-2xl md:text-3xl font-bold tracking-tight drop-shadow-md">
          NEW COLLECTION
        </h2>
        <h1
          className={`${logo.className} relative my-[-60px] sm:my-[-80px] md:my-[-100px] text-[180px] sm:text-[200px] md:text-[220px] lg:text-[250px] drop-shadow-lg z-[1]`}
        >
          ILLUMINARE
        </h1>
        <Link
          href={"/shop/illuminare"}
          className="relative text-sm sm:text-md px-3 py-1.5 sm:px-4 sm:py-2 font-semibold mt-3 sm:mt-4 z-[100] cursor-pointer"
          passHref
        >
          <Button variant="secondary" className={`cursor-pointer z-[100]`}>
            Ver drop
          </Button>
        </Link>
      </ImageComparisonSlider>
    </section>
  );
};
