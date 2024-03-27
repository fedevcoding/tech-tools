import { z } from "zod";

export const QueryValidator = z.object({
 category: z.string().optional(),
 sort: z.enum(["asc", "desc"]),
 limit: z.number().optional(),
});

export type TQyeryValidator = z.infer<typeof QueryValidator>;
