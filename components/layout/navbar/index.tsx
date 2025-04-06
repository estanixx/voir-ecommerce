"use client"; // Convertir en Client Component

import { useGSAP } from "@gsap/react";
import CartModal from "@/components/cart/modal";
import MonogramIcon from "@/components/icons/monogram";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu } from "lib/shopify/types";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useRef, useState } from "react";
import { DropDownMenu } from "./dropdown-menu";
import MobileMenu from "./mobile-menu";
import Search from "./search";

function $Navbar({
  menu = [],
  shopMenus = {},
}: {
  menu: Menu[];
  shopMenus: { [key: string]: Menu[] };
}) {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  const navbarRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  // Usar useGSAP para manejar las animaciones
  useGSAP(
    () => {
      // Configurar la animación con GSAP y ScrollTrigger
      gsap.to(navbarRef.current, {
        backgroundColor: "rgba(255, 255, 255, 1)", // Fondo blanco sólido
        duration: 0.3, // Duración de la animación
        scrollTrigger: {
          trigger: document.body, // Elemento que activa la animación
          start: "top top", // Inicia la animación cuando el scroll está en la parte superior
          end: "+=200", // Termina la animación después de 200 píxeles de scroll
          scrub: true, // Suaviza la animación mientras se hace scroll
        },
      });

      // Animación para cambiar el color de los textos y otros elementos
      gsap.to("a, svg, path, input", {
        color: "#000000", // Texto negro
        borderColor: "#000",
        duration: 0.3,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
      });
    },
    { scope: navbarRef, dependencies: [] }
  ); // Asociar useGSAP al scope del navbarRef

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(".dropdown-menu", { opacity: 1, height: "auto", duration: 0.3, display: "block" });
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(".dropdown-menu", { opacity: 0, height: 0, duration: 0.3, display: 'none' });
  };

  const MenuDisplay = menu.map((item: Menu) => (
    <li
      key={item.title}
      onMouseEnter={item.path === "/search/all" ? handleMouseEnter : undefined}
    >
      <Link
        href={item.path}
        prefetch={true}
        className="text-white underline-offset-4 hover:text-black hover:underline font-medium"
      >
        {item.title}
      </Link>
    </li>
  ));
  return (
    <nav
      ref={navbarRef}
      className="flex items-center px-4 py-2 lg:px-6 fixed top-0 left-0 w-full bg-transparent z-50"
      onMouseLeave={handleMouseLeave}
    >
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>

      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3 ">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6 text-neutral-300 hover:text-black"
          >
            <MonogramIcon className="size-12" />
          </Link>
        </div>

        <div className="hidden justify-center md:flex md:w-1/3">
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {MenuDisplay}
            </ul>
          ) : null}
        </div>

        <div className="flex self-end  items-center justify-end md:w-1/3 gap-4">
          <Search />
          <CartModal/>
        </div>
      </div>

      <div className='dropdown-menu' style={{ opacity: 0, height: 0 }}>
        <DropDownMenu shopMenus={shopMenus} />
      </div>
    </nav>
  );
}

// Exportar el componente dinámico con las props
export const Navbar = dynamic(() => Promise.resolve($Navbar), {
  ssr: false, // Desactivar SSR si es necesario
});
