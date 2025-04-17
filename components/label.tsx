import clsx from "clsx";
import Price from "./price";

const Label = ({
  title,
  amount,
  currencyCode,
  availableForSale = true,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  availableForSale?: boolean;
  position?: "bottom" | "center";
}) => {
  return (
    <>
      {!availableForSale && (
        <div
          className={clsx(
            "absolute top-0 left-0 flex px-4 pb-4 @container/label uppercase w-full text-white",
            {
              "lg:px-20 lg:pb-[35%]": position === "center",
            }
          )}
        >
          <div className="flex items-center rounded-full border bg-red-900 mt-3 p-1 text-xs font-semibold text-white backdrop-blur-md">
            <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
              SOLD OUT
            </h3>
          </div>
        </div>
      )}
      <div
        className={clsx(
          "absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label",
          {
            "lg:px-20 lg:pb-[35%]": position === "center",
          }
        )}
      >
        <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md">
          <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
            {title}
          </h3>
          <Price
            className="flex-none rounded-full bg-black p-2 text-white"
            amount={amount}
            currencyCode={currencyCode}
            currencyCodeClassName="hidden @[275px]/label:inline"
          />
        </div>
      </div>
    </>
  );
};

export default Label;
