import { z } from "zod";

export const AuthCredentialsValidator = z.object({
 email: z.string().email(),
 password: z
  .string()
  .min(8, { message: "Password must me at least 8 charachters" }),
});
export type TAuthCredentialsValidator = z.infer<
 typeof AuthCredentialsValidator
>;

export const EmailCredentialsValidator = z.object({
 email: z.string().email(),
});
export type TEmailCredentialsValidator = z.infer<
 typeof EmailCredentialsValidator
>;
