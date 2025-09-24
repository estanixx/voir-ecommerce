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
import MobileMenu from "./mobile-menu";

function InvertedNavbar$({
  menu = [],
}: {
  menu: Menu[];
  shopMenus: { [key: string]: Menu[] };
}) {
  gsap.registerPlugin(ScrollTrigger);
  const navbarRef = useRef<HTMLElement>(null);
  const [isShopMenuHovered, setIsShopMenuHovered] = useState(false);

  // Timeline for scroll animations
  const tl = useRef<gsap.core.Timeline>(null);

  // Inverted colors - starts white bg/black text, transitions to black bg/white text
  const activeBackgroundColor = "rgba(0, 0, 0, 1)";
  const activeTextColor = "#ffffff";
  const inactiveBackgroundColor = "rgba(255, 255, 255, 1)";
  const inactiveTextColor = "#000000";

  const handleShopMenuMouseEnter = () => {
    setIsShopMenuHovered(true);
  };

  const handleShopMenuMouseLeave = () => {
    setIsShopMenuHovered(false);
  };

  useGSAP(
    () => {
      const navbarElement = navbarRef.current;
      if (!navbarElement) return;

      // --- Timeline for ScrollTrigger ---
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=200", // Animation completes in 200px of scroll
            scrub: 0.5, // Smooth animation
          },
        })
        .to(navbarElement, { backgroundColor: activeBackgroundColor, overwrite: "auto" }, 0)
        .to(
          navbarElement.querySelectorAll("a, button, svg"),
          { color: activeTextColor, overwrite: "auto", },
          0
        )
        // 1. The monogram disappears
        .to(".monogram-container", { opacity: 0 }, 0)
        // 2. The "VOIR" letters appear in its place, with a staggered effect
        .to(".nav-letter", { opacity: 1, y: 0, stagger: 0.2 }, 0);

      // --- Hover Logic ---
      const handleNavbarMouseEnter = () => {
        gsap.to(navbarElement, {
          backgroundColor: activeBackgroundColor,
          duration: 0.2,
          overwrite: "auto",
        });
        gsap.to(navbarElement.querySelectorAll("a, button, svg"), {
          color: activeTextColor,
          duration: 0.2,
          overwrite: "auto",
        });
        // Only animate the monogram if we're at the top of the page
        if (tl.current?.scrollTrigger?.progress === 0) {
          gsap.to(".black-monogram-nav", {
            opacity: 0,
            duration: 0.2,
            overwrite: "auto",
          });
          gsap.to(".white-monogram-nav", {
            opacity: 1,
            duration: 0.2,
            overwrite: "auto",
          });
        }
      };

      const handleNavbarMouseLeave = () => {
        // Only revert to initial state if we're at the top
        if (tl.current?.scrollTrigger?.progress === 0) {
          gsap.to(navbarElement, {
            backgroundColor: inactiveBackgroundColor,
            duration: 0.2,
            overwrite: "auto",
          });
          gsap.to(navbarElement.querySelectorAll("a, button, svg"), {
            color: inactiveTextColor,
            duration: 0.2,
            overwrite: "auto",
          });
          gsap.to(".black-monogram-nav", {
            opacity: 1,
            duration: 0.2,
            overwrite: "auto",
          });
          gsap.to(".white-monogram-nav", {
            opacity: 0,
            duration: 0.2,
            overwrite: "auto",
          });
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

  return (
    <nav
      ref={navbarRef}
      className={`flex items-center px-4 py-2 lg:px-6 fixed top-0 left-0 w-full bg-transparent z-[99] text-black`}
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
              <li
                key={item.title}
                onMouseEnter={
                  item.path === "/shop/all"
                    ? handleShopMenuMouseEnter
                    : undefined
                }
              >
                <Link
                  href={item.path}
                  prefetch={true}
                  className="underline-offset-4 hover:underline font-medium text-black hover:text-gray-600 transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Central container with logo */}
        <div className="flex w-full md:w-1/3 justify-center">
          <Link
            href="/"
            prefetch={true}
            className="relative flex items-center justify-center h-12 w-12"
          >
            {/* The original monogram, which will be hidden on scroll */}
            <div className="monogram-container absolute inset-0">
              <WhiteMonogram className="white-monogram-nav absolute inset-0 size-full opacity-0" />
              <BlackMonogram className="black-monogram-nav absolute inset-0 size-full" />
            </div>

            {/* The "VOIR" text that will appear on scroll */}
            <h2
              className={`${fonts.logo.className} text-5xl flex items-center justify-center gap-1`}
            >
              {["V", "O", "I", "R"].map((letter, i) => (
                <span
                  key={i}
                  className="nav-letter opacity-0 -translate-y-3 scale-x-150"
                >
                  {letter}
                </span>
              ))}
            </h2>
          </Link>
        </div>

        <div className="flex items-center justify-end md:w-1/3 gap-4 !text-black">
          <Suspense fallback={null}>
            <CartModal />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}

export const InvertedNavbar = dynamic(() => Promise.resolve(InvertedNavbar$), {
  ssr: false,
});