"use client";

import { logo } from "@/fonts";
import LogoIcon from "../icons/logo";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

interface VoirHeaderProps {
  backgroundVideo: string;
  backgroundImageSmall: string;
}

// Nota: La prop 'breakpoint' ya no es necesaria, ya que se controla con las clases de Tailwind (md:).
export const VoirVideoHeader = ({
  backgroundVideo,
  backgroundImageSmall,
}: VoirHeaderProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  // El useEffect para las animaciones GSAP no necesita cambios,
  // ya que no depende del tamaño de la pantalla.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const logoWrapper = section.querySelector("#logo-wrapper");
      const letters = section.querySelectorAll("[data-letter]");

      if (!logoWrapper || !letters || letters.length === 0) {
        return;
      }

      gsap.to(logoWrapper, {
        width: "auto",
        delay: 0,
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
            delay: 0 + i * 0.3,
            duration: 0.5,
            ease: "power3.out",
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []); // Se ejecuta una vez al montar el componente.

  return (
    <section
      className="relative flex flex-col items-center justify-center w-full h-screen text-white select-none"
      ref={sectionRef}
    >
      {/* --- Imágenes de Fondo Responsivas --- */}
      {/* Imagen para pantallas grandes (visible a partir de 768px) */}
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] hidden md:block"
      />
      {/* Imagen para pantallas pequeñas (visible hasta 768px) */}
      <div className="flex flex-col items-center justify-center md:hidden w-full h-full object-cover z-[-1]">
        <Image
          src={backgroundImageSmall}
          alt="Voir Banner"
          fill
          priority
          sizes="100vw"
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        />

        {/* El contenido animado no cambia */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1
            className={`${logo.className} text-[clamp(50px,20vw,200px)] flex [&>span]:opacity-0 xs:mb-[-80px] sm:mb-[-80px] md:mb-[-100px] lg:mb-[-100px] mb-[-30px] [&>span]:scale-x-150 gap-2 sm:gap-3 md:gap-5`}
          >
            <span data-letter>V</span>
            <span data-letter>O</span>
            <span data-letter>I</span>
            <span data-letter>R</span>
          </h1>
          <figure id="logo-wrapper" className="w-0 overflow-hidden h-auto">
            <LogoIcon className="size-[clamp(50px,15vw,160px)]" />
          </figure>
        </div>
      </div>
    </section>
  );
};
