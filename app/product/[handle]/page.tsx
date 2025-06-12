import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

import { GridTileImage } from "@/components/grid/tile";
import { Gallery } from "@/components/product/gallery";
import { ProductDescription } from "@/components/product/product-description";
import { VerticalVideoPlayer } from "@/components/product/video-player"; // Assuming this is the path
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import { Image as ShopifyImage } from "@/lib/shopify/types"; // Renamed to avoid conflict
import { ProductProvider } from "../../../components/product/product-context";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  // --- Mock Video Data ---
  // In a real application, this would come from your Shopify product data,
  // likely from a metafield or the new media types.
  // Example: const productVideoSrc = product.metafields?.find(mf => mf.key === 'video_url')?.value;
  const productVideoSrc = "/videos/sample-product-video.mp4"; // Replace with a real video path for testing

  // const productJsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "Product",
  //   name: product.title,
  //   description: product.description,
  //   image: product.featuredImage.url,
  //   offers: {
  //     "@type": "AggregateOffer",
  //     availability: product.availableForSale
  //       ? "https://schema.org/InStock"
  //       : "https://schema.org/OutOfStock",
  //     priceCurrency: product.priceRange.minVariantPrice.currencyCode,
  //     highPrice: product.priceRange.maxVariantPrice.amount,
  //     lowPrice: product.priceRange.minVariantPrice.amount,
  //   },
  // };

  return (
    <ProductProvider>
      <div className="bg-black text-white">
        {/* The top gallery acts as a full-width hero element */}
        <div className="w-full z-10 mt-20 bg-black">
          <Suspense fallback={<div className="h-[50vh] w-full bg-black" />}>
            <Gallery
              className="w-full"
              images={product.images.slice(0, 5).map((image: ShopifyImage) => ({
                src: image.url,
                altText: image.altText,
              }))}
            />
          </Suspense>
        </div>

        {/* The main content is wrapped in a container and styled as a card */}
        <div className="z-40 w-full px-4 sm:px-6 lg:px-8 text-black">
          <div className="mt-5 lg:mt-10 bg-white w-full p-6 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row lg:gap-16">
              {/* Left Column: Video Player or Fallback Image */}
              <div className="h-full w-full basis-full lg:basis-3/5">
                {productVideoSrc ? (
                  <VerticalVideoPlayer src={productVideoSrc} />
                ) : (
                  <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden rounded-lg">
                    <GridTileImage
                      alt={product.title}
                      src={product.featuredImage?.url}
                      fill
                      sizes="(min-width: 1024px) 66vw, 100vw"
                    />
                  </div>
                )}
              </div>

              {/* Right Column: Product Details */}
              <div className="basis-full lg:basis-2/5 mt-8 lg:mt-0">
                <Suspense fallback={null}>
                  <ProductDescription product={product} />
                </Suspense>
              </div>
            </div>
          </div>
          <RelatedProducts id={product.id} />
        </div>
      </div>
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-16 sm:py-24">
      <h2 className="mb-6 text-3xl font-bold tracking-tight text-white">
        Related Products
      </h2>
      <ul className="flex w-full gap-4 overflow-x-auto pb-4 pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="group relative h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                className="transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
