export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const TAGS = {
  metaobjects: 'metaobjects',
  collections: 'collections',
  products: 'products',
  cart: 'cart'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';
export const SHOPIFY_GRAPHQL_NEW_API_ENDPOINT = '/api/2025-07/graphql.json';
export const PRESALE_DATE = new Date(process.env.PRESALE_DATE || '');
export const SALE_DATE = new Date(process.env.SALE_DATE || '');

export const ENVIOS = `
<div class="prose">
  <h2>Envíos</h2>
  <ul>
    <li>Procesamiento en <strong>2 días hábiles</strong>.</li>
    <li><strong>Gratis en Colombia</strong>, salvo zonas especiales.</li>
    <li><strong>Internacional:</strong> el cliente paga.</li>
    <li>Entrega: <strong>2-7 días hábiles</strong> (Colombia).</li>
    <li>Incluye <strong>guía de rastreo</strong>.</li>
  </ul>

  <h2>Devoluciones y Cambios</h2>
  <ul>
    <li>Solo por <strong>defecto de fábrica</strong> (15 días).</li>
    <li><strong>No aplica en promociones</strong>.</li>
    <li>Cliente paga <strong>envíos</strong>.</li>
    <li>Producto debe estar <strong>sin uso y en perfecto estado</strong>.</li>
    <li>Reembolso en máximo <strong>8 días</strong>.</li>
    <li>No aplica por <strong>mal uso, señales de uso o desgaste</strong>.</li>
  </ul>
</div>
`