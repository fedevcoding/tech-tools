import { Access, CollectionConfig } from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
 if (user.role === "admin") return true;

 return {
  user: {
   equals: user?.id,
  },
 };
};

const isAdmin = (param: any) => {
 return param.req.user && param.req.user.role === "admin";
};

export const Orders: CollectionConfig = {
 slug: "orders",
 admin: {
  useAsTitle: "Orders",
 },
 access: {
  read: yourOwn,
  update: isAdmin,
  delete: isAdmin,
  create: isAdmin,
 },
 fields: [
  {
   name: "_isPaid",
   type: "checkbox",
   access: {
    read: isAdmin,
    create: () => false,
    update: () => false,
   },
   admin: {
    hidden: true,
   },
   required: true,
  },
  {
   name: "city",
   type: "text",
   required: false,
  },
  {
   name: "country",
   type: "text",
   required: false,
  },
  {
   name: "line1",
   type: "text",
   required: false,
  },
  {
   name: "line2",
   type: "text",
   required: false,
  },
  {
   name: "postal_code",
   type: "text",
   required: false,
  },
  {
   name: "state",
   type: "text",
   required: false,
  },
  {
   name: "name",
   type: "text",
   required: false,
  },
  {
   name: "user",
   type: "relationship",
   admin: {
    hidden: true,
   },
   relationTo: "users",
   required: true,
  },
  {
   name: "products",
   type: "array",
   fields: [
    {
     name: "amount",
     type: "number",
     required: true,
    },
    {
     name: "product",
     type: "relationship",
     relationTo: "products",
     required: true,
    },
    {
     name: "price",
     type: "number",
     required: true,
    },
    {
     name: "status",
     type: "select",
     options: [
      { label: "Pending", value: "pending" },
      { label: "Processing", value: "processing" },
      { label: "Shipped", value: "shipped" },
      { label: "Delivered", value: "delivered" },
      { label: "Cancelled", value: "cancelled" },
     ],
    },
   ],
  },
 ],
};
