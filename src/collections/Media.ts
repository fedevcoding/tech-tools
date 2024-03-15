import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
 slug: "media",
 admin: {
  hidden: true,
 },
 upload: {
  staticURL: "/media",
  staticDir: "/media",
  imageSizes: [
   {
    name: "thumbnail",
    width: 400,
    height: 300,
    position: "center",
   },
   {
    name: "card",
    width: 768,
    height: 1024,
    position: "center",
   },
   {
    name: "tablet",
    width: 1024,
    height: undefined,
    position: "center",
   },
  ],
  mimeTypes: ["image/*"],
 },
 fields: [
  {
   name: "user",
   relationTo: "users",
   type: "relationship",
   required: true,
   hasMany: false,
  },
 ],
};
