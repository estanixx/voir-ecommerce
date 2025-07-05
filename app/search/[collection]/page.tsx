import { getCollection, getCollectionProducts } from "@/lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";


import { defaultSort, sorting } from "@/lib/constants";
import ProductList from "@/components/product/product-list";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `Productos de ${collection.title}`,
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
    <section className="">
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No se encontraron productos de esta colección`}</p>
      ) : (
        <ProductList products={bundles} />
      )}
      {bundles.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Bundles</h2>
          <ProductList products={bundles} />
        </div>
      ) : null}
    </section>
  );
}
