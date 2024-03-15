import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
 slug: "products",
 admin: {
  useAsTitle: "name",
 },
 access: {},
 fields: [
  {
   name: "name",
   label: "Name",
   type: "text",
   required: true,
  },
  {
   name: "description",
   label: "Product details",
   type: "textarea",
   required: true,
  },
  {
   name: "price",
   label: "Price (USD)",
   type: "number",
   min: 0,
   required: true,
  },
  {
   name: "priceId",
   access: {
    create: () => false,
    read: () => false,
    update: () => false,
   },
   type: "text",
   admin: {
    hidden: true,
   },
  },
  {
   name: "stripeId",
   access: {
    create: () => false,
    read: () => false,
    update: () => false,
   },
   type: "text",
   admin: {
    hidden: true,
   },
  },
  {
   name: "images",
   type: "array",
   label: "Product images",
   minRows: 1,
   required: true,
   labels: {
    singular: "Image",
    plural: "Images",
   },
   fields: [
    {
     name: "image",
     type: "upload",
     relationTo: "media",
     required: true,
    },
   ],
  },
 ],
};
