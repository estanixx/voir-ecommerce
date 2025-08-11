'use server';
import { ImageResponse } from 'next/og';
import LogoIcon from '@/components/icons/logo';
import { join } from 'path';
import { readFile } from 'fs/promises';

const size = {
  width: 1200,
  height: 630
};

export default async function Image() {
  const file = await readFile(join(process.cwd(), '/fonts/Inter-Bold.ttf'));
  const font = Uint8Array.from(file).buffer;

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
        <div tw="flex flex-none items-center justify-center border border-neutral-700 h-[160px] w-[160px] rounded-3xl">
          <LogoIcon width="64" height="58" fill="white" />
        </div>
        <p tw="mt-12 text-6xl font-bold text-white">VOIR</p>
        <p tw="mt-6 text-3xl text-white">Coming Soon</p>
      </div>
    ),
    {
      ...size,
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