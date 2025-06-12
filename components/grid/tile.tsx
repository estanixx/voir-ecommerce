import clsx from "clsx";
import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  // active,
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
        "relative group flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-white hover:border-blue-600 dark:bg-black",
        {
          relative: label,
          // "border-2 border-blue-600": active,
          // "border-neutral-200 dark:border-black": !active,
        }
      )}
    >
      {props.src ? (
        <figure className="relative h-full w-full object-contain group">
          <Image
            className={clsx(
              "relative h-full w-full object-contain opacity-100",
              {
                "transition duration-300 ease-in-out group-hover:scale-105":
                  isInteractive,
                "transition group-hover:opacity-0": !!hoverSrc,
              }
            )}
            {...props}
          />
          {hoverSrc && (
            <Image
              className={clsx(
                " opacity-0 absolute h-full w-full object-contain",
                {
                  "transition duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-100":
                    isInteractive,
                }
              )}
              {...{ ...props, src: hoverSrc }}
            />
          )}
        </figure>
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
          availableForSale={label.availableForSale}
        />
      ) : null}
    </div>
  );
}
