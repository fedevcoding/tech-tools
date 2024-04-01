import { z } from "zod";

export const EmailCredentialsValidator = z.object({
 email: z.string().email(),
});
export type TEmailCredentialsValidator = z.infer<
 typeof EmailCredentialsValidator
>;

export const PasswordCredentialsValidator = z.object({
 password: z
  .string()
  .min(8, { message: "Password must me at least 8 charachters" }),
});
export type TPasswordCredentialsValidator = z.infer<
 typeof PasswordCredentialsValidator
>;

export const AuthCredentialsValidator = z.object({
 email: EmailCredentialsValidator.shape.email,
 password: PasswordCredentialsValidator.shape.password,
});
export type TAuthCredentialsValidator = z.infer<
 typeof AuthCredentialsValidator
>;

export const ResetCredentialsValidator = z.object({
 token: z.string(),
 password: PasswordCredentialsValidator.shape.password,
});

export type TResetCredentialsValidator = z.infer<
 typeof ResetCredentialsValidator
>;
