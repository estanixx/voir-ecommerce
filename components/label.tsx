import clsx from 'clsx';
import Price from './price'; // Assuming Price component is in the same directory

const Label = ({
  title,
  amount,
  currencyCode,
  availableForSale = true,
  position = 'bottom',
}: {
  title: string;
  amount: string;
  currencyCode: string;
  availableForSale?: boolean;
  position?: 'bottom' | 'center';
}) => {
  return (
    <>
      {!availableForSale && (
        <div // This div positions the "SOLD OUT" message. It should have a transparent background.
          className={clsx(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full bg-white', // Centering and positioning
            'p-4', // Added padding for better spacing around the text
            {
              // Original positioning adjustments, you might need to tweak these or the parent's @container/label queries
              // 'lg:px-20 lg:pb-[35%]': position === 'center' // This might need reconsideration based on the new centered approach
            }
          )}
        >
          <h3
            className={clsx(
              'font-semibold uppercase leading-none tracking-tight text-center',
              'text-2xl sm:text-3xl md:text-4xl', // Responsive text size, adjust as needed
              'bg-clip-text text-black', // Core Tailwind classes for text clipping
              // IMPORTANT: This class is a placeholder. You need to define it in your global CSS.
              // It should apply the video/texture background that you want to be clipped by the text.
              // If you want the video/texture to be fixed relative to the viewport (like the original `bg-fixed` hint):
              'bg-fixed' // Add this if your `sold-out-video-text-background` is suitable for fixed attachment
            )}
          >
            SOLD OUT
          </h3>
        </div>
      )}
      {( // Ensure the original label only shows if available
        <div
          className={clsx(
            'absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label',
            {
              'lg:px-20 lg:pb-[35%]': position === 'center',
            }
          )}
        >
          <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
            <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
              {title}
            </h3>
            <Price
              className="flex-none rounded-full bg-black p-2 text-white dark:bg-white dark:text-black"
              amount={amount}
              currencyCode={currencyCode}
              currencyCodeClassName="hidden @[275px]/label:inline"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Label;