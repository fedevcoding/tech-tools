import {
 AuthCredentialsValidator,
 EmailCredentialsValidator,
 ResetCredentialsValidator,
} from "../lib/validators/account-validators";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import payload from "payload";
import { getServerSideUser } from "../lib/payload-utils";
import { getResetEmail, getVerifyEmail } from "../getEmailData";
import { ADMIN_EMAILS } from "@/constants";

export const authRouter = router({
 sendResetPasswordUrl: publicProcedure
  .input(EmailCredentialsValidator)
  .mutation(async ({ input }) => {
   const { email } = input;
   const payload = await getPayloadClient();

   const token = await payload.forgotPassword({
    disableEmail: true,
    collection: "users",
    data: {
     email: email,
    },
   });

   if (!token) {
    throw new TRPCError({ code: "BAD_REQUEST" });
   }

   await payload.sendEmail(getResetEmail({ to: email, token }));

   return { sentToEmail: email };
  }),
 resetPassword: publicProcedure
  .input(ResetCredentialsValidator)
  .mutation(async ({ input }) => {
   const { token, password } = input;
   const payload = await getPayloadClient();

   await payload.resetPassword({
    collection: "users",
    data: {
     password,
     token,
    },
    overrideAccess: true,
   });

   return { success: true };
  }),
 resendVerificationEmail: publicProcedure
  .input(EmailCredentialsValidator)
  .mutation(async ({ input }) => {
   const { email } = input;

   const { docs: users } = await payload.find({
    collection: "users",
    where: {
     email: {
      equals: email,
     },
    },
    showHiddenFields: true,
   });

   if (users.length === 0 || users[0]._verified)
    throw new TRPCError({ code: "BAD_REQUEST" });

   const user = users[0];
   const { _verificationToken } = user;

   await payload.sendEmail(
    getVerifyEmail({ to: email, token: _verificationToken! })
   );

   return { sentToEmail: email };
  }),
 createPayloadUser: publicProcedure
  .input(AuthCredentialsValidator)
  .mutation(async ({ input }) => {
   const { email, password } = input;
   const payload = await getPayloadClient();

   const { docs: users } = await payload.find({
    collection: "users",
    where: {
     email: {
      equals: email,
     },
    },
   });

   if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });

   const role = ADMIN_EMAILS.includes(email) ? "admin" : "user";

   await payload.create({
    collection: "users",
    data: {
     email,
     password,
     role,
    },
   });

   return { success: true, sentToEmail: email };
  }),

 verifyEmail: publicProcedure
  .input(z.object({ token: z.string() }))
  .query(async ({ input }) => {
   const { token } = input;
   const payload = await getPayloadClient();

   const isVerified = await payload.verifyEmail({
    collection: "users",
    token,
   });

   if (!isVerified) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
   }

   return { success: true };
  }),

 signIn: publicProcedure
  .input(AuthCredentialsValidator)
  .mutation(async ({ input: { email, password }, ctx: { res } }) => {
   try {
    await payload.login({
     collection: "users",
     data: {
      email,
      password,
     },
     res,
    });

    return { success: true };
   } catch (err) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
   }
  }),
 isSignedIn: publicProcedure.query(async ({ ctx: { req } }) => {
  try {
   const { user } = await getServerSideUser(req.cookies);
   return { signedIn: !!user };
  } catch (err) {
   return { signedIn: false };
  }
 }),
});

export type AuthRouter = typeof authRouter;
