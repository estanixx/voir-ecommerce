import Image from "next/image";
import Link from "next/link";

const HomeImage = ({
  filename,
  message,
}: {
  filename: string;
  message: string;
}) => {
  return (
    <Link className="group relative block w-1/3" href="/shop/Iluminare">
      <div
        className="absolute w-full h-full bg-black opacity-0 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: "rgb(0, 0, 0, 0.6)" }}
      >
        <figcaption className="text-xs absolute top-1/2 left-1/2 font-medium transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          {message}
        </figcaption>
      </div>
      <Image
        priority={true}
        src={`https://cdn.shopify.com/s/files/1/0903/2145/3419/files/${filename}.jpg`}
        alt="Illuminare"
        width={6000}
        height={4000}
        className="object-cover"
      />
    </Link>
  );
};

export const HomeImages = () => {
  const images = [
    {
      filename: "home1",
      msg: "Brilla sin miedo, el universo es tuyo.",
    },
    {
      filename: "home2",
      msg: "Cada amanecer es una nueva oportunidad para iluminar el mundo.",
    },
    {
      filename: "home3",
      msg: "Tu luz es única, deja que guíe tu camino.",
    },
  ];
  return (
    <nav className="flex w-full">
      {images.map(({ filename, msg }) => (
        <HomeImage key={filename} filename={filename} message={msg} />
      ))}
    </nav>
  );
};
