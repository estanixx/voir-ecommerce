"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface VoirHeaderProps {
  backgroundVideo: string;
  backgroundVideoSmall: string;
}

// Nota: La prop 'breakpoint' ya no es necesaria, ya que se controla con las clases de Tailwind (md:).
export const VoirVideoHeader = ({
  backgroundVideo,
  backgroundVideoSmall,
}: VoirHeaderProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoSmallLoaded, setIsVideoSmallLoaded] = useState(false);

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
      {/* Placeholder image - shown while videos are loading */}
      <div 
        className={`absolute top-0 left-0 w-full h-full z-[-2] transition-opacity duration-500 ${
          (isVideoLoaded && isVideoSmallLoaded) ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: 'url(/resources/voir-sunset-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* --- Fondos Responsivos --- */}
      {/* Video para pantallas grandes (visible a partir de 768px) */}
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        onError={() => setIsVideoLoaded(true)} // Hide placeholder even on error
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] hidden md:block select-none pointer-events-none"
      />
      
      {/* Div transparente sobre el video para evitar selección (solo en md+) */}
      <div className="absolute top-0 left-0 w-full h-full
        z-0 hidden md:block pointer-events-none select-none" />

      {/* Video para pantallas pequeñas (visible hasta 768px) */}
      <video
        src={backgroundVideoSmall}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsVideoSmallLoaded(true)}
        onError={() => setIsVideoSmallLoaded(true)} // Hide placeholder even on error
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] md:hidden select-none pointer-events-none"
      />
      {/* Contenido animado */}
      {/* <div className="relative z-10 flex flex-col items-center justify-center">
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
      </div> */}
    </section>

  );
};
