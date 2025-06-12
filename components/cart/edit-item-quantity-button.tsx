'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { updateItemQuantity } from '@/components/cart/actions';
import type { CartItem } from '@/lib/shopify/types';
import { useActionState } from 'react';

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
  return (
    <button
      type="submit"
      aria-label={
        type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'
      }
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'ml-auto': type === 'minus'
        }
      )}
    >
      {type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}
export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate
}: {
  item: CartItem;
  type: 'plus' | 'minus';
  optimisticUpdate: (merchandiseId: string, type: 'plus' | 'minus') => void;
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null);
  
  // Find the current variant in the product's variants
  const currentVariant = item.merchandise.product.variants.edges.find(
    (edge: { node: { id: string } }) => edge.node.id === item.merchandise.id
  )?.node;
  console.log(currentVariant)
  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
  };

  const updateItemQuantityAction = formAction.bind(null, payload);

  // Check if we can increase quantity (variant must be available)
  const canIncrease = type !== 'plus' || (currentVariant?.availableForSale ?? false);

  return (
    <form
      action={async () => {
        if (canIncrease) {
          optimisticUpdate(payload.merchandiseId, type);
          updateItemQuantityAction();
        }
      }}
    >
      <SubmitButton 
        type={type} 
        disabled={type === 'plus' && !canIncrease}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}