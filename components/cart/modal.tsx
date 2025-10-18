"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import LoadingDots from "@/components/loading-dots";
import Price from "@/components/price";
import { DEFAULT_OPTION } from "@/lib/constants";
import { createUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const quantityRef = useRef(cart?.totalQuantity);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie()
        .then(() => {})
        .catch((error) => {
          console.error("Error al crear el carrito:", error);
          setError(
            "Error al cargar el carrito. Por favor, inténtalo de nuevo."
          );
        });
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          aria-label="Abrir carrito"
          className="cursor-pointer relative group"
        >
          <OpenCart quantity={cart?.totalQuantity} />
        </button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-bold text-left">Mi Carrito</DialogTitle>
          <DialogDescription className="sr-only">
            Revisa y modifica los productos en tu carrito de compras
          </DialogDescription>
        </DialogHeader>

        {error ? (
          <div className="mx-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        ) : !cart || cart.lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <ShoppingCartIcon className="h-16 text-neutral-400 dark:text-neutral-600" />
            <p className="mt-6 text-center text-2xl font-bold">
              Tu carrito está vacío
            </p>
            <Button
              onClick={() => setIsOpen(false)}
              className="mt-6"
              variant="default"
            >
              Seguir comprando
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full max-h-[calc(90vh-120px)]">
            <div className="flex-1 overflow-y-auto px-6">
              <div className="space-y-4 py-4">
                {cart.lines
                  .sort((a, b) =>
                    a.merchandise.product.title.localeCompare(
                      b.merchandise.product.title
                    )
                  )
                  .map((item, i) => {
                    const merchandiseSearchParams = {} as MerchandiseSearchParams;

                    item.merchandise.selectedOptions.forEach(
                      ({ name, value }) => {
                        if (value !== DEFAULT_OPTION) {
                          merchandiseSearchParams[name.toLowerCase()] = value;
                        }
                      }
                    );

                    const merchandiseUrl = createUrl(
                      `/products/${item.merchandise.product.handle}`,
                      new URLSearchParams(merchandiseSearchParams)
                    );

                    return (
                      <div key={i} className="relative border-b border-neutral-200 dark:border-neutral-700 pb-4 last:border-b-0">
                        <div className="relative flex w-full flex-row justify-between">
                          <div className="absolute z-40 -top-2 -right-2">
                            <DeleteItemButton
                              item={item}
                              optimisticUpdate={updateCartItem}
                            />
                          </div>
                          <div className="flex flex-row gap-4 flex-1">
                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
                              <Image
                                priority={true}
                                className="h-full w-full object-cover"
                                width={80}
                                height={80}
                                alt={
                                  item.merchandise.product.featuredImage.altText ||
                                  item.merchandise.product.title
                                }
                                src={item.merchandise.product.featuredImage.url}
                              />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <Link
                                href={merchandiseUrl}
                                onClick={() => setIsOpen(false)}
                                className="font-medium hover:text-blue-600 transition-colors truncate"
                              >
                                {item.merchandise.product.title}
                              </Link>
                              {item.merchandise.title !== DEFAULT_OPTION ? (
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                                  {item.merchandise.title}
                                </p>
                              ) : null}

                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex h-8 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">
                                      {item.quantity}
                                    </span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                                <Price
                                  className="font-medium text-sm"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={item.cost.totalAmount.currencyCode}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-700 p-6 space-y-4 bg-neutral-50 dark:bg-neutral-900">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-neutral-600 dark:text-neutral-400">Subtotal</p>
                  <Price
                    className="font-medium"
                    amount={cart.cost.subtotalAmount.amount}
                    currencyCode={cart.cost.subtotalAmount.currencyCode}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-neutral-600 dark:text-neutral-400">Envío</p>
                  <p className="font-medium">Gratis</p>
                </div>
                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">Total</p>
                    <Price
                      className="text-lg font-bold"
                      amount={cart.cost.totalAmount.amount}
                      currencyCode={cart.cost.totalAmount.currencyCode}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <form action={redirectToCheckout}>
                  <CheckoutButton />
                </form>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Seguir comprando
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : "Finalizar compra"}
    </Button>
  );
}
