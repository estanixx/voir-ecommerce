import imageFragment from './image';
import seoFragment from './seo';

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    # --- Start of added metafields ---
    video: metafield(namespace: "custom", key: "video") {
      value
    }
    careInstructions: metafield(namespace: "custom", key: "cuidados") {
      value
    }
    materials: metafield(namespace: "custom", key: "materiales") {
      value
    }
    sizeGuide: metafield(namespace: "custom", key: "guia_de_tallas") {
      value
    }
    # --- End of added metafields ---
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
  ${imageFragment}
  ${seoFragment}
`;

export default productFragment;