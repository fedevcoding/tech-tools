"use client";

import { Icons } from "@/components/Icons";
import ImageSlider from "@/components/ImageSlider";
import { Button } from "@/components/ui/button";
import { formatPrice, parseDate, validImageUrls } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import Link from "next/link";

const Page = () => {
 const { data: orders, isLoading } = trpc.orders.getOrders.useQuery({});
 return (
  <div>
   <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">
     My Orders
    </h1>

    {isLoading && (
     <div className="flex flex-col justify-center items-center">
      <Icons.logo className="w-32 h-32" />

      <h1 className="text-xl">Loading...</h1>
     </div>
    )}

    {!isLoading && orders?.length === 0 && (
     <div className="flex flex-col justify-center items-center">
      <Icons.logo className="w-32 h-32" />

      <h1 className="text-xl">No orders found for this account :(</h1>
     </div>
    )}
    {orders?.map(
     ({
      id,
      products,
      createdAt,
      status,
      country,
      city,
      line1,
      tracking_number,
     }) => (
      <div
       key={id}
       className="rounded-lg border-2 border-defaultGray pb-4 px-5 my-8"
      >
       <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 py-7">
         <div className="bg-defaultGray  rounded-full py-1 px-2 text-sm">
          Order <span className="text-muted-foreground">#{id}</span>
         </div>
         <p className="text-muted-foreground">
          Order placed {parseDate(createdAt)}
         </p>
        </div>
        <Button disabled={tracking_number == null}>
         <Link
          href={`https://parcelsapp.com/en/tracking/${tracking_number}`}
          target="_blank"
         >
          Track Order
         </Link>
        </Button>
       </div>
       {products?.map(({ product, amount, price, id }) => {
        if (typeof product === "string") return null;
        const { name, images } = product;
        const validUrls = validImageUrls(images);
        return (
         <Link
          href={`/product/${product.id}`}
          key={id}
          className="border-t-2 border-defaultGray py-4 flex items-center justify-between"
         >
          <div className="flex items-center gap-8">
           <div className="relative aspect-square overflow-hidden rounded w-28">
            <ImageSlider urls={validUrls} />
           </div>
           <div className="flex flex-col gap-2 w-36">
            <h3>{name}</h3>
            <p>
             Price:{" "}
             <span className="text-muted-foreground">{formatPrice(price)}</span>
            </p>
            <p>
             Qty: <span className="text-muted-foreground">{amount}</span>
            </p>
           </div>
          </div>
          <div className="flex flex-col gap-2">
           <p>Address</p>
           <p className="text-muted-foreground">
            {line1}, {city}, {country}
           </p>
          </div>
          <div className="flex flex-col gap-2">
           <p>Status</p>
           <p className="text-muted-foreground">{status}</p>
          </div>
          <div className="flex flex-col gap-2">
           <p>Total</p>
           <p className="text-muted-foreground">
            {formatPrice(price * amount)}
           </p>
          </div>
         </Link>
        );
       })}
      </div>
     )
    )}
   </div>
  </div>
 );
};

export default Page;
