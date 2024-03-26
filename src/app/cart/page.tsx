"use client";

import CartItem from "@/components/CartItem";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { FEE_COST } from "@/constants";
import { useCart } from "@/hooks/use-cart";
import { useMounted } from "@/hooks/use-mounted";
import { cn, formatPrice, getCartTotal } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
 const { data: auth } = trpc.auth.isSignedIn.useQuery();

 const router = useRouter();
 const { mutate: createCheckoutSession, isLoading } =
  trpc.payment.createSession.useMutation({
   onSuccess: ({ url }) => {
    if (url) router.push(url);
   },
  });

 const { items } = useCart();
 const isMounted = useMounted();
 const cartTotal = getCartTotal(items);

 const products = items.map((item) => ({
  productId: item.product.id,
  amount: item.quantity,
 }));

 return (
  <div>
   <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
     Shopping Cart
    </h1>

    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
     <div
      className={cn("lg:col-span-7", {
       "rounded-lg border-2 border-dashed p-12":
        isMounted && items.length === 0,
      })}
     >
      <h2 className="sr-only">Items in your shopping cart</h2>

      {isMounted && items.length === 0 ? (
       <div className="flex h-full flex-col items-center justify-center space-y-1">
        <div
         aria-hidden="true"
         className="relative mb-4 h-40 w-40 text-muted-foreground"
        >
         <Icons.logo className="w-full h-full" />
        </div>
        <h3 className="font-semibold text-2xl">Your cart is empty</h3>
        <p className="text-muted-foreground text-center">
         <Link
          href="/"
          className={buttonVariants({
           variant: "link",
          })}
         >
          Add something now!
         </Link>
        </p>
       </div>
      ) : null}

      <ul
       className={cn({
        "divide-y border-b border-t": isMounted && items.length > 0,
       })}
      >
       {isMounted &&
        items.map((item) => {
         return (
          <div className="py-2" key={item.product.id}>
           <CartItem item={item} />
          </div>
         );
        })}
      </ul>
     </div>

     <section className="mt-16 rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium">Order summary</h2>

      <div className="mt-6 space-y-4">
       <div className="flex items-center justify-between">
        <p className="text-sm">Subtotal</p>
        <p className="text-sm font-medium">
         {isMounted ? (
          formatPrice(cartTotal)
         ) : (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
         )}
        </p>
       </div>

       <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
         <span>Flat Transaction Fee</span>
        </div>
        <div className="text-sm font-medium">
         {isMounted ? (
          formatPrice(FEE_COST)
         ) : (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
         )}
        </div>
       </div>

       <div className="flex items-center justify-between border-t pt-4">
        <div className="text-base font-medium">Order Total</div>
        <div className="text-base font-medium">
         {isMounted ? (
          formatPrice(cartTotal + FEE_COST)
         ) : (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
         )}
        </div>
       </div>
      </div>

      <div className="mt-6">
       {auth?.signedIn ? (
        <Button
         onClick={() => {
          createCheckoutSession({ products });
         }}
         disabled={items.length === 0 || isLoading}
         className="w-full"
         size="lg"
        >
         {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
         ) : null}
         Checkout
        </Button>
       ) : (
        <Link
         href="/sign-in?origin=cart"
         className={`w-full ${buttonVariants()}`}
        >
         Sign in to checkout
        </Link>
       )}
      </div>
     </section>
    </div>
   </div>
  </div>
 );
};

export default Page;
