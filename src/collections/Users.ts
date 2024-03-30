import { getVerifyEmail } from "../getEmailData";
import { CollectionConfig } from "payload/types";

const isAdmin = (param: any) => {
 return param.req.user && param.req.user.role === "admin";
};

export const Users: CollectionConfig = {
 slug: "users",
 auth: {
  verify: {
   generateEmailHTML: ({ token }) => {
    return getVerifyEmail({ token }).html;
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
