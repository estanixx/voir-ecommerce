import { getCollectionProducts } from "@/lib/shopify";
import Link from "next/link";
import { GridTileImage } from "./grid/tile";

export async function Carousel({
  collection,
  cols = 4,
  className=''
}: {
  collection: string;
  className?: string;
  cols?: number;
}) {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = products;

  return (
    <div className={`w-full ${products.length === cols ? 'overflow-x-clip' : 'overflow-x-auto'} pb-6 pt-1 ${className}`}>
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => {
          // Find the variant with the highest compareAtPrice for discount display
          const variantWithHighestCompareAt = product.variants.find(variant => 
            variant.compareAtPrice && 
            parseFloat(variant.compareAtPrice.amount) > parseFloat(variant.price.amount)
          );

          return (
            <li
              key={`${product.handle}${i}`}
              className="relative aspect-square h-[30vh] max-h-[275px] flex-none"
              style={{ width: `${100/(cols + 0.1)}%` }} // Ajusta el ancho en función de `cols`
            >
              <Link
                href={`/product/${product.handle}`}
                className="relative h-full w-full"
              >
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                    compareAtAmount: variantWithHighestCompareAt?.compareAtPrice?.amount
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}