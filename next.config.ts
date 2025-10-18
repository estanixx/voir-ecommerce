
/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel.app https://voirstore.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https://cdn.shopify.com https://voirstore.com https://*.vercel.app;
  font-src 'self' https://fonts.gstatic.com;
  media-src 'self' https://cdn.shopify.com;
  connect-src 'self' https://voirstore.com https://*.vercel.app https://backend.addi.com https://ally-portal.addi.com;
  frame-src 'self' https://*.addi.com;
`.replace(/\n/g, '')

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
]

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
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