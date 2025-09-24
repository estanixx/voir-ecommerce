import ProductList from '@/components/product/product-list';
import { getProductRecommendations } from '@/lib/shopify';

export async function RelatedProductsWhite({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-16 sm:py-24 bg-white">
      <h2 className="mb-6 text-3xl font-bold tracking-tight text-black">Productos relacionados</h2>
      {/* Use your animated ProductList component for a consistent, modern feel */}
      <ProductList
        products={relatedProducts}
        className="grid-cols-2 sm:grid-cols-4 gap-4"
        heightPct={60}
      />
    </div>
  );
}