import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import { BASE_URL } from "../constants";
import { fmap } from "../lib/utils";

const inputSchema = z.object({
 products: z.array(
  z.object({
   productId: z.string(),
   amount: z.number(),
  })
 ),
});

export const paymentRouter = router({
 createSession: privateProcedure
  .input(inputSchema)
  .mutation(async ({ ctx, input }) => {
   const { user } = ctx;
   const { products } = input;

   if (products.length === 0) {
    throw new TRPCError({
     code: "BAD_REQUEST",
     message: "No product IDs provided",
    });
   }

   const payload = await getPayloadClient();

   const { docs: pdProducts } = await payload.find({
    collection: "products",
    where: {
     id: { in: products.map((product) => product.productId) },
    },
   });

   const filteredProducts = pdProducts.filter((product) =>
    Boolean(product.priceId)
   );

   const order = await payload.create({
    collection: "orders",
    data: {
     user: user.id,
     _isPaid: false,
     products: fmap(filteredProducts, (product) => {
      const p = products.find((p) => p.productId === product.id);

      if (!p) return;

      const amount = p.amount;
      return {
       amount,
       product: product.id,
       price: product.price * p.amount,
      };
     }),
    },
   });

   const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = fmap(
    filteredProducts,
    (product) => {
     const p = products.find((p) => p.productId === product.id);

     if (!p) return;

     return {
      price: product.priceId!,
      quantity: p.amount,
     };
    }
   );

   try {
    const stripeSession = await stripe.checkout.sessions.create({
     success_url: `${BASE_URL}/thank-you?orderId=${order.id}`,
     cancel_url: `${BASE_URL}/cart`,
     payment_method_types: ["card", "paypal"],
     mode: "payment",
     metadata: {
      userId: user.id,
      orderId: order.id,
     },
     line_items,
    });

    return { url: stripeSession.url };
   } catch (error) {
    return { url: null };
   }
  }),
});
