import Image from "next/image";
import Link from "next/link";


// Componente de tarjeta para escritorio
const DesktopCard = ({
  name,
  path,
  productImage,
  hoverProductImage,
}: {
  name: string;
  path: string;
  productImage: string;
  hoverProductImage: string;
}) => {
  return (
    <Link href={path} className="h-full block">
      <div className="relative group overflow-hidden h-full bg-transparent cursor-pointer">
        {/* Content Block */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-transform duration-500 ease-in-out group-hover:-translate-y-8 z-20">
          {/* Product Images Container */}
          <div className="relative w-3/4 h-2/5 md:w-2/3 md:h-[45%] mb-3 drop-shadow-lg">
            {productImage && (
              <Image
                priority
                alt={name}
                src={productImage}
                fill
                className="transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0 object-contain"
              />
            )}
            {hoverProductImage && (
              <Image
                priority
                alt={`${name} (hover)`}
                src={hoverProductImage}
                fill
                className="transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 object-contain"
              />
            )}
          </div>
          {/* Name */}
          <h3 className={`text-white text-lg md:text-xl lg:text-2xl font-bold capitalize drop-shadow-md text-center`}>
            {name}
          </h3>
        </div>
        {/* Flashlight Effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-0 group-hover:h-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out delay-100 pointer-events-none z-10">
          <div className="w-full h-full bg-gradient-to-t from-white/60 via-white/25 to-transparent blur-md rounded-t-full" />
        </div>
      </div>
    </Link>
  );
};

// Componente de cuadrícula principal para escritorio
export const DesktopGrid = ({ products }: { products: {
  name: string;
  path: string;
  productImage: string;
  hoverProductImage: string;
}[] }) => {
  return (
    <section className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/80">
      {products.map((item, i) => (
        <div key={i} className="h-[80vh] bg-transparent">
          <DesktopCard {...item} />
        </div>
      ))}
    </section>
  );
};