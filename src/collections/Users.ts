import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
 slug: "users",
 auth: {
  verify: {
   generateEmailHTML: ({ token }) => {
    // TODO: make the message nicier
    return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Verify now</a>`;
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