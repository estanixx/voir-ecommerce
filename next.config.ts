
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tu configuración de Next.js se mantiene aquí
  experimental: {
    useCache: true,
    inlineCss: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
    ],
  },
};

// 2. Envuelve tu configuración de Next.js con la configuración de PWA
export default nextConfig;