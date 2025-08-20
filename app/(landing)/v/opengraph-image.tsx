
import OpengraphImage from '@/components/opengraph-image';
// Image metadata
export const alt = 'Coming Soon...'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return await OpengraphImage({ title: 'Coming Soon...' });
}
