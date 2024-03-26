import { getServerSideUser } from "@/lib/payload-utils";
import Image from "next/image";
import { cookies } from "next/headers";
import { getPayloadClient } from "@/get-payload";
import { notFound, redirect } from "next/navigation";
import { Product, User } from "@/payload-types";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { FEE_COST } from "@/constants";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import PaymentStatus from "@/components/PaymentStatus";

interface PageProps {
 searchParams: {
  [key: string]: string | string[] | undefined;
 };
}

const ThankYouPage = async ({ searchParams }: PageProps) => {
 const orderId = searchParams.orderId;
 const nextCookies = cookies();

 const { user } = await getServerSideUser(nextCookies);
 const payload = await getPayloadClient();

 const { docs: ordersList } = await payload.find({
  collection: "orders",
  depth: 2,
  where: {
   id: {
    equals: orderId,
   },
  },
 });

 const [order] = ordersList;
 const { products: orders } = order;

 if (!orders) return notFound();

 const orderUserId =
  typeof order.user === "string" ? order.user : order.user.id;

 if (orderUserId !== user?.id) {
  return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
 }

 const orderTotal = orders.reduce((total, product) => {
  return total + product.price * product.amount;
 }, 0);

 return (
  <main className="relative lg:min-h-full">
   <div>
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
     <div className="hidden lg:block">
      <Icons.check className="w-[80%]" />
     </div>
     <div className="lg:col-start-2">
      <p className="text-sm font-medium text-primary">Order successful</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
       Thanks for ordering
      </h1>
      {order._isPaid ? (
       <p className="mt-2 text-base text-muted-foreground">
        Your order was processed and your product(s) will be shipped as soon as
        possible. You should receive an email confirmation at{" "}
        {user?.email ? <span className="font-bold">{user.email}</span> : null}.
       </p>
      ) : (
       <p className="mt-2 text-base text-muted-foreground">
        We appreciate your order, and we&apos;re currently processing it. So
        hang tight and we&apos;ll send you confirmation very soon!
       </p>
      )}

      <div className="mt-16 text-sm font-medium">
       <div className="text-muted-foreground">Order nr.</div>
       <div className="mt-2">{order.id}</div>

       <ul className="mt-6 divide-y border-t text-sm font-medium text-muted-foreground">
        {orders.map((order) => {
         const product = order.product as Product;
         const { image } = product.images[0];
         return (
          <li key={product.id} className="flex space-x-6 py-6">
           <div className="relative h-24 w-24">
            {typeof image !== "string" && image.url ? (
             <Image
              fill
              src={image.url}
              alt={`${product.name} image`}
              className="flex-none rounded-md object-cover object-center"
             />
            ) : null}
           </div>
           <div className="flex-auto flex flex-col justify-between">
            <div className="space-y-1">
             <h3>{product.name}</h3>
             <h3>{formatPrice(product.price)}</h3>
            </div>
           </div>

           <p className="flex-none font-medium">
            {formatPrice(product.price * order.amount)}
           </p>
          </li>
         );
        })}
       </ul>

       <div className="space-y-6 border-t pt-6 text-sm font-medium text-muted-foreground">
        <div className="flex justify-between">
         <p>Subtotal</p>
         <p>{formatPrice(orderTotal)}</p>
        </div>

        <div className="flex justify-between">
         <p>Transaction Fee</p>
         <p>{formatPrice(FEE_COST)}</p>
        </div>

        <div className="flex items-center justify-between border-t pt-6">
         <p className="text-base">Total</p>
         <p className="text-base">{formatPrice(orderTotal + FEE_COST)}</p>
        </div>
       </div>

       <PaymentStatus
        isPaid={order._isPaid}
        orderEmail={(order.user as User).email}
        orderId={order.id}
       />

       <div className="mt-16 border-t py-6 text-right">
        <Link
         href="/"
         className={`${buttonVariants({
          variant: "link",
         })}`}
        >
         Continue shopping &rarr;
        </Link>
       </div>
      </div>
     </div>
    </div>
   </div>
  </main>
 );
};

export default ThankYouPage;
