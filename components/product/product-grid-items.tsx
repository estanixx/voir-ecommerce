'use client';
// Add this directive to make it a Client Component

import { GridTileImage } from '@/components/grid/tile';
import { Product } from '@/lib/shopify/types';
import Grid from '@/components/grid';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        // These classes are essential for the GSAP animation to find and animate the items
        <Grid.Item key={product.handle} className="grid-item-animate opacity-0">
          <Link
            className="relative inline-block h-full w-full"
            href={`/product/${product.handle}`}
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                availableForSale: product.availableForSale
              }}
              src={product.featuredImage?.url}
              hoverSrc={product.images[1]?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}