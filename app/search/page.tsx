
import ProductList from '@/components/product/product-list';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/shopify';
import { type Metadata } from 'next';

// This function dynamically generates metadata based on the search query
export async function generateMetadata({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { q: searchValue } = await searchParams as { [key: string]: string };
  const isSearchQuery = !!searchValue;

  // Dynamically set the title and description if there is a search query
  const title = isSearchQuery ? `Resultados de búsqueda para "${searchValue}"` : 'Búsqueda';
  const description = isSearchQuery
    ? `Encuentra los mejores productos relacionados con "${searchValue}" en Voir.`
    : 'Encuentra lo que buscas en Voir.';

  return {
    title,
    description,
    // Prevent indexing of the generic /search page, but allow indexing of results
    robots: {
      index: isSearchQuery,
      follow: isSearchQuery
    },
    alternates: {
      canonical: '/search' // The canonical URL for all search variations
    }
  };
}

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  let products = await getProducts({ sortKey, reverse, query: searchValue });
  const bundles = products.filter((product) => product.handle.toLowerCase().startsWith('bundle'));
  products = products.filter((product) => !product.handle.toLowerCase().startsWith('bundle'));
  const resultsText = products.length > 1 ? 'resultados' : 'resultado';

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? 'No hay productos que coincidan '
            : `Mostrando ${products.length} ${resultsText} para `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <ProductList products={products}/>
      ) : null}
      {bundles.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Bundles</h2>
        <ProductList products={bundles}/>
        </div>
      ) : null}
    </>);
}
