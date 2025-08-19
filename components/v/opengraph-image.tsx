import { ImageResponse } from 'next/og';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { WhiteMonogram } from '@/components/icons/monograms';


export default async function OpengraphImage(
): Promise<ImageResponse> {


  const file = await readFile(join(process.cwd(), '/fonts/Inter-Bold.ttf'));
  const font = Uint8Array.from(file).buffer;

  return new ImageResponse(
    (
      <div
        tw="flex flex-col items-center justify-center w-full h-full bg-black"
        style={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 700,
        }}
      >
        {/* Monogram Icon */}
        <WhiteMonogram className="w-160 h-160 fill-white" />

        {/* Coming Soon */}
        <p tw="text-[48px] text-white mt-4">
          Temporarily Close
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: font,
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}
