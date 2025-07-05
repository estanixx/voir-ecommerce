"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { gsap } from "gsap";
import { GalleryLoader } from "./gallery-loader";

// --- Configuration ---
const ANIMATION_DURATION_S = 0.4; // Animation duration in seconds for GSAP
const navButtonBaseClassName =
  "absolute top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition-colors ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
const navButtonThemeClassName =
  "bg-black/30 text-white hover:bg-black/50 focus:ring-2 focus:ring-white dark:bg-white/30 dark:text-black dark:hover:bg-white/50 dark:focus:ring-black";

// --- Interfaces ---
export interface GalleryImage {
  src: string;
  altText: string;
}

export interface GalleryProps {
  images: GalleryImage[];
  className?: string; // For external styling
}

// --- Component ---
export function Gallery({ images, className }: GalleryProps) {
  const imageAmount = images.length;
  const containerRef = useRef<HTMLDivElement>(null);

  // The number of visible items is now state, managed by the resize effect
  const [numVisible, setNumVisible] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(imageAmount);
  const [isAnimating, setIsAnimating] = useState(false);

  // --- Effects ---

  // Effect for handling screen size changes and setting numVisible
  useEffect(() => {
    const checkScreenSize = () => {
      if (!window.innerWidth) {
        setNumVisible(0);
      } else if (window.innerWidth >= 1024) {
        // Large screens
        setNumVisible(3);
      } else if (window.innerWidth >= 768) {
        // Medium screens
        setNumVisible(2);
      } else {
        // Small screens
        setNumVisible(1);
      }
    };
    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // --- Data Preparation ---

  const shownImages = useMemo(() => {
    if (imageAmount === 0) return [];
    return [...images, ...images, ...images];
  }, [images, imageAmount]);

  // This effect recalibrates the slider's position when the layout changes (e.g., on resize)
  useEffect(() => {
    if (shownImages.length > 0) {
      const currentXPercent = -currentIndex * (100 / shownImages.length);
      // Use gsap.set to instantly move the slider to the correct position for the new layout
      gsap.set(containerRef.current, { xPercent: currentXPercent });
    }
    // This runs on initial mount and whenever the layout-determining variables change
  }, [numVisible, currentIndex, shownImages.length]);

  // --- Handlers ---

  const handleNavigation = (direction: "left" | "right") => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextIndex =
      direction === "right" ? currentIndex + 1 : currentIndex - 1;
    const targetXPercent = -nextIndex * (100 / shownImages.length);

    gsap.to(containerRef.current, {
      xPercent: targetXPercent,
      duration: ANIMATION_DURATION_S,
      ease: "power3.inOut",
      onComplete: () => {
        let newCurrentIndex = nextIndex;
        if (nextIndex >= imageAmount * 2) {
          newCurrentIndex = nextIndex - imageAmount;
          const immediateX = -newCurrentIndex * (100 / shownImages.length);
          gsap.set(containerRef.current, { xPercent: immediateX });
        } else if (nextIndex < imageAmount) {
          newCurrentIndex = nextIndex + imageAmount;
          const immediateX = -newCurrentIndex * (100 / shownImages.length);
          gsap.set(containerRef.current, { xPercent: immediateX });
        }
        setCurrentIndex(newCurrentIndex);
        setIsAnimating(false);
      },
    });
  };

  const handleDotClick = (targetDotIndex: number) => {
    const targetImageIndex = imageAmount + targetDotIndex;
    if (isAnimating || targetImageIndex === currentIndex) return;

    setIsAnimating(true);
    const targetXPercent = -targetImageIndex * (100 / shownImages.length);
    gsap.to(containerRef.current, {
      xPercent: targetXPercent,
      duration: ANIMATION_DURATION_S,
      ease: "power3.inOut",
      onComplete: () => {
        setCurrentIndex(targetImageIndex);
        setIsAnimating(false);
      },
    });
  };

  // --- Active Dot Calculation ---
  const activeDotIndices = useMemo(() => {
    const indices = new Set<number>();
    // This loop now works for any number of visible items
    for (let i = 0; i < numVisible; i++) {
      const realIndex = (currentIndex + i) % imageAmount;
      indices.add(realIndex);
    }
    return indices;
  }, [currentIndex, imageAmount, numVisible]);

  if (imageAmount === 0) {
    return (
      <GalleryLoader quote="No hay imágenes disponibles"/>
    );
  }
  if (numVisible === 0) {
    return (
      <GalleryLoader quote="Clearing the vision"/>
    );
  }

  return (
    <div
      className={`relative w-full select-none overflow-hidden ${className || ""}`}
    >
      <div
        ref={containerRef}
        className="flex"
        style={{
          width: `${(shownImages.length / numVisible) * 100}%`,
        }}
      >
        {shownImages.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className="relative aspect-square"
            style={{
              flex: `1 0 ${100 / shownImages.length}%`,
            }}
          >
            <Image
              src={image.src}
              alt={image.altText}
              fill
              className="object-contain p-1"
              priority={
                index >= imageAmount - numVisible && index < imageAmount * 2
              }
            />
          </figure>
        ))}
      </div>

      {/* --- Navigation and Dot Controls --- */}
      {true && (
        <>
          <button
            onClick={() => handleNavigation("left")}
            aria-label="Previous image"
            className={`${navButtonBaseClassName} ${navButtonThemeClassName} left-3 sm:left-4`}
          >
            <ArrowLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={() => handleNavigation("right")}
            aria-label="Next image"
            className={`${navButtonBaseClassName} ${navButtonThemeClassName} right-3 sm:right-4`}
          >
            <ArrowRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-2 z-10 p-1 bg-black/20 dark:bg-white/20 backdrop-blur-sm rounded-full">
            {images.map((_, index) => {
              const isActive = activeDotIndices.has(index);
              return (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  disabled={isAnimating}
                  aria-label={`Go to image ${index + 1}`}
                  title={`Image ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-150 ease-in-out focus:outline-none 
                    ${
                      isActive
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/75"
                    }
                  `}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
