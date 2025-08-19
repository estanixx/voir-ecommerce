import { getCollection, getCollectionProducts } from "@/lib/shopify";
import { Metadata } from "next";

import { defaultSort, sorting } from "@/lib/constants";
import ProductList from "@/components/product/product-list";
import { SITE } from "@/lib/seo";
type Props = { params: Promise<{ collection: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paramsRes = await params;
  const collection = await getCollection(paramsRes.collection);
  const url = `${SITE.url}/shop/${paramsRes.collection}`;

  return {
    title: collection?.seo?.title || collection?.title || "Colección",
    description:
      collection?.seo?.description ||
      collection?.description ||
      SITE.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: collection?.title || "Colección",
      description: collection?.description || SITE.description,
      images: [{ url: collection?.image?.url || SITE.ogImage }],
    },
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const collection = await getCollection(params.collection);
  const ldBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: collection?.title || "Colección",
        item: `${SITE.url}/shop/${params.collection}`,
      },
    ],
  };
  let products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
  });
  const bundles = products.filter((product) =>
    product.handle.toLowerCase().startsWith("bundle")
  );
  products = products.filter(
    (product) => !product.handle.toLowerCase().startsWith("bundle")
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }}
      />
      <section className="">
        {products.length === 0 &&
        collection?.title &&
        collection?.description ? (
          <p className="py-3 text-lg">{`No se encontraron productos de esta colección`}</p>
        ) : (
          <>
            <div className="my-6">
              <h1 className="text-3xl font-bold mb-4 text-white">
                {collection?.title}
              </h1>
              <p className="text-white">{collection?.description}</p>
            </div>
            <ProductList products={products} />
          </>
        )}
        {bundles.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Bundles</h2>
            <ProductList products={bundles} />
          </div>
        ) : null}
      </section>
    </>
  );
}
