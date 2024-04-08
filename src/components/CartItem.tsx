import { type CartItem, useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { ImageIcon, Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";

const CartItem = ({ item: { product, quantity } }: { item: CartItem }) => {
 const { image } = product.images[0];

 const { removeItem, addItem, decrementItem } = useCart();

 return (
  <div className="space-y-3 py-2">
   <div className="flex items-start justify-between gap-4">
    <div className="flex items-center space-x-4">
     <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
      {typeof image !== "string" && image.url ? (
       <Image
        src={image.url}
        alt={product.name}
        fill
        className="absolute object-cover"
       />
      ) : (
       <div className="flex h-full items-center justify-center bg-secondary">
        <ImageIcon
         aria-hidden="true"
         className="h-4 w-4 text-muted-foreground"
        />
       </div>
      )}
     </div>

     <div className="flex flex-col self-start">
      <span className="line-clamp-1 text-sm font-medium mb-1">
       {product.name}
      </span>

      <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
       {formatPrice(product.price)}
      </span>
      <div className="flex items-center mt-4 text-xs text-muted-foreground gap-2">
       <div className="flex border-defaultGray border-[1px] rounded-lg p-1">
        <button onClick={() => decrementItem(product.id)}>
         <Minus className="w-4 h-4" />
        </button>
        <input
         type="number"
         className="w-6 bg-transparent text-center"
         value={quantity}
        />
        <button onClick={() => addItem(product)}>
         <Plus className="w-4 h-4" />
        </button>
       </div>
       <button onClick={() => removeItem(product.id)}>
        <Trash className="w-4 h-4" />
       </button>
      </div>
     </div>
    </div>

    <div className="flex flex-col space-y-1 font-medium">
     <span className="ml-auto line-clamp-1 text-sm">
      {formatPrice(product.price * quantity)}
     </span>
    </div>
   </div>
  </div>
 );
};

export default CartItem;
