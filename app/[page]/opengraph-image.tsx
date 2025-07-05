import OpengraphImage from '@/components/opengraph-image';
import { getPage } from '@/lib/shopify';

export default async function Image({ params }: { params: { page: string } }) {
  const pageParams = await params;
  const page = await getPage(pageParams.page);
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
