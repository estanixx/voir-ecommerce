import OpengraphImage from '@/components/opengraph-image';
import { getCollection } from '@/lib/shopify';

export default async function Image({
  params
}: {
  params: Promise<{ collection: string }>;
}) {
  const collection = await getCollection((await params).collection);
  const title = collection?.seo?.title || collection?.title;

  return await OpengraphImage({ title });
}
