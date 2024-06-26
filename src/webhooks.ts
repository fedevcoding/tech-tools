import express from "express";
import { stripe } from "./lib/stripe";
import type Stripe from "stripe";
import { getPayloadClient } from "./get-payload";
// import { Product } from "./payload-types";
// import { Resend } from 'resend'
// import { ReceiptEmailHtml } from './components/emails/ReceiptEmail'
// const resend = new Resend(process.env.RESEND_API_KEY)
import getRawBody from "raw-body";

export const stripeWebhookHandler = async (
 req: express.Request,
 res: express.Response
) => {
 const signature = req.headers["stripe-signature"] || "";
 const rawBody = await getRawBody(req);
 let event;
 try {
  event = stripe.webhooks.constructEvent(
   rawBody,
   signature,
   process.env.STRIPE_WEBHOOK_KEY || ""
  );
 } catch (err) {
  return res
   .status(400)
   .send(
    `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`
   );
 }

 const session = event.data.object as Stripe.Checkout.Session;
 if (!session?.metadata?.userId || !session?.metadata?.orderId) {
  return res.status(400).send(`Webhook Error: No user present in metadata`);
 }

 if (event.type === "checkout.session.completed") {
  const payload = await getPayloadClient();

  const { docs: users } = await payload.find({
   collection: "users",
   where: {
    id: {
     equals: session.metadata.userId,
    },
   },
  });

  const [user] = users;

  if (!user) return res.status(404).json({ error: "No such user exists." });

  const { docs: orders } = await payload.find({
   collection: "orders",
   depth: 2,
   where: {
    id: {
     equals: session.metadata.orderId,
    },
   },
  });

  const [order] = orders;

  if (!order) return res.status(404).json({ error: "No such order exists." });

  const { name, address } = event.data.object.shipping_details || {};
  const { city, country, line1, line2, postal_code, state } = address || {};

  await payload.update({
   collection: "orders",
   data: {
    _isPaid: true,
    city,
    country,
    line1,
    line2,
    postal_code,
    state,
    name,
   },
   where: {
    id: {
     equals: session.metadata.orderId,
    },
   },
  });
 }

 return res.status(200).send();
};
