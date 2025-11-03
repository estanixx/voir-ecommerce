import { AddToCart } from '@/components/cart/add-to-cart';
import Price from '@/components/price';
import Prose from '@/components/prose';
import { Product } from '@/lib/shopify/types';
import { VariantSelector } from './variant-selector';
import { SwatchBook as Fabric, Package, WashingMachine as Droplet } from 'lucide-react'; // Import icons from Lucide (similar to shadcn)
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { complementary } from '@/fonts';
import { ENVIOS } from '@/lib/constants';

function InfoItem({
  icon: Icon,
  text,
  info,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  info?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="text-white cursor-pointer">
          <Icon className="h-4 w-4 mr-2" />
          <span className="text-sm">{text}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] z-[100]">
        <DialogHeader>
          <DialogTitle>{text}</DialogTitle>
        </DialogHeader>
        <div
          className={clsx(
            'grid gap-4 py-4 mb-8 text-sm text-muted-foreground',
            complementary.className
          )}
        >
          {info && <Prose html={info} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ProductDescription({ product }: { product: Product }) {
  // Find the variant with the highest compareAtPrice for discount display
  const variantWithHighestCompareAt = product.variants.find(
    (variant) =>
      variant.compareAtPrice &&
      parseFloat(variant.compareAtPrice.amount) > parseFloat(variant.price.amount)
  );

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6  text-black">
        <h2
          className="mb-2 text-5xl font-medium product-title h3"
          data-block-id="title"
          data-block-type="title"
        >
          {product.title}
        </h2>
        <p className="text-sm my-2 ">
          Impuesto incluido. Los gastos de envío se calculan en la pantalla de pago.
        </p>
        <div className="mr-auto w-auto rounded-full bg-black p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            compareAtAmount={variantWithHighestCompareAt?.compareAtPrice?.amount}
            showDiscount={true}
          />
        </div>
      </div>

      <div className="buy-buttons buy-buttons--has-dynamic">
        <VariantSelector options={product.options} variants={product.variants} />
        <AddToCart product={product} />
      </div>

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight product-info__block-item"
          data-block-type="description"
          data-block-id="description"
          html={product.descriptionHtml}
        />
      ) : null}

      {/* Info items section */}
      <div className="mt-3 pt-3 border-t justify-around border-gray-200 grid gap-1 grid-cols-1 sm:flex sm:justify-around">
        {product.materials && <InfoItem info={product.materials} icon={Fabric} text="Materiales" />}
        <InfoItem info={ENVIOS} icon={Package} text="Envío y devoluciones" />
        {product.careInstructions && (
          <InfoItem info={product.careInstructions} icon={Droplet} text="Cuidado" />
        )}
        {product.sizeGuide && (
          <InfoItem info={product.sizeGuide} icon={Droplet} text="Guía de tallas" />
        )}
      </div>
    </>
  );
}
