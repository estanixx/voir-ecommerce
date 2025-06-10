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
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';


function InfoItem({ 
  icon: Icon, 
  text 
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  text: string 
}) {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className='text-white'
        >
          <Icon className="h-4 w-4 mr-2" />
          <span className="text-sm">{text}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{text}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="text-sm text-muted-foreground">
            {text === "Materiales" && "Detailed materials information..."}
            {text === "Envío y devoluciones" && "Shipping and returns policy..."}
            {text === "Cuidado" && "Product care instructions..."}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ProductDescription({ product }: { product: Product }) {


  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6  text-black">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <p className="text-sm my-2 ">Impuesto incluido. Los gastos de envío se calculan en la pantalla de pago.</p>
        <div className="mr-auto w-auto rounded-full bg-black p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <AddToCart product={product} />
      
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight"
          html={product.descriptionHtml}
        />
      ) : null}
      
      {/* Info items section */}
      <div className="mt-3 pt-3 border-t justify-around border-gray-200 grid gap-1 grid-cols-1 sm:flex sm:justify-around">
        <InfoItem 
          icon={Fabric} 
          text="Materiales" 
        />
        <InfoItem 
          icon={Package} 
          text="Envío y devoluciones" 

        />
        <InfoItem 
          icon={Droplet} 
          text="Cuidado" 
        />
      </div>
    </>
  );
}