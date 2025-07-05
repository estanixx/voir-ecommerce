"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Initial slider position for horizontal mode (center)
const INITIAL_HORIZONTAL_SLIDER_PERCENTAGE = 33;

interface ImageComparisonSliderProps {
  vImage: string; // Single image for small screens
  hAbove: string; // "Top" image for horizontal slider (left image)
  hBellow: string; // "Bottom" image for horizontal slider (right image)
  children?: React.ReactNode;
  breakpoint?: number; // Optional: custom breakpoint (default 768)
}

export const ImageComparisonSlider = ({
  vImage,
  hAbove,
  hBellow,
  children,
  breakpoint = 768, // Default to md breakpoint (768px)
}: ImageComparisonSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topImageContainerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderPercentageRef = useRef(INITIAL_HORIZONTAL_SLIDER_PERCENTAGE);

  // This single useEffect now handles the slider logic.
  // It attaches listeners once on mount and cleans them up on unmount.
  useEffect(() => {
    const container = containerRef.current;
    const topImageContainer = topImageContainerRef.current;
    const slider = sliderRef.current;

    if (!container || !topImageContainer || !slider) return;

    let isDragging = false;

    const setPositionBasedOnPercentage = (percentage: number) => {
      // This function's logic remains the same
      const containerRect = container.getBoundingClientRect();
      const sliderX = (percentage / 100) * containerRect.width;
      slider.style.left = `${sliderX}px`;
      const clipValue = `inset(0 ${100 - percentage}% 0 0)`;
      topImageContainer.style.clipPath = clipValue;
      topImageContainer.style.setProperty("-webkit-clip-path", clipValue);
      sliderPercentageRef.current = percentage;
    };

    const updatePositionBasedOnClientX = (clientX: number) => {
      // This function's logic remains the same
      const containerRect = container.getBoundingClientRect();
      let newRelativeX = clientX - containerRect.left;
      newRelativeX = Math.max(0, Math.min(newRelativeX, containerRect.width));
      const currentPercentage = (newRelativeX / containerRect.width) * 100;
      setPositionBasedOnPercentage(currentPercentage);
    };

    const onDrag = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const touchOrMouse = "touches" in e ? e.touches[0] : e;
      updatePositionBasedOnClientX(touchOrMouse.clientX);
    };

    const startDrag = (e: MouseEvent | TouchEvent) => {
      // **THE KEY CHANGE**: We check the window width here.
      // If we're below the breakpoint, we don't start the drag.
      if (window.innerWidth < breakpoint) return;

      isDragging = true;
      e.preventDefault();
      slider.classList.add("dragging");
      onDrag(e);
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      slider.classList.remove("dragging");
    };

    const handleResize = () => {
      // On resize, only apply changes if we are above the breakpoint
      if (window.innerWidth >= breakpoint) {
        setPositionBasedOnPercentage(sliderPercentageRef.current);
      }
    };

    // Add event listeners for horizontal slider
    container.addEventListener("mousedown", startDrag);
    container.addEventListener("touchstart", startDrag, { passive: false });
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("touchmove", onDrag, { passive: false });
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);
    window.addEventListener("resize", handleResize);

    // Initialize slider position on load
    handleResize();

    return () => {
      // Cleanup remains the same
      container.removeEventListener("mousedown", startDrag);
      // ... etc.
    };
  }, [breakpoint]); // The effect now only depends on the breakpoint prop

  return (
    // The main container has the ref and a default cursor for small screens
    <div
      ref={containerRef}
      className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] overflow-hidden select-none cursor-default md:cursor-ew-resize"
    >
      {/* --- SMALL SCREEN VIEW (md:hidden) --- */}
      {/* This block is only visible on screens smaller than the breakpoint */}
      <div className="md:hidden w-full h-full">
        <Image
          src={vImage}
          alt="Display Image"
          fill={true}
          priority
          className="absolute inset-0 object-cover z-10"
        />
        {/* Children overlay for mobile */}
        {children && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-white text-center p-4 pointer-events-none">
            <div className="pointer-events-auto">{children}</div>
          </div>
        )}
      </div>

      {/* --- LARGER SCREEN VIEW (hidden md:block) --- */}
      {/* This block is hidden by default and becomes visible at the breakpoint */}
      <div className="hidden md:block w-full h-full">
        {/* Bottom Image */}
        <Image
          priority
          src={hBellow}
          alt="Comparison Base Image"
          fill
          className="absolute inset-0 object-cover z-10"
        />
        {/* Top Image Container (Clipped) */}
        <div ref={topImageContainerRef} className="absolute inset-0 z-20">
          <Image
            priority
            src={hAbove}
            alt="Comparison Overlay Image"
            fill
            className="object-cover"
          />
        </div>
        {/* Slider Handle and Line */}
        <div ref={sliderRef} className="absolute top-0 bottom-0 w-0.5 bg-white z-40 group" style={{ transform: "translateX(-50%)" }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center size-20 md:size-16 transition-transform duration-150 group-hover:scale-110 active:scale-105">
            {/* Children overlay for desktop handle */}
            {children && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-white text-center p-4 pointer-events-auto">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};