'use client';


import LogoIcon from '../icons/logo'; // Make sure this path is correct

interface GalleryLoaderProps {
  className?: string;
  quote?: string;
}

export function GalleryLoader({
  className,
  quote = 'Clearing the vision...' // "Clearing the vision..." in Spanish
}: GalleryLoaderProps) {
  

  return (
    <div
      className={`flex items-center justify-center h-96 bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 ${
        className || ''
      }`}
    >
      <div className="flex flex-col items-center text-center">
        {/* This figure animates its width to reveal the logo */}
        <figure className="logo-gallery-loader w-auto overflow-hidden">
          <LogoIcon className="size-[clamp(50px,10vw,80px)] text-black dark:text-white" />
        </figure>

        {/* The quote text */}
        <p className="mt-4 text-sm tracking-widest">
          {/* We split the quote into letters so each can be animated */}
          {quote}
        </p>
      </div>
    </div>
  );
}