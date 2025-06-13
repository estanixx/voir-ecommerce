'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { removeItem } from '@/components/cart/actions';
import type { CartItem } from '@/lib/shopify/types';
import { useActionState, useTransition } from 'react';

export function DeleteItemButton({
  item,
  optimisticUpdate
}: {
  item: CartItem;
  // This is the fix: explicitly define the function's type
  optimisticUpdate: (merchandiseId: string, action: 'delete') => void;
}) {
  // useTransition is helpful for pending UI states, though not strictly required to fix the error
  const [isPending, startTransition] = useTransition();
  const [message, formAction] = useActionState(removeItem, null);
  const merchandiseId = item.merchandise.id;

  return (
    <form
      action={() => {
        startTransition(() => {
          // Optimistically update the UI first
          optimisticUpdate(merchandiseId, 'delete');
          // Then call the server action
          formAction(merchandiseId);
        });
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        disabled={isPending} // Disable button while the action is pending
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500 disabled:opacity-70"
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
