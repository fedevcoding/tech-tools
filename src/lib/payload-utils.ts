import { BASE_URL } from "../constants";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";
import { User } from "payload/dist/auth";

export const getServerSideUser = async (
 cookies: NextRequest["cookies"] | ReadonlyRequestCookies | Record<string, any>
) => {
 let token;
 if (typeof cookies === "object" && "payload-token" in cookies) {
  token = cookies["payload-token"];
 } else {
  token = cookies.get("payload-token")?.value;
 }
 const userReq = await fetch(`${BASE_URL}/api/users/me`, {
  headers: {
   Authorization: `JWT ${token}`,
  },
 });
 const { user } = (await userReq.json()) as { user: User | null };

 return { user };
};
