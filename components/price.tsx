import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'USD',
  currencyCodeClassName,
  compareAtAmount,
  showDiscount = false,
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
  compareAtAmount?: string;
  showDiscount?: boolean;
} & React.ComponentProps<'p'>) => {
  const hasDiscount = compareAtAmount && parseFloat(compareAtAmount) > parseFloat(amount);

  return (
    <div
      data-block-id="price"
      data-block-type="price"
      suppressHydrationWarning={true}
      className={clsx(className, 'product-info__block-item price-list price-list--product')}
    >
      {hasDiscount && showDiscount && (
        <span className="line-through text-red-600 mr-2">
          {`${new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currencyCode,
            currencyDisplay: 'narrowSymbol',
          }).format(parseFloat(compareAtAmount))}`}
        </span>
      )}
      <span className={hasDiscount && showDiscount ? ' font-semibold' : ''}>
        {`${new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: currencyCode,
          currencyDisplay: 'narrowSymbol',
        }).format(parseFloat(amount))}`}
      </span>
      <span className={clsx('ml-1 inline money', currencyCodeClassName)}>{currencyCode}</span>
    </div>
  );
};

export default Price;
