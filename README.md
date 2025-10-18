# Voir — E-commerce storefront

Comprehensive documentation for the Voir e-commerce storefront. This project is a Next.js application (App Router) using TypeScript, Tailwind CSS and several integrations (Shopify storefront, newsletter, and lightweight client-side cart). The repository contains multiple storefront layouts (classic ecommerce, white background variant, and a simple landing area) and a component-first architecture.

## Quick project summary

- Framework: Next.js (app/ directory, App Router)
- Language: TypeScript
- Styling: Tailwind CSS + PostCSS
- CMS / Store: Shopify Storefront API (GraphQL) — see `lib/shopify`
- State: React Context for cart & product contexts (components/cart and components/product)
- Bundler / Tooling: Vite-like plugin ecosystem via Next.js (see `next.config.ts`), ESLint, TypeScript

## Purpose and scope

This repository implements the front-end storefront for Voir. It provides product listing pages, product detail pages with image galleries, cart interactions (add/edit/remove), newsletter capture, and SEO/opengraph image generation points. The app is optimized for both desktop and mobile experiences and uses Tailwind for rapid UI composition.

## Integrations

- Shopify Storefront API

  - Location: `lib/shopify/index.ts`, `lib/shopify/queries`, `lib/shopify/mutations`, `lib/shopify/fragments`
  - Purpose: fetch products, collections, pages and perform cart/checkout operations where required. The store-side GraphQL queries and fragments are centralized under `lib/shopify`.

- Newsletter / Email capture

  - Location: components/home/newsletter-form.tsx, components/v/newsletter-form.tsx, api/newsletter-form
  - Purpose: capture emails. The project contains server-side routes under `api/newsletter-form` for handling form submissions and revalidation hooks.


- Analytics / Third-party scripts
  - The project contains placeholders for analytics and opengraph generation images (`components/opengraph-image.tsx`, `app/(ecommerce)/opengraph-image.tsx`) used for social previews and SEO.

## File structure overview

Top-level files

- `app/` — Next.js App Router pages, layouts and route segments. This is the canonical place for pages and route-level UI.
- `components/` — Reusable UI components and smaller building blocks (carousel, product components, UI primitives, icons).
- `lib/` — Utilities, constants, SEO helpers and Shopify client code.
- `hooks/` — Custom React hooks (e.g. `useIsMobile.ts`).
- `fonts/` — Font loader(s).
- `public/` — Static assets, resources and images.

Key directories and what they contain

- `app/`

  - `globals.css` — Tailwind base styles and global CSS.
  - `layout.tsx` — Root layout for the application.
  - `error.tsx`, `loading.tsx` — Error and loading UI for the app router.
  - `(ecommerce)/`, `(ecommerce-whitebg)/`, `(landing)/` — Multiple route groups representing alternate storefront designs and the landing area. Each contains their own layouts and opengraph-image.tsx for social image generation.
  - `api/` — Serverless endpoints (newsletter, revalidate, etc.) under `app/api` or top-level `api` depending on the route.

- `components/`

  - `cart/` — Cart UI and logic.
    - `cart-context.tsx` — React context for cart state management.
    - `actions.ts` — Helpers for cart actions (server or client rules depending on implementation).
    - `add-to-cart.tsx`, `open-cart.tsx`, `modal.tsx` — Cart interactions.
  - `product/` — Product-specific components.
    - `product-context.tsx` — Context for active product state (variant, quantity).
    - `product-details.tsx`, `gallery.tsx`, `product-list.tsx` — core product UI.
  - `layout/` — Shared layout components (navbar, footer, loading-screen)
  - `ui/` — Design-system primitives like `button.tsx`, `input.tsx`, `dialog.tsx`, `select.tsx` and wrappers for third-party UI libs.
  - `home/` — Components for the home page, hero sections and newsletter modals.
  - `icons/` — SVG icon components.

- `lib/`

  - `constants.ts` — App-level constants and feature flags.
  - `seo.ts` — Helpers for SEO meta tags and Open Graph data.
  - `utils.ts` — Generic utilities used across the app.
  - `shopify/` — Entry point to Shopify client and typed GraphQL helpers.

- `fonts/` — Font exports to be consumed in layout for performance.
- `hooks/` — Reusable React hooks.

## Pages, routes and special files

This project uses the Next.js App Router (the `app/` directory). Important routes and their purpose:

- `/` — Root page. Implemented in `app/(ecommerce)/page.tsx` or `app/(landing)/v/landing-page.tsx` depending on which folder is used as the root in your route grouping.
- `/product/[handle]` — Product detail pages live under `app/(ecommerce)/product` or `app/(ecommerce)/[page]` nested layouts. These use `components/product/*` to render galleries, variant selectors and details.
- `/shop` or `/shop/[collection]` — Collection listing pages for collections; see `app/(ecommerce-whitebg)/shop/` folder that contains `page.tsx` and a `[collection]` subfolder for collection-specific views.
- `/api/newsletter-form` — API endpoint for newsletter signups (server-side form handlers live in `api/newsletter-form`).
- `/robots.txt` and `/sitemap.xml` — SEO files generated under `app/robots.ts` and `app/sitemap.ts`.

