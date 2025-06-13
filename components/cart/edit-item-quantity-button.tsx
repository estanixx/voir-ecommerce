'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { updateItemQuantity } from '@/components/cart/actions';
import type { CartItem } from '@/lib/shopify/types';
import { useActionState, useTransition } from 'react';

// FIX: Added 'disabled' prop
function SubmitButton({ type, disabled }: { type: 'plus' | 'minus'; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled} // Apply the disabled prop
      aria-label={
        type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'
      }
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'ml-auto': type === 'minus',
          'cursor-not-allowed': disabled // Add a style for the disabled state
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
  const [isPending, startTransition] = useTransition();

  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1
  };
  
  // The original component was missing this logic for the button's disabled state
  const isAvailable = item.merchandise.availableForSale;
  // Disable the plus button if the variant is not available for sale.
  const isDisabled = type === 'plus' && !isAvailable;

  return (
    <form
      action={() => {
        if (isDisabled) return;
        
        startTransition(() => {
          optimisticUpdate(payload.merchandiseId, type);
          formAction(payload);
        });
      }}
    >
      <SubmitButton 
        type={type} 
        disabled={isPending || isDisabled}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}