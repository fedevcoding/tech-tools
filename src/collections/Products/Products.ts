import { PROUCT_CATEGORIES } from "../../constants";
import { stripe } from "../../lib/stripe";
import { Product } from "../../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook = async ({ req, data }) => {
 const { user } = req;

 return { ...data, user: user.id };
};

export const Products: CollectionConfig = {
 slug: "products",
 admin: {
  useAsTitle: "name",
 },
 access: {},
 hooks: {
  beforeChange: [
   addUser,
   async (args) => {
    if (args.operation === "create") {
     const data = args.data as Product;
     const createdProduct = await stripe.products.create({
      name: data.name,
      default_price_data: {
       currency: "USD",
       unit_amount: data.price * 100,
      },
     });

     const updated: Product = {
      ...data,
      priceId: createdProduct.default_price as string,
      stripeId: createdProduct.id,
     };

     return updated;
    } else if (args.operation === "update") {
     const data = args.data as Product;
     const updatedProduct = await stripe.products.update(data.stripeId!, {
      name: data.name,
      default_price: data.priceId!,
     });

     const updated: Product = {
      ...data,
      priceId: updatedProduct.default_price as string,
      stripeId: updatedProduct.id,
     };

     return updated;
    }
   },
  ],
 },
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
   name: "category",
   label: "Category",
   type: "select",
   defaultValue: "all",
   required: true,
   hasMany: true,
   options: PROUCT_CATEGORIES.map(({ name, value }) => ({
    label: name,
    value,
   })),
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
