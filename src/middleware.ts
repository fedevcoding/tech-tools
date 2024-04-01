import { NextRequest, NextResponse } from "next/server";
import { getServerSideUser } from "./lib/payload-utils";
import { BASE_URL, SIGN_IN } from "./constants";

export async function middleware(req: NextRequest) {
 const { nextUrl, cookies } = req;

 const { user } = await getServerSideUser(cookies);
 if (
  user &&
  ["/sign-in", "/sign-up", "/resend-verification"].includes(nextUrl.pathname)
 ) {
  return NextResponse.redirect(BASE_URL!);
 } else if (!user && ["/orders"].includes(nextUrl.pathname)) {
  const origin = nextUrl.pathname.split("/")[1];
  return NextResponse.redirect(`${SIGN_IN!}?origin=${origin}`);
 }
 return NextResponse.next();
}
