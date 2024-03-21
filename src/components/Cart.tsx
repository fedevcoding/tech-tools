"use client";
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
 SheetTrigger,
} from "./ui/sheet";
import { Icons } from "./Icons";
import { useCart } from "@/hooks/use-cart";

const Cart = () => {
 const { items } = useCart();
 const itemCount = items.length;

 const cartTotal = items.reduce((acc, { product }) => acc + product.price, 0);

 return (
  <Sheet>
   <SheetTrigger>
    <div className="flex items-center gap-2">
     <Icons.cart size={32} className="cursor-pointer" />
     <span className="text-defaultGray">{itemCount}</span>
    </div>
   </SheetTrigger>
   <SheetContent>
    <SheetHeader>
     <SheetTitle>Cart ({itemCount})</SheetTitle>
    </SheetHeader>
   </SheetContent>
  </Sheet>
 );
};

export default Cart;
