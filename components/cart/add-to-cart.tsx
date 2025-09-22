"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem, redirectToCheckout } from "@/components/cart/actions";
import { useProduct } from "@/components/product/product-context";
import { Product, ProductVariant } from "@/lib/shopify/types";
import { useActionState } from "react";
import { useCart } from "./cart-context";

function SubmitButton({
  className,
  availableForSale,
  selectedVariantId,
  actionType = "add-to-cart",
  onClick,
}: {
  className: string;
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  actionType?: "add-to-cart" | "purchase-now";
  onClick?: () => void;
}) {
  const buttonClasses =
    className +
    " relative flex w-full items-center justify-center p-4 tracking-wide";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        No disponible
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        {actionType === "add-to-cart" && (
          <div className="absolute left-0 ml-4">
            <PlusIcon className="h-5" />
          </div>
        )}
        {actionType === "add-to-cart" ? "Agregar a la bolsa" : "Compra ahora"}
      </button>
    );
  }

  return (
    <button
      aria-label={
        actionType === "add-to-cart" ? "Agregar a la bolsa" : "Compra ahora"
      }
      className={clsx(buttonClasses, {
        "hover:opacity-90 cursor-pointer": true,
      })}
      onClick={onClick}
      type={onClick ? "button" : "submit"}
    >
      {actionType === "add-to-cart" && (
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
      )}
      {actionType === "add-to-cart" ? "Agregar a la bolsa" : "Compra ahora"}
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  const handlePurchaseNow = async () => {
    addCartItem(finalVariant, product);
    addItemAction();
    redirectToCheckout();
  };
  const selectedVariant = variant?.selectedOptions[0]?.value;

  return (
    <div className="flex flex-col gap-4 my-5 text-black">
      <div className="flex gap-2">
        {/* Selected variant square */}
        {selectedVariant && (
          <div className="flex size-14 items-center justify-center border border-black">
            <span className="text-lg font-bold">
              {variant?.selectedOptions[0]?.value}
            </span>
          </div>
        )}

        {/* Add to cart form */}
        <form
          action={async () => {
            addCartItem(finalVariant, product);
            addItemAction();
          }}
          className="flex-1"
        >
          <SubmitButton
            availableForSale={availableForSale}
            selectedVariantId={selectedVariantId}
            className="w-full border border-white bg-transparent hover:bg-black hover:text-white transition-colors"
            actionType="add-to-cart"
          />
          <p aria-live="polite" className="sr-only" role="status">
            {message}
          </p>
        </form>
      </div>

      {/* Purchase now button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePurchaseNow();
        }}
      >
        <SubmitButton
          availableForSale={availableForSale}
          selectedVariantId={selectedVariantId}
          className="w-full border border-black bg-black text-white hover:text-white transition-colors"
          actionType="purchase-now"
          onClick={handlePurchaseNow}
        />
      </form>
    </div>
  );
}
