import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md transition-colors ">
      <ShoppingBagIcon
        className={clsx('h-6 transition-all ease-in-out hover:scale-110', className)}
      />

      {quantity ? (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
          {quantity}
        </span>
      ) : null}
    </div>
  );
}
