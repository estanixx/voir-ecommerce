"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Product } from "@/lib/shopify/types";
import { VerticalVideoPlayer } from "./video-player";
import { GridTileImage } from "../grid/tile";
import { ProductDescription } from "./product-description";

gsap.registerPlugin(ScrollTrigger);

export function ProductDetails({ product }: { product: Product }) {
  const container = useRef(null);

  useGSAP(
    () => {
      // Animate the image/video and the description blocks
      gsap.fromTo(
        ".product-detail-animate",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2, // Stagger the description slightly after the image
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="mt-5 lg:mt-10 bg-white w-full p-6 md:p-12 lg:p-16 product-info__block-list"
    >
      <div className="flex flex-col lg:flex-row lg:gap-16">
        {/* Left Column: Video or Image */}
        <div className="h-full w-full basis-full lg:basis-3/5 product-detail-animate opacity-0">
          {product.video ? (
            <VerticalVideoPlayer src={product.video} />
          ) : (
            <div data-media-type="image" className="product-gallery__media snap-center op  relative aspect-square h-full max-h-[550px] w-full overflow-hidden rounded-lg ">
              <GridTileImage
                alt={product.title}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                priority // This is the main image, so prioritize it
              />
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="basis-full lg:basis-2/5 mt-8 lg:mt-0 product-detail-animate opacity-0">
          <ProductDescription product={product} />
        </div>
      </div>
    </div>
  );
}
