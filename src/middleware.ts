import { NextRequest, NextResponse } from "next/server";
import { getServerSideUser } from "./lib/payload-utils";
import { BASE_URL } from "./constants";

export async function middleware(req: NextRequest) {
 const { nextUrl, cookies } = req;

 const { user } = await getServerSideUser(cookies);
 if (
  user &&
  ["/sign-in", "/sign-up", "/resend-verification"].includes(nextUrl.pathname)
 ) {
  return NextResponse.redirect(BASE_URL!);
 }
 return NextResponse.next();
}
