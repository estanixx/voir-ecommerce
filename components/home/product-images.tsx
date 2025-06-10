import Image from "next/image";
import Link from "next/link";
import { BackgroundTransition } from "../shared/background-transition";

export const ProductImages = () => {
  const data = [
    {
      name: "Morning Spark",
      path: "/product/morning-spark",
      backgroundImage: "https://picsum.photos/seed/m_bg/1200/1800",
      productImage: "https://picsum.photos/seed/m_pi/400/600",
      hoverProductImage: "https://picsum.photos/seed/m_hpi/400/600",
      description: "Ignite your day with a burst of citrus and mint, awakening your senses for what's ahead.",
    },
    {
      name: "Twilight Calm",
      path: "/product/twilight-calm",
      backgroundImage: "https://picsum.photos/seed/e_bg/1200/1800",
      productImage: "https://picsum.photos/seed/e_pi/400/600",
      hoverProductImage: "https://picsum.photos/seed/e_hpi/400/600",
      description: "Settle into the evening with soothing lavender and chamomile notes for ultimate relaxation.",
    },
    {
      name: "Zenith Bloom",
      path: "/product/zenith-bloom",
      backgroundImage: "https://picsum.photos/seed/a_bg/1200/1800",
      productImage: "https://picsum.photos/seed/a_pi/400/600",
      hoverProductImage: "https://picsum.photos/seed/a_hpi/400/600",
      description: "A vibrant floral bouquet to elevate your afternoon and inspire creativity.",
    },
    {
      name: "Eternal Glow",
      path: "/product/eternal-glow",
      backgroundImage: "https://picsum.photos/seed/t_bg/1200/1800",
      productImage: "https://picsum.photos/seed/t_pi/400/600",
      hoverProductImage: "https://picsum.photos/seed/t_hpi/400/600",
      description: "A timeless vanilla and sandalwood blend that offers warmth and comfort anytime.",
    },
  ];

  return (
    // Removed the fixed h-[90vh] from the section.
    // The section will now grow based on the content.
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/80">
      <BackgroundTransition />
      {/*
        - Using gap-px and bg-black on the parent can create thin dividing lines if items have their own background.
        - Or, use standard gap like "gap-1" or "gap-4" if preferred.
      */}
      {data.map((itemData, i) => (
        // Each item wrapper now controls its height to 80vh.
        // The ImageDisplay component has h-full on its root <a> tag, so it will fill this div.
        <div key={i} className="h-[80vh] bg-transparent"> {/* Added bg-gray-900 here, or keep it on section */}
          <ImageDisplay {...itemData} />
        </div>
      ))}
    </section>
  );
};

// The ImageDisplay component remains the same:
const ImageDisplay = ({
  name,
  path,
  backgroundImage,
  productImage,
  hoverProductImage,
  description,
}: {
  name: string;
  path: string;
  backgroundImage: string;
  productImage: string;
  hoverProductImage?: string;
  description?: string;
}) => {
  return (
    <Link href={path} passHref legacyBehavior>
      <a className="relative group overflow-hidden h-full block bg-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50">
        {/* Background Image */}
        {/* <Image
          alt={`${name} background`}
          src={backgroundImage}
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105 z-0"
          priority
        /> */}
        {/* Tint Overlay */}
        <div className="absolute inset-0 bg-transparent opacity-10 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
        {/* Content Block */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4
                        transition-transform duration-500 ease-in-out group-hover:-translate-y-8 z-20">
          {/* Product Images Container */}
          <div className="relative w-3/4 h-2/5 md:w-2/3 md:h-[45%] mb-3 drop-shadow-lg">
            {productImage && (
              <Image
                alt={name}
                src={productImage}
                layout="fill"
                objectFit="contain"
                className="transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0"
              />
            )}
            {hoverProductImage && (
              <Image
                alt={`${name} (hover)`}
                src={hoverProductImage}
                layout="fill"
                objectFit="contain"
                className="transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
              />
            )}
          </div>
          {/* Name */}
          <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold capitalize drop-shadow-md text-center mb-1 md:mb-2">
            {name}
          </h3>
          {/* Description */}
          {description && (
            <div className="text-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-40 overflow-hidden mt-1">
              <p className="text-gray-200 text-xs sm:text-sm drop-shadow px-2 leading-tight">
                {description}
              </p>
            </div>
          )}
        </div>
        {/* Flashlight Effect */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2
                     w-20 md:w-28 h-0 group-hover:h-2/5 md:group-hover:h-1/2 lg:group-hover:h-[60%]
                     opacity-0 group-hover:opacity-100
                     transition-all duration-500 ease-in-out delay-100
                     pointer-events-none z-10"
        >
          <div className="w-full h-full bg-gradient-to-t from-white/60 via-white/25 to-transparent blur-md group-hover:blur-lg rounded-t-full"/>
        </div>
      </a>
    </Link>
  );
};