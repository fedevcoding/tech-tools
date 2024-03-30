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
   address: "delivered@resend.dev",
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
