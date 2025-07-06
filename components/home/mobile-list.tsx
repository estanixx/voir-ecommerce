"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const MobileList = ({
  products,
}: {
  products: {
    name: string;
    path: string;
    productImage: string;
    hoverProductImage: string;
  }[];
}) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".mobile-product-item");

      items.forEach((item) => {
        // Animamos la opacidad de la imagen "hover" de 0 a 1
        if(!item) return;
        gsap.to((item as HTMLElement).querySelector(".hover-image"), {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: (item as HTMLElement),
            // La animación empieza cuando la parte superior del item llega al 30% de la pantalla
            start: "top 20%",
            // Y termina cuando la parte inferior del item deja el 70% de la pantalla
            end: "bottom 70%",
            // Scrub hace que la animación esté directamente ligada a la posición del scroll
            scrub: 0.5,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    // 1. El fondo de la sección ahora es transparente
    <section ref={containerRef} className="md:hidden flex flex-col bg-black/80">
      {products.map((item, i) => (
        // Cada item es un contenedor relativo para posicionar las capas
        <div key={i} className="mobile-product-item relative h-screen py-8">
          <Link href={item.path} className="block w-full h-full text-center">
            {/* 2. El título va detrás como una capa de fondo (z-10) */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <h3
                className={`text-4xl font-black text-white uppercase break-words`}
              >
                {item.name}
              </h3>
            </div>

            {/* 3. El contenedor de la imagen va en una capa superior (z-20) */}
            <div className="relative flex items-center justify-center h-full w-full z-20">
              {/* Este div define el tamaño más pequeño de la imagen */}
              <div className="relative aspect-[3/4] w-8/12 h-auto max-h-[60%]">
                {/* Imagen por defecto (visible inicialmente) */}
                <Image
                  priority
                  alt={item.name}
                  src={item.productImage}
                  fill
                  className="object-contain"
                />
                {/* Imagen de hover (se revela con el scroll) */}
                <Image
                  priority
                  alt={`${item.name} (vista alternativa)`}
                  src={item.hoverProductImage}
                  fill
                  className="object-contain opacity-0 hover-image"
                />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
};
