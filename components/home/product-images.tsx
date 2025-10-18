import { DesktopGrid } from "./desktop-grid";
import { MobileList } from "./mobile-list";
import { BackgroundTransition } from "../shared/background-transition";

// Los datos se mantienen aquí para ser pasados a los componentes hijos.
const productData = [
  {
    name: "Morning Spark",
    path: "/products/morning-spark",
    productImage: "https://picsum.photos/seed/m_pi/400/600",
    hoverProductImage: "https://picsum.photos/seed/m_hpi/400/600",
  },
  {
    name: "Twilight Calm",
    path: "/products/twilight-calm",
    productImage: "https://picsum.photos/seed/e_pi/400/600",
    hoverProductImage: "https://picsum.photos/seed/e_hpi/400/600",
  },
  {
    name: "Zenith Bloom",
    path: "/products/zenith-bloom",
    productImage: "https://picsum.photos/seed/a_pi/400/600",
    hoverProductImage: "https://picsum.photos/seed/a_hpi/400/600",
  },
  {
    name: "Eternal Glow",
    path: "/products/eternal-glow",
    productImage: "https://picsum.photos/seed/t_pi/400/600",
    hoverProductImage: "https://picsum.photos/seed/t_hpi/400/600",
  },
];

export const ProductImages = () => {
  return (
    <div>
      <BackgroundTransition />
      {/* Se muestra en pantallas medianas y superiores */}
      <DesktopGrid products={productData} />
      {/* Se muestra solo en pantallas pequeñas */}
      <MobileList products={productData} />
    </div>
  );
};
