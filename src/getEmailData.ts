import { PrimaryActionEmailHtml } from "./components/emails/Primary";
import { BASE_URL } from "./constants";

export const getVerifyEmail = ({
 to,
 token,
}: {
 to?: string;
 token: string;
}) => {
 return {
  to,
  from: {
   address: "techtools@fedev.me",
   name: "Tech Tools",
  },
  subject: "Verify your email",
  html: PrimaryActionEmailHtml({
   actionLabel: "verify your account",
   buttonText: "Verify Account",
   href: `${BASE_URL}/verify-email?token=${token}`,
  }),
 };
};

export const getResetEmail = ({
 to,
 token,
}: {
 to?: string;
 token: string;
}) => {
 return {
  to,
  from: {
   address: "techtools@fedev.me",
   name: "Tech Tools",
  },
  subject: "Reset your password",
  html: PrimaryActionEmailHtml({
   actionLabel: "reset your password",
   buttonText: "Reset Password",
   href: `${BASE_URL}/reset-password?token=${token}`,
  }),
 };
};
