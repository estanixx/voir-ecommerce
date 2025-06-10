"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Sun from "../icons/sun"; // Assuming Sun is a valid component path
// Initial slider position for horizontal mode (center)
const INITIAL_HORIZONTAL_SLIDER_PERCENTAGE = 33;

interface ImageComparisonSliderProps {
  vImage: string;      // Single image for small screens
  hAbove: string;      // "Top" image for horizontal slider (effectively the left image)
  hBellow: string;     // "Bottom" image for horizontal slider (effectively the right image, shown underneath)
  children?: React.ReactNode;
  breakpoint?: number; // Optional: custom breakpoint for switching views (default 768)
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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Determine if it's a small screen on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < breakpoint);
    };
    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  // Effect for horizontal slider logic, only runs when not on a small screen
  useEffect(() => {
    // If on a small screen, do nothing and ensure any previous listeners are cleaned up
    if (isSmallScreen) {
      // Optional: If slider element might have inline styles from previous state, reset them.
      // However, conditional rendering should prevent it from being interactive.
      return;
    }

    const container = containerRef.current;
    const topImageContainer = topImageContainerRef.current;
    const slider = sliderRef.current;

    // If refs aren't available (e.g., during conditional render changes), exit.
    if (!container || !topImageContainer || !slider) return;

    let isDragging = false;

    const setPositionBasedOnPercentage = (percentage: number) => {
      // This function is now only for HORIZONTAL slider
      if (!container || !slider || !topImageContainer) return;
      const containerRect = container.getBoundingClientRect();
      const sliderX = (percentage / 100) * containerRect.width;

      slider.style.left = `${sliderX}px`;
      topImageContainer.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      topImageContainer.style.setProperty('-webkit-clip-path', `inset(0 ${100 - percentage}% 0 0)`);
      sliderPercentageRef.current = percentage;
    };

    const updatePositionBasedOnClientX = (clientX: number) => {
      // This function is now only for HORIZONTAL slider
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      let newRelativeX = clientX - containerRect.left;
      newRelativeX = Math.max(0, Math.min(newRelativeX, containerRect.width));
      const currentPercentage = (newRelativeX / containerRect.width) * 100;
      setPositionBasedOnPercentage(currentPercentage);
    };

    const startDrag = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      e.preventDefault();
      slider.classList.add("dragging");
      const touchOrMouse = "touches" in e ? e.touches[0] : e;
      updatePositionBasedOnClientX(touchOrMouse.clientX);
    };

    const onDrag = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const touchOrMouse = "touches" in e ? e.touches[0] : e;
      updatePositionBasedOnClientX(touchOrMouse.clientX);
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      slider.classList.remove("dragging");
    };

    const handleResize = () => {
      // Only relevant for horizontal slider mode
      setPositionBasedOnPercentage(sliderPercentageRef.current);
    };

    // Add event listeners only for horizontal slider mode
    slider.addEventListener("mousedown", startDrag);
    slider.addEventListener("touchstart", startDrag, { passive: false });
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("touchmove", onDrag, { passive: false });
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);
    window.addEventListener("resize", handleResize);

    // Initialize slider position for horizontal mode
    setPositionBasedOnPercentage(sliderPercentageRef.current);
    console.log(
      `Horizontal Slider Initialized - Position: ${sliderPercentageRef.current.toFixed(2)}%`
    );

    return () => {
      // Cleanup listeners
      slider.removeEventListener("mousedown", startDrag);
      slider.removeEventListener("touchstart", startDrag);
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchend", endDrag);
      window.removeEventListener("resize", handleResize);
      console.log("Horizontal Slider Listeners Removed");
    };
  }, [isSmallScreen, hAbove, hBellow, breakpoint]); // Effect depends on screen size and horizontal images

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] overflow-hidden cursor-default select-none"
    >
      {isSmallScreen ? (
        // SMALL SCREEN: Display single vImage
        <Image
          key={vImage} // Key for re-render if vImage changes
          src={vImage}
          alt="Display Image"
          fill={true}
          priority
          className="absolute inset-0 object-cover z-10"
        />
      ) : (
        // LARGER SCREENS: Display horizontal comparison slider
        <>
          {/* Bottom Image (hBellow) - always visible underneath */}
          <Image
            key={hBellow}
            src={hBellow}
            alt="Comparison Base Image"
            fill={true}
            priority
            className="absolute inset-0 object-cover z-10"
          />
          {/* Container for Top Image (hAbove) - this one gets clipped */}
          <div ref={topImageContainerRef} className="absolute inset-0 z-20">
            <Image
              key={hAbove}
              src={hAbove}
              alt="Comparison Overlay Image"
              fill={true}
              priority
              className="object-cover"
            />
          </div>
          {/* Slider Handle and Line - only for larger screens */}
          <div
            ref={sliderRef}
            className="absolute top-0 bottom-0 w-0.5 cursor-ew-resize z-40 bg-white/60 group"
            style={{
              // JS sets 'left', this transform centers the 2px line on that 'left' coordinate
              transform: "translateX(-50%)",
            }}
          >
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         flex items-center justify-center size-10 md:size-12 rounded-full 
                          shadow-xl bg-white
                         transition-transform duration-150 group-hover:scale-110 active:scale-105 pointer-events-auto`}
            >
              <Sun className="size-4 md:size-9 fill-black" />
            </div>
          </div>
        </>
      )}

      {/* Children overlay (common for both modes) */}
      {children && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white pointer-events-none text-center p-4">
          {children}
        </div>
      )}
    </div>
  );
};

