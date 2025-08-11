import { baseUrl } from '@/lib/utils';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/v/*',  // Disallow indexing of the landing page if it's not meant for public discovery
          '/*?*',   // Prevent indexing of URL parameters to avoid duplicate content
        ]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}
