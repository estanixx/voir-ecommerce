"use client";
import clsx from "clsx";
import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  hoverSrc,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  hoverSrc?: string;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
    availableForSale?: boolean;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        "group relative flex h-full w-full items-center justify-center overflow-hidden bg-white shadow-md transition-all duration-300 ease-in-out hover:shadow-xl dark:bg-zinc-900",
        {
          "border-2 border-blue-600": active,
          "border border-neutral-200 dark:border-zinc-800": !active,
        }
      )}
    >
      {props.src ? (
        <>
          <Image
            priority={true}
            className={clsx(
              "relative h-full w-full transform object-cover transition-all duration-300 ease-in-out",
              {
                "group-hover:scale-105": isInteractive,
                "group-hover:opacity-0": !!hoverSrc,
              }
            )}
            {...props}
          />
          {hoverSrc && (
            <Image
              priority={true}
              className="absolute inset-0 h-full w-full transform object-cover opacity-0 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-100"
              src={hoverSrc}
              alt={props.alt}
              fill
            />
          )}
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-zinc-800">
          <span className="text-sm text-gray-500 dark:text-zinc-400">
            No Image
          </span>
        </div>
      )}
      {label && (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
          availableForSale={label.availableForSale}
        />
      )}
    </div>
  );
}