Note: The repository contains two visual variants for the storefront: `(ecommerce)` and `(ecommerce-whitebg)`. These are route groups — Next.js allows multiple named folders to co-exist and be used as separate parts of the app. Each variant provides its own layout, Open Graph image generator and child pages.

## Components and patterns

- Component-first: small, composable components in `components/` grouped by feature.
- Context-driven product & cart: `components/product/product-context.tsx` and `components/cart/cart-context.tsx` keep UI and business logic separated from presentation.
- Server & client split: Next.js server components are used for data fetching where possible; interactive bits (cart, quantity controls, modals) are client components.
- SEO: Central helpers in `lib/seo.ts` plus per-route opengraph-image components for dynamic social images.

## Development setup

Prerequisites

- Node.js (LTS, e.g. 18.x or 20.x) installed locally
- Yarn or npm (project `package.json` is present; use the package manager you prefer)

Install

1. Install dependencies

```bash
# from project root
npm install
# or
yarn
```

2. Environment variables

Create a `.env.local` in the project root (not committed to git). Example variables required by the project:

```
# Company information
COMPANY_NAME=
SITE_NAME=
SHOPIFY_STORE_DOMAIN=
CUSTOMER_DEFAULT_PASSWORD=
PREACCESS_CODE=
PASSCODE_LOCALSTORAGE_KEY=
PRESALE_DATE=
SALE_DATE=

# Optional: preview/preview secret used for revalidate endpoints
WHATSAPP_CONTACT=
INSTAGRAM_CONTACT=
TIKTOK_CONTACT=

# Shopify Storefront API
SHOPIFY_REVALIDATION_SECRET=
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
SHOPIFY_ADMIN_ACCESS_TOKEN=

```

3. Run the dev server

```bash
npm run dev
# or
yarn dev
```

4. Build and start for production

```bash
npm run build
npm run start
```

## Scripts (package.json)

Common scripts you will find in `package.json`:

- `dev` — Starts Next.js in development mode
- `build` — Builds the app for production
- `start` — Starts the production server after build
- `lint` — Runs ESLint

Run `cat package.json` to confirm exact scripts.

## Testing and quality gates

This repository includes TypeScript and ESLint config. There are no included unit tests in the current tree. Suggested minimal quality gates:

- Type-check: `npm run build` or `tsc --noEmit`
- Lint: `npm run lint`

If you add tests, prefer Jest or Vitest. Place tests next to modules or under `tests/`.

## Known areas to check / Edge cases

- Cart persistence: the cart context likely persists to localStorage. Verify that server-side interactions (if any) are correctly synchronized.
- Large product galleries: lazy-loading images and progressive loading are recommended to improve perceived performance.
- SEO: opengraph-image generation components must be verified during deployment to ensure correct absolute URLs.
- Multi-variant products: ensure `components/product/variant-selector.tsx` handles missing inventory or out-of-stock variants.

## Troubleshooting

- If pages don't render or GraphQL calls fail: check `SHOPIFY_STOREFRONT_ACCESS_TOKEN` and `SHOPIFY_STORE_DOMAIN` in `.env.local`.
- If CSS doesn't apply: make sure Tailwind is configured (`tailwind.config.js`) and `globals.css` is imported in the root layout (`app/globals.css`).
- If builds fail with TypeScript errors: run `tsc --noEmit` to see full errors and fix typed mismatches.

## Security and privacy notes

- Never commit `.env.*` with secrets. Use deployment provider secrets (Vercel, Netlify) for production.
- Audit third-party packages and keep dependencies up to date. Use `npm audit` or GitHub Dependabot.

## Project maintenance & next steps

Here are a few low-risk improvements I recommend:

1. Add a CONTRIBUTING.md with local development and PR guidance.
2. Add an example `.env.example` file with the variable names (no secrets).
3. Add a small test suite (Vitest + React Testing Library) for the cart and product context logic.
4. Add CI (GitHub Actions) to run lint, typecheck and a test runner on PRs.

## Files changed / created in this edit

- `README.md` — Replaced with this documentation.

## Completion summary

I updated the project's `README.md` with an extensive overview covering architecture, integrations, file structure, routes, development steps, and suggested next steps. To finish verification I can:

- run the dev server and confirm the site boots (let me know if you want me to run it)
- create a `.env.example` and a CONTRIBUTING.md

Next step: mark README verification as completed in the todo list and I can implement an `.env.example` file if you'd like.
