"use client";

import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LoadingDots from "@/components/loading-dots";
import Price from "@/components/price";
import { DEFAULT_OPTION } from "@/lib/constants";
import { createUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

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
    <>
      <button
        aria-label="Abrir carrito"
        className="cursor-pointer relative group"
        onClick={openCart}
      >
        <OpenCart quantity={cart?.totalQuantity} />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-100">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[420px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xl font-bold">Mi Carrito</p>
                <button
                  aria-label="Cerrar carrito"
                  onClick={closeCart}
                  className="hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full p-1 transition-colors"
                >
                  <CloseCart />
                </button>
              </div>

              {error ? (
                <div className="mt-10 p-4 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              ) : !cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16 text-neutral-400 dark:text-neutral-600" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Tu carrito está vacío
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden">
                  <ul className="grow overflow-auto py-2 divide-y divide-neutral-200 dark:divide-neutral-700">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title
                        )
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(
                          ({ name, value }) => {
                            if (value !== DEFAULT_OPTION) {
                              merchandiseSearchParams[name.toLowerCase()] =
                                value;
                            }
                          }
                        );

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams)
                        );

                        return (
                          <li key={i} className="py-4">
                            <div className="relative flex w-full flex-row justify-between">
                              <div className="absolute z-40 -top-2">
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                              <div className="flex flex-row gap-4">
                                <div className="relative h-20 w-20 overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
                                  <Image
                                    priority={true}
                                    className="h-full w-full object-cover"
                                    width={80}
                                    height={80}
                                    alt={
                                      item.merchandise.product.featuredImage
                                        .altText ||
                                      item.merchandise.product.title
                                    }
                                    src={
                                      item.merchandise.product.featuredImage.url
                                    }
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <Link
                                    href={merchandiseUrl}
                                    onClick={closeCart}
                                    className="font-medium hover:text-blue-600 transition-colors"
                                  >
                                    {item.merchandise.product.title}
                                  </Link>
                                  {item.merchandise.title !== DEFAULT_OPTION ? (
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                      {item.merchandise.title}
                                    </p>
                                  ) : null}

                                  <div className="mt-2 flex items-center">
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
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <Price
                                  className="font-medium"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={
                                    item.cost.totalAmount.currencyCode
                                  }
                                />
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>

                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Subtotal
                      </p>
                      <Price
                        className="font-medium"
                        amount={cart.cost.subtotalAmount.amount}
                        currencyCode={cart.cost.subtotalAmount.currencyCode}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Envío
                      </p>
                      <p className="font-medium">Gratis</p>
                    </div>
                    <div className="mb-4 flex items-center justify-between border-t border-neutral-200 pt-3 dark:border-neutral-700">
                      <p className="font-bold">Total</p>
                      <Price
                        className="text-lg font-bold"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>

                    <form action={redirectToCheckout}>
                      <CheckoutButton />
                    </form>

                    <button
                      onClick={closeCart}
                      className="mt-3 w-full rounded-lg border border-neutral-200 px-4 py-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors"
                    >
                      Seguir comprando
                    </button>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-black transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
      <XMarkIcon className={clsx("h-5", className)} />
    </div>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="block w-full rounded-lg bg-blue-600 p-3 text-center font-medium text-white opacity-90 hover:opacity-100 disabled:opacity-70 transition-opacity"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : "Finalizar compra"}
    </button>
  );
}
