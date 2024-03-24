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
    // TODO: make the message nicier
    return `<a href='${BASE_URL}/verify-email?token=${token}'>Verify now</a>`;
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
