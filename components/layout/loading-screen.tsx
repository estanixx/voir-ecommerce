'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import LogoIcon from '../icons/logo'; // Make sure this path is correct

interface LoadingScreenProps {
  quote?: string;
}

export function LoadingScreen({ quote = "Design is thinking made visual." }: LoadingScreenProps) {
  const container = useRef(null);

  // useGSAP for a safe, modern way to handle GSAP animations in React
  useGSAP(
    () => {
      // Animate the logo wrapper expanding
      gsap.to('#logo-loader-wrapper', {
        width: 'auto', // Expands from 0 to the natural width of the icon
        duration: 0.5,
        ease: 'power2.out'
      });

      // Animate each letter of the quote fading in and moving up
      gsap.fromTo(
        '[data-letter]',
        {
          opacity: 0,
          y: 20 // Start from 20px below
        },
        {
          opacity: 1,
          y: 0,
          delay: 0.2, // Start after the logo animation has begun
          stagger: 0.04, // Create a quick ripple effect for the letters
          ease: 'power3.out'
        }
      );
    },
    { scope: container } // Scope the animations to this component
  );

  return (
    <main
      ref={container}
      className="fixed inset-0 z-[100] flex h-screen w-screen flex-col items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center text-center">
        {/* This figure animates its width to reveal the logo */}
        <figure id="logo-loader-wrapper" className="w-0 overflow-hidden">
          <LogoIcon className="size-[clamp(60px,15vw,100px)] text-black" />
        </figure>

        {/* The quote text */}
        <p className="mt-4 text-sm tracking-widest text-neutral-700 sm:text-base">
          {/* We split the quote into letters so each can be animated */}
          {quote.split('').map((letter, index) => (
            <span
              key={index}
              className="inline-block opacity-0" // Start with opacity-0
              data-letter
            >
              {/* Preserve spaces */}
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </p>
      </div>
    </main>
  );
}