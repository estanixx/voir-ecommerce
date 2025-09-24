import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'USD',
  currencyCodeClassName,
  compareAtAmount,
  showDiscount = false
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
    <p suppressHydrationWarning={true} className={clsx(className)}>
      {hasDiscount && showDiscount && (
        <span className="line-through text-red-600 mr-2">
          {`${new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: currencyCode,
            currencyDisplay: 'narrowSymbol'
          }).format(parseFloat(compareAtAmount))}`}
        </span>
      )}
      <span className={hasDiscount && showDiscount ? ' font-semibold' : ''}>
        {`${new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: currencyCode,
          currencyDisplay: 'narrowSymbol'
        }).format(parseFloat(amount))}`}
      </span>
      <span className={clsx('ml-1 inline', currencyCodeClassName)}>{currencyCode}</span>
    </p>
  );
};

export default Price;
