import { z } from "zod";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./payment-router";

export const appRouter = router({
 auth: authRouter,
 payment: paymentRouter,
 getInfiniteProducts: publicProcedure
  .input(
   z.object({
    limit: z.number().min(1).max(100),
    cursor: z.number().nullish(),
    query: QueryValidator,
   })
  )
  .query(async ({ input }) => {
   const { query, cursor } = input;
   const { sort, limit, sortBy, price, ...queryOpts } = query;

   const payload = await getPayloadClient();

   const page = cursor || 1;

   const parsedQueryOpts: Record<string, { equals: string }> = {};
   Object.entries(queryOpts).forEach(([key, value]) => {
    parsedQueryOpts[key] = {
     equals: value,
    };
   });

   const {
    docs: items,
    hasNextPage,
    nextPage,
   } = await payload.find({
    collection: "products",
    where: {
     ...parsedQueryOpts,
     and: [
      {
       price: {
        ...(price?.min ? { greater_than_equal: price.min } : {}),
       },
      },
      {
       price: {
        ...(price?.max ? { less_than_equal: price.max } : {}),
       },
      },
     ],
    },
    ...(sortBy && sort
     ? { sort: `${sort === "asc" ? "" : "-"}${sortBy}` }
     : {}),
    depth: 1,
    limit,
    page,
   });

   return {
    items,
    nextPage: hasNextPage ? nextPage : null,
   };
  }),
});

export type AppRouter = typeof appRouter;
