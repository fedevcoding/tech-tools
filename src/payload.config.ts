import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { buildConfig } from "payload/config";
import { Users } from "./collections/Users";
import dotenv from "dotenv";
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { BASE_URL } from "./constants";

dotenv.config({
 path: path.resolve(__dirname, "../.env"),
});

export default buildConfig({
 serverURL: BASE_URL || "",
 collections: [Users, Products, Media, Orders],
 routes: {
  admin: "/admin",
 },
 admin: {
  user: "users",
  bundler: webpackBundler(),
  meta: {
   titleSuffix: " - Tech tools",
  },
 },
 rateLimit: {
  max: 2000,
 },
 editor: slateEditor({}),
 db: mongooseAdapter({
  url: process.env.MONGODB_URL!,
 }),
 typescript: {
  outputFile: path.resolve(__dirname, "payload-types.ts"),
 },
});
