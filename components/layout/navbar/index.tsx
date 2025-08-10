"use client";

import { useGSAP } from "@gsap/react";
import CartModal from "@/components/cart/modal";
import { WhiteMonogram, BlackMonogram } from "@/components/icons/monograms";
import * as fonts from "@/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu } from "@/lib/shopify/types";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useRef, useState } from "react";
// import { DropDownMenu } from "./dropdown-menu";
import MobileMenu from "./mobile-menu";

function Navbar$({
  menu = [],
  // shopMenus = {} ,
}: {
  menu: Menu[];
  shopMenus: { [key:string]: Menu[] };
}) {
  gsap.registerPlugin(ScrollTrigger);
  const navbarRef = useRef<HTMLElement>(null);
  const [isShopMenuHovered, setIsShopMenuHovered] = useState(false);

  // Usamos una sola línea de tiempo para sincronizar todas las animaciones de scroll
  const tl = useRef<gsap.core.Timeline>(null);

  const activeBackgroundColor = "rgba(255, 255, 255, 1)";
  const activeTextColor = "#000000";
  const inactiveTextColor = "#ffffff";

  useGSAP(
    () => {
      const navbarElement = navbarRef.current;
      if (!navbarElement) return;


      // --- Timeline para el ScrollTrigger ---
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=200", // La animación se completa en 200px de scroll
            scrub: 0.5, // Suaviza la animación
          },
        })
        .to(navbarElement, { backgroundColor: activeBackgroundColor }, 0)
        .to(navbarElement.querySelectorAll("a, button, svg"), { color: activeTextColor }, 0)
        // 1. El monograma desaparece
        .to(".monogram-container", { opacity: 0 }, 0)
        // 2. Las letras de "VOIR" aparecen en su lugar, con un efecto escalonado
        .to(".nav-letter", { opacity: 1, y: 0, stagger: 0.2 }, 0);

      // --- Lógica para el Hover ---
      const handleNavbarMouseEnter = () => {
        gsap.to(navbarElement, { backgroundColor: activeBackgroundColor, duration: 0.2, overwrite: "auto" });
        gsap.to(navbarElement.querySelectorAll("a, button, svg"), { color: activeTextColor, duration: 0.2, overwrite: "auto" });
        // Solo animar el monograma si estamos en la parte superior de la página
        if (tl.current?.scrollTrigger?.progress === 0) {
          gsap.to(".white-monogram-nav", { opacity: 0, duration: 0.2, overwrite: "auto" });
          gsap.to(".black-monogram-nav", { opacity: 1, duration: 0.2, overwrite: "auto" });
        }
      };

      const handleNavbarMouseLeave = () => {
        // Solo revertir al estado transparente si estamos en la parte superior
        if (tl.current?.scrollTrigger?.progress === 0) {
          gsap.to(navbarElement, { backgroundColor: "transparent", duration: 0.2, overwrite: "auto" });
          gsap.to(navbarElement.querySelectorAll("a, button, svg"), { color: inactiveTextColor, duration: 0.2, overwrite: "auto" });
          gsap.to(".white-monogram-nav", { opacity: 1, duration: 0.2, overwrite: "auto" });
          gsap.to(".black-monogram-nav", { opacity: 0, duration: 0.2, overwrite: "auto" });
        }
      };

      navbarElement.addEventListener("mouseenter", handleNavbarMouseEnter);
      navbarElement.addEventListener("mouseleave", handleNavbarMouseLeave);

      return () => {
        navbarElement.removeEventListener("mouseenter", handleNavbarMouseEnter);
        navbarElement.removeEventListener("mouseleave", handleNavbarMouseLeave);
      };
    },
    { scope: navbarRef }
  );
  
  // (La lógica del menú desplegable no necesita cambios)
  const handleShopMenuMouseEnter = () => {
    setIsShopMenuHovered(true);
    gsap.to(".dropdown-menu", { opacity: 1, height: "auto", duration: 0.3, display: "block" });
  };
  const handleShopMenuMouseLeave = () => {
    setIsShopMenuHovered(false);
    gsap.to(".dropdown-menu", { opacity: 0, height: 0, duration: 0.3, display: "none" });
  };

  return (
    <nav
      ref={navbarRef}
      className={`flex items-center px-4 py-2 lg:px-6 fixed top-0 left-0 w-full bg-transparent z-[99] text-white`}
      onMouseLeave={isShopMenuHovered ? handleShopMenuMouseLeave : undefined}
    >
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="hidden justify-start md:flex md:w-1/3">
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            {menu.map((item) => (
              <li key={item.title} onMouseEnter={item.path === "/search/all" ? handleShopMenuMouseEnter : undefined}>
                <Link href={item.path} prefetch={true} className="underline-offset-4 hover:underline font-medium">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* --- CONTENEDOR CENTRAL MODIFICADO --- */}
        <div className="flex w-full md:w-1/3 justify-center">
          <Link href="/" prefetch={true} className="relative flex items-center justify-center h-12 w-12">
            
            {/* El monograma original, que se ocultará con el scroll */}
            <div className="monogram-container absolute inset-0">
              <WhiteMonogram className="white-monogram-nav absolute inset-0 size-full" />
              <BlackMonogram className="black-monogram-nav absolute inset-0 size-full opacity-0" />
            </div>

            {/* El texto "VOIR" que aparecerá con el scroll */}
            <h2 className={`${fonts.logo.className} text-5xl flex items-center justify-center gap-1`}>
              {['V', 'O', 'I', 'R'].map((letter, i) => (
                <span key={i} className="nav-letter opacity-0 -translate-y-3 scale-x-150">
                  {letter}
                </span>
              ))}
            </h2>
          </Link>
        </div>

        <div className="flex items-center justify-end md:w-1/3 gap-4">
          <Suspense fallback={null}>
            <CartModal />
          </Suspense>
        </div>
      </div>
      {/* <div className="dropdown-menu absolute top-full left-0 w-full bg-white" style={{ opacity: 0, height: 0, display: 'none' }}>
        <DropDownMenu shopMenus={shopMenus} />
      </div> */}
    </nav>
  );
}

export const Navbar = dynamic(() => Promise.resolve(Navbar$), {
  ssr: false,
});