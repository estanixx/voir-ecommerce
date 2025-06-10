import Grid from '@/components/grid';
import ProductGridItems from '@/components/layout/product-grid-items';
import { defaultSort, sorting } from '@/lib/constants';
import { getProducts } from '@/lib/shopify';

export const metadata = {
  title: 'Búsqueda',
  description: 'Conoce nuestros productos.'
};

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
        <Grid className="grid-cols-1 sm:grid-cols-2"> {/* MODIFIED HERE */}
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
      {bundles.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Bundles</h2>
          <Grid className="grid-cols-1 sm:grid-cols-2">
            <ProductGridItems products={bundles} />
          </Grid>
        </div>
      ) : null}
    </>);
}
