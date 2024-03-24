"use client";
import {
 Sheet,
 SheetContent,
 SheetFooter,
 SheetHeader,
 SheetTitle,
 SheetTrigger,
} from "./ui/sheet";
import { Icons } from "./Icons";
import { useCart } from "@/hooks/use-cart";
import { formatPrice, getCartTotal } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import CartItem from "./CartItem";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { FEE_COST } from "@/constants";

const Cart = () => {
 const { items } = useCart();
 const itemCount = items.length;

 const cartTotal = getCartTotal(items);

 return (
  <Sheet>
   <SheetTrigger id="cart-modal">
    <div className="flex items-center gap-2">
     <Icons.cart size={32} className="cursor-pointer" />
     <span className="text-defaultGray">{itemCount}</span>
    </div>
   </SheetTrigger>
   <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
    <SheetHeader className="space-y-2.5 pr-6">
     <SheetTitle>Cart ({itemCount})</SheetTitle>
    </SheetHeader>
    {itemCount > 0 ? (
     <>
      <div className="flex w-full flex-col pr-6">
       <ScrollArea>
        {items.map((item) => (
         <CartItem item={item} key={item.product.id} />
        ))}
       </ScrollArea>
      </div>
      <div className="space-y-4 pr-6">
       <Separator />
       <div className="space-y-1.5 text-sm">
        <div className="flex">
         <span className="flex-1">Shipping</span>
         <span>Free</span>
        </div>
        <div className="flex">
         <span className="flex-1">Transaction Fee</span>
         <span>{formatPrice(FEE_COST)}</span>
        </div>
        <div className="flex">
         <span className="flex-1">Total</span>
         <span>{formatPrice(cartTotal + FEE_COST)}</span>
        </div>
       </div>

       <SheetFooter>
        <SheetTrigger asChild>
         <Link
          href="/cart"
          className={buttonVariants({
           className: "w-full",
          })}
         >
          Continue to Checkout
         </Link>
        </SheetTrigger>
       </SheetFooter>
      </div>
     </>
    ) : (
     <div className="flex h-full flex-col items-center justify-center space-y-1">
      <div
       aria-hidden="true"
       className="relative mb-4 h-52 w-52 text-muted-foreground"
      >
       <Icons.logo className="w-full h-full" />
      </div>
      <div className="text-xl font-semibold">Your cart is empty</div>
      <SheetTrigger asChild>
       <Link
        href="/"
        className={buttonVariants({
         variant: "link",
         size: "sm",
         className: "text-sm text-muted-foreground",
        })}
       >
        Add items to your cart to checkout
       </Link>
      </SheetTrigger>
     </div>
    )}
   </SheetContent>
  </Sheet>
 );
};

export default Cart;
