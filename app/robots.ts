import { SITE } from "@/lib/seo";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/v/*',  // Disallow indexing of the landing page if it's not meant for public discovery
          '/*?*',   // Prevent indexing of URL parameters to avoid duplicate content
        ]
      },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url
  };
}
