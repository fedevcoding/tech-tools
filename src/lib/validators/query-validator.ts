import { z } from "zod";

export const QueryValidator = z.object({
 category: z.string().optional(),
 sort: z.enum(["asc", "desc"]).optional(),
 sortBy: z.enum(["price", "name"]).optional(),
 limit: z.number().optional(),
 search: z.string().optional().nullable(),
 price: z
  .object({
   min: z.number().nullable(),
   max: z.number().nullable(),
  })
  .optional(),
});

export type TQyeryValidator = z.infer<typeof QueryValidator>;
