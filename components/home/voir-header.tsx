"use client"; // Indica que este es un Componente Cliente

import { logo } from "@/fonts"; // Asegúrate de que la ruta y exportación sean correctas
import LogoIcon from "../icons/logo"; // Asegúrate de que la ruta y exportación sean correctas
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

interface VoirHeaderProps {
  backgroundImageLarge: string;
  backgroundImageSmall: string;
  breakpoint?: number; // Optional breakpoint to define "small screen", defaults to 768px
}

export const VoirHeader = ({
  backgroundImageLarge,
  backgroundImageSmall,
  breakpoint = 768, // Default breakpoint (md)
}: VoirHeaderProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Effect to determine if the screen is small based on the breakpoint
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < breakpoint);
    };

    checkScreenSize(); // Initial check on mount
    window.addEventListener("resize", checkScreenSize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]); // Re-run if the breakpoint prop changes

  // GSAP animations effect (remains largely the same)
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const logoWrapper = sectionRef.current?.querySelector("#logo-wrapper");
      const letters = sectionRef.current?.querySelectorAll("[data-letter]");
      if (!logoWrapper || !letters || letters.length === 0) {
        // Added length check for letters
        return;
      }
      gsap.to(logoWrapper, {
        width: "auto",
        delay: 2,
        duration: 1.5,
        ease: "power2.out",
      });

      letters.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            delay: 2 + i * 0.3,
            duration: 0.5,
            ease: "power3.out",
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []); // GSAP animations run once on mount

  // Determine which image source to use
  const currentImageSrc = isSmallScreen
    ? backgroundImageSmall
    : backgroundImageLarge;

  return (
    <section
      className="relative flex flex-col items-center justify-center w-full h-screen text-white select-none"
      ref={sectionRef}
    >
      <Image
        key={currentImageSrc} // Add key to ensure Next.js re-renders the Image component if src changes
        src={currentImageSrc}
        alt="Voir Banner"
        fill // Use fill to cover the parent container
        priority // Consider 'priority' if this is a Largest Contentful Paint (LCP) element
        sizes="" // Example 'sizes' prop, adjust based on your layout
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" // Adjusted z-index, ensure content is above
      />
      {/* Content needs to be on a higher z-index than the background image */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {" "}
        {/* Wrapper for foreground content */}
        <h1
          className={`${logo.className} text-[clamp(50px,20vw,200px)] flex [&>span]:opacity-0 xs:mb-[-80px] sm:mb-[-80px] md:mb-[-100px] lg:mb-[-100px]  mb-[-30px] [&>span]:scale-x-150 gap-2 sm:gap-3 md:gap-5`}
        >
          <span data-letter>V</span>
          <span data-letter>O</span>
          <span data-letter>I</span>
          <span data-letter>R</span>
        </h1>
        <figure id="logo-wrapper" className="w-0 overflow-hidden h-auto">
          {/* Using clamp for responsive margin-top */}
          <LogoIcon className="size-[clamp(50px,15vw,160px)]" />{" "}
          {/* Using clamp for responsive logo size */}
        </figure>
      </div>
    </section>
  );
};
