import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function page() {
 return (
  <div className="container relative flex flex-col items-center justify-center gap-5 h-main-page">
   <Icons.logo className="w-32 h-32" />

   <h1 className="text-3xl font-semibold">This page could not be found :(</h1>

   <Link
    href={"/"}
    className={buttonVariants({ variant: "link", className: "gap-1.5" })}
   >
    Go back home
   </Link>
  </div>
 );
}

export default page;
