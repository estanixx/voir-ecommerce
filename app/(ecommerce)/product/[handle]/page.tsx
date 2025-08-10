import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { Gallery } from '@/components/product/gallery';
import { getProduct } from '@/lib/shopify';
import { Image as ShopifyImage } from '@/lib/shopify/types';
import { ProductProvider } from '@/components/product/product-context';
import { RelatedProducts } from '@/components/product/related-products';
import { HIDDEN_PRODUCT_TAG } from '@/lib/constants';
import { ProductDetails } from '@/components/product/product-details';

// Metadata function remains largely the same, but with cleaner props
export async function generateMetadata({
  params
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const product = await getProduct((await params).handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: { index: indexable, follow: indexable }
    },
    openGraph: url ? { images: [{ url, width, height, alt }] } : null
  };
}

// The main Product Page component
export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  // Fetch product and recommendations in parallel for faster loads
  const [product] = await Promise.all([getProduct((await params).handle)]);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <ProductProvider>
      {/* Add the JSON-LD script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="bg-black text-white">
        <div className="w-full z-10 mt-20 bg-black">
          <Gallery
            className="w-full"
            images={product.images.slice(0, 5).map((image: ShopifyImage) => ({
              src: image.url,
              altText: image.altText
            }))}
          />
        </div>

        <ProductDetails product={product} />
        <div className="z-40 w-full px-4 sm:px-6 lg:px-8 text-black">
          {/* Wrap RelatedProducts in Suspense for non-blocking UI */}
          <Suspense fallback={<div className="h-[50vh]" />}>
            <RelatedProducts id={product.id} />
          </Suspense>
        </div>
      </div>
    </ProductProvider>
  );
}