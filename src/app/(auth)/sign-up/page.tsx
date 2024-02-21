"use client";

import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Page = () => {
 return (
  <>
   <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
    <div className="mx-auto flex W-full flex-col justify-center space-y-6 sm:w-[350px]">
     <div className="flex flex-col items-center space-y-2 text-center">
      <Icons.logo />

      <h1>Create an account</h1>

      <Link
       href={"/sign-in"}
       className={buttonVariants({ variant: "link", className: " gap-1.5" })}
      >
       Already have an account? Sign-in
      </Link>
     </div>

     <div className="grid gap-6">
      <form action="">
       <div className="space-y-3">
        <div className="grid gap-2 py-1">
         <Label htmlFor="email">Email</Label>
         <Input
          className={cn({ "focus-visible:ring-red-500": true })}
          placeholder="Email"
         />
        </div>
        <div className="grid gap-2 py-1">
         <Label htmlFor="password">Password</Label>
         <Input
          className={cn({ "focus-visible:ring-red-500": true })}
          placeholder="Password"
         />
        </div>
       </div>
      </form>
     </div>
    </div>
   </div>
  </>
 );
};

export default Page;
