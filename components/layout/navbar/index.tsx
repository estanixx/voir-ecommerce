"use client"; // Convertir en Client Component

import { useGSAP } from "@gsap/react";
import CartModal from "@/components/cart/modal";
// Assuming WhiteMonogram and BlackMonogram are correctly exported from your monograms file
import { WhiteMonogram, BlackMonogram } from "@/components/icons/monograms"; // Adjusted import for consistency if they come from the same file. Use your actual paths.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu } from "@/lib/shopify/types";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useRef, useState } from "react";
import { DropDownMenu } from "./dropdown-menu";
import MobileMenu from "./mobile-menu";
// import Search from "./search"; // Search import was commented out, kept it as is.

// If BlackMonogram is from a different path as in your original code:
// import { BlackMonogram } from '../../icons/monograms';

function Navbar$({
  menu = [],
  shopMenus = {},
}: {
  menu: Menu[];
  shopMenus: { [key: string]: Menu[] };
}) {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  const navbarRef = useRef<HTMLElement>(null); // Typed the ref for better TypeScript support
  const [isShopMenuHovered, setIsShopMenuHovered] = useState(false); // Renamed for clarity

  useGSAP(
    () => {
      const navbarElement = navbarRef.current;
      if (!navbarElement) return;

      const activeBackgroundColor = "rgba(255, 255, 255, 1)";
      const activeTextColor = "#000000";
      const activeBorderColor = "#000"; // For other elements if needed

      const inactiveBackgroundColor = "rgba(0, 0, 0, 0)";
      const inactiveTextColor = "#FFFFFF";
      const inactiveBorderColor = "rgba(255, 255, 255, 0.3)";

      // Selectors for monograms
      const whiteMonogram = navbarElement.querySelector(".white-monogram-nav");
      const blackMonogram = navbarElement.querySelector(".black-monogram-nav");

      // Set initial state for BlackMonogram (though Tailwind's opacity-0 already does this)
      // gsap.set(blackMonogram, { opacity: 0 });
      // gsap.set(whiteMonogram, { opacity: 1 });


      // --- ScrollTrigger Animations ---
      const stBackground = gsap.to(navbarElement, {
        backgroundColor: activeBackgroundColor,
        duration: 0.3,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
      });

      // General text elements (excluding monograms if they don't change color)
      // Be more specific if some SVGs should not change fill/stroke with `activeTextColor`
      const stTextElements = gsap.to(
        navbarElement.querySelectorAll("a:not(.monogram-link), .menu-item-class, input, button, .cart-icon-selector path, svg"), // Adjust selectors as needed
        {
          color: activeTextColor,
          // fill: activeTextColor, // if SVGs should change fill
          // stroke: activeTextColor, // if SVGs should change stroke
          borderColor: activeBorderColor, // For inputs or other bordered elements
          duration: 0.3,
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=200",
            scrub: true,
          },
        }
      );

      // ScrollTrigger for Monogram fade
      const stWhiteMonogram = gsap.to(whiteMonogram, {
        opacity: 0,
        duration: 0.3,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
      });

      const stBlackMonogram = gsap.to(blackMonogram, {
        opacity: 1,
        duration: 0.3,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
      });


      // --- Hover Event Handlers for Navbar itself ---
      const handleNavbarMouseEnter = () => {
        gsap.to(navbarElement, {
          backgroundColor: activeBackgroundColor,
          duration: 0.2,
          overwrite: "auto",
        });
        gsap.to(
          navbarElement.querySelectorAll("a:not(.monogram-link), .menu-item-class, input, .cart-icon-selector path, svg"), // Adjust selectors
          {
            color: activeTextColor,
            // fill: activeTextColor,
            // stroke: activeTextColor,
            borderColor: activeBorderColor,
            duration: 0.2,
            overwrite: "auto",
          }
        );
        gsap.to(whiteMonogram, { opacity: 0, duration: 0.2, overwrite: "auto" });
        gsap.to(blackMonogram, { opacity: 1, duration: 0.2, overwrite: "auto" });
      };

      const handleNavbarMouseLeave = () => {
        if (stBackground.scrollTrigger && stBackground.scrollTrigger.progress === 0) {
          gsap.to(navbarElement, {
            backgroundColor: inactiveBackgroundColor,
            duration: 0.2,
            overwrite: "auto",
          });
          gsap.to(
            navbarElement.querySelectorAll("a:not(.monogram-link), .menu-item-class, input, .cart-icon-selector path, svg"), // Adjust selectors
            {
              color: inactiveTextColor,
              // fill: inactiveTextColor,
              // stroke: inactiveTextColor,
              borderColor: inactiveBorderColor,
              duration: 0.2,
              overwrite: "auto",
            }
          );
          gsap.to(whiteMonogram, { opacity: 1, duration: 0.2, overwrite: "auto" });
          gsap.to(blackMonogram, { opacity: 0, duration: 0.2, overwrite: "auto" });
        }
      };

      navbarElement.addEventListener("mouseenter", handleNavbarMouseEnter);
      navbarElement.addEventListener("mouseleave", handleNavbarMouseLeave);

      return () => {
        navbarElement.removeEventListener("mouseenter", handleNavbarMouseEnter);
        navbarElement.removeEventListener("mouseleave", handleNavbarMouseLeave);

        if (stBackground) stBackground.kill();
        if (stTextElements) stTextElements.kill();
        if (stWhiteMonogram) stWhiteMonogram.kill();
        if (stBlackMonogram) stBlackMonogram.kill();
        // Optionally, kill all ScrollTriggers associated with the navbarElement more broadly if needed:
        // ScrollTrigger.killAll({target: navbarElement});
      };
    },
    { scope: navbarRef, dependencies: [] }
  );

  // These handleMouseEnter/Leave are for the dropdown shop menu, separate from navbar hover
  const handleShopMenuMouseEnter = () => {
    setIsShopMenuHovered(true);
    gsap.to(".dropdown-menu", { // Ensure this selector is specific enough
      opacity: 1,
      height: "auto", // Be cautious with "auto" if it causes jumps, consider a fixed max-height
      duration: 0.3,
      display: "block", // GSAP can animate display, but often opacity/height is smoother
    });
  };
  const handleShopMenuMouseLeave = () => {
    setIsShopMenuHovered(false);
    gsap.to(".dropdown-menu", {
      opacity: 0,
      height: 0,
      duration: 0.3,
      display: "none", // Set to none after animation
    });
  };

  const MenuDisplay = menu.map((item: Menu) => (
    <li
      key={item.title}
      // This onMouseEnter is for the dropdown, make sure it's the correct item
      onMouseEnter={item.path === "/search/all" ? handleShopMenuMouseEnter : undefined}
      className="menu-item-class" // Added a class for easier targeting by GSAP if needed for color
    >
      <Link
        href={item.path}
        prefetch={true}
        // Initial text color set by CSS, GSAP will animate it
        className="underline-offset-4 hover:underline font-medium" // Removed text-white and hover:text-black as GSAP handles it
      >
        {item.title}
      </Link>
    </li>
  ));

  return (
    <nav
      ref={navbarRef}
      className="flex items-center px-4 py-2 lg:px-6 fixed top-0 left-0 w-full bg-transparent z-[99] text-white" // Added initial text-white
      // This onMouseLeave is for the dropdown menu, not the general navbar hover.
      // The general navbar hover is handled by event listeners in useGSAP.
      // If this onMouseLeave is intended for the entire navbar to hide the dropdown, its logic might need to be combined or reviewed.
      onMouseLeave={isShopMenuHovered ? handleShopMenuMouseLeave : undefined}
    >
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>

      <div className="flex w-full items-center"> {/* Simplified structure slightly, adjust if needed */}
        <div className="hidden justify-start md:flex md:w-1/3">
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center"> {/* text-2xl was also present, choose one or manage responsive sizes */}
              {MenuDisplay}
            </ul>
          ) : null}
        </div>

        <div className="flex w-full md:w-1/3 justify-center">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6 monogram-link"
          >
            <div className="relative size-12">
              <WhiteMonogram className="white-monogram-nav absolute left-0 top-0 size-full" />
              <BlackMonogram className="black-monogram-nav absolute left-0 top-0 size-full opacity-0" />
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-end md:w-1/3 gap-4">
          {/* <Search /> */}
          <Suspense fallback={null}> {/* Ensure CartModal is compatible with Suspense or doesn't need it here */}
            <CartModal />
          </Suspense>
        </div>
      </div>

      {/* Dropdown menu - ensure its positioning is correct relative to the navbar or the menu item */}
      <div className="dropdown-menu absolute top-full left-0 w-full bg-white" style={{ opacity: 0, height: 0, display: 'none' }}>
        <DropDownMenu shopMenus={shopMenus} />
      </div>
    </nav>
  );
}

export const Navbar = dynamic(() => Promise.resolve(Navbar$), {
  ssr: false,
});