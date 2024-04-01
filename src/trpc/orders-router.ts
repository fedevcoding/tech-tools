import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";

export const ordersRouter = router({
 getOrders: privateProcedure.input(z.object({})).query(async ({ ctx }) => {
  const payload = await getPayloadClient();

  const { user } = ctx;

  const { docs: orders } = await payload.find({
   collection: "orders",
   where: {
    user: {
     equals: user.id,
    },
   },
  });

  return orders;
 }),
});
