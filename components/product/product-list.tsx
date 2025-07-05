"use client";
// Example: app/components/ProductList.tsx

import { useRef } from "react";
import Grid from "@/components/grid";
import { Product } from "@/lib/shopify/types";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ProductGridItems from "@/components/product/product-grid-items";
import clsx from "clsx";

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function ProductList({
  products,
  className,
  heightPct = 85,
}: {
  products: Product[];
  className?: string;
  heightPct?: number;
}) {
  const container = useRef(null);

  useGSAP(
    () => {
      // Select all the grid items to be animated
      const items = gsap.utils.toArray(".grid-item-animate");

      // Use ScrollTrigger.batch to create an individual trigger for each item
      ScrollTrigger.batch(items as gsap.DOMTarget, {
        // The animation to play when an item enters the viewport
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            {
              opacity: 0,
              y: -50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.3, // Stagger items if multiple enter at once
            }
          );
        },
        // Run the animation only once per item
        once: true,
        // Define when the animation should start
        start: `top ${heightPct}%`, // Adjust this value to control when the animation starts
      });
    },
    { scope: container }
  );

  return (
    <section>
      {/* The ref remains on your main Grid component */}
      <Grid
        ref={container}
        className={clsx(className || "grid-cols-1 sm:grid-cols-2")}
      >
        <ProductGridItems products={products} />
      </Grid>
    </section>
  );
}
