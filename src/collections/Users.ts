import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
 slug: "users",
 auth: {
  verify: {
   generateEmailHTML: ({ token }) => {
    return `<a href='${process.env.NEXT_PUBLIC_SERVER}/verify-email?token=${token}'>`;
   },
  },
 },
 access: {
  read: () => true,
  create: () => true,
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
