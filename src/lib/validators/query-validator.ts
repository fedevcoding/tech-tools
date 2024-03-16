import { z } from "zod";

export const QueryValidator = z.object({
 category: z.string(),
 sort: z.enum(["asc", "desc"]),
 limit: z.number().optional(),
});

export type TQyertValidator = z.infer<typeof QueryValidator>;
