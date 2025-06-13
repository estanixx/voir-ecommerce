'use server';

import { TAGS } from '@/lib/constants';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart
} from '@/lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addItem(
  prevState: string | null, // Corrected type
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return 'Error adding item to cart';
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
    // Return null on success to clear any previous error messages
    return null;
  } catch (e) {
    // It's good practice to log the actual error for debugging
    console.error(e);
    return 'Error adding item to cart';
  }
}
export async function removeItem(
  prevState: string | null, // Corrected type
  merchandiseId: string
) {
  // ... (rest of your function)
  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      revalidateTag(TAGS.cart);
      return null; // Return null on success
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    console.error(e);
    return 'Error removing item from cart';
  }
}
export async function updateItemQuantity(
  prevState: string | null, // Corrected from 'object'
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity
          }
        ]);
      }
    } else if (quantity > 0) {
      await addToCart([{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart);
    return null; // Return null on success to clear any previous error message
  } catch (e) {
    console.error(e);
    return 'Error updating item quantity';
  }
}

export async function redirectToCheckout() {
  const cart = await getCart();
  redirect(cart!.checkoutUrl);
}

export async function createCartAndSetCookie() {
  try {
    const cart = await createCart();
    if (!cart || !cart.id) {
      throw new Error('Failed to create cart');
    }
    (await cookies()).set('cartId', cart.id);
    return cart; // Devuelve el carrito creado para su uso posterior
  } catch (error) {
    console.error('Error creating cart:', error);
    throw new Error('Failed to create cart');
  }
}