import { ImageResponse } from "next/og";
import LogoIcon from "./icons/logo";
import { join } from "path";
import { readFile } from "fs/promises";

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME,
    },
    ...props,
  };

  const file = await readFile(join(process.cwd(), "/fonts/FieldGothic15.woff"));

  const font = Uint8Array.from(file).buffer;

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-black relative">
        <img
          width={1200}
          height={630}
          src={'https://cdn.shopify.com/s/files/1/0903/2145/3419/files/landing-bg.png?v=1755715275'}
          alt="OG Background"
          tw="absolute top-0 left-0 w-full h-full"
        />
        <p tw="mb-[-20px] mt-12 text-[25vh] font-bold text-white tracking-wide scale-x-150 uppercase">
          {title}
        </p>
        <div tw="mt-[-20px] flex flex-none items-center justify-center h-[160px] w-[160px] rounded-3xl">
          <LogoIcon fill="white" width="164px" />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "FieldGothic15",
          data: font,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
