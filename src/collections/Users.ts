import { PrimaryActionEmailHtml } from "../components/emails/Primary";
import { BASE_URL } from "../constants";
import { CollectionConfig } from "payload/types";

const isAdmin = (param: any) => {
 return param.req.user && param.req.user.role === "admin";
};

export const Users: CollectionConfig = {
 slug: "users",
 auth: {
  verify: {
   generateEmailHTML: ({ token }) => {
    return PrimaryActionEmailHtml({
     actionLabel: "verify your account",
     buttonText: "Verify Account",
     href: `${BASE_URL}/verify-email?token=${token}`,
    });
   },
  },
 },
 access: {
  admin: isAdmin,
 },
 fields: [
  {
   name: "role",
   required: true,
   admin: {
    condition: () => false,
   },
   type: "select",
   options: [
    {
     label: "Admin",
     value: "admin",
    },
    {
     label: "User",
     value: "user",
    },
   ],
  },
 ],
};
