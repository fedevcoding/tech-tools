"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import Image from "next/image";

const Page = () => {
 const { data: orders } = trpc.orders.getOrders.useQuery({});
 return (
  <div>
   <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">
     My Orders
    </h1>

    {orders?.map(({ id, products, createdAt, status }) => (
     <div key={id} className="rounded-lg border-2 border-defaultGray pb-4 px-5">
      <div className="flex justify-between items-center">
       <div className="flex items-center gap-2 py-8">
        <div className="bg-defaultGray rounded-full py-2 px-3">
         Order <span className="text-blue-500">#{id}</span>
        </div>
        <p className="text-muted-foreground">Order placed {createdAt}</p>
       </div>
       <Button>Track Order</Button>
      </div>
      {products?.map(({ product, amount, price, id }) => {
       if (typeof product === "string") return null;
       const { name, images } = product;
       let imageUrl = images[0]?.image;
       if (typeof imageUrl !== "string") {
        imageUrl = imageUrl.url || "";
       }
       return (
        <div
         key={id}
         className="border-t-2 border-defaultGray py-4 flex justify-between"
        >
         <div className="flex">
          <Image
           loading="eager"
           className="-z-10 object-contain"
           width={100}
           height={100}
           src={imageUrl}
           alt="Product image"
          />
          <div>
           <h3>{name}</h3>
           <p>Qty: {amount}</p>
          </div>
         </div>
         <div>
          <p>Status</p>
          <p>{status}</p>
         </div>
         <div>
          <p>Total</p>
          <p>{price * amount}</p>
         </div>
        </div>
       );
      })}
     </div>
    ))}
   </div>
  </div>
 );
};

export default Page;
