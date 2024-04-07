"use client";

import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import { Icons } from "./Icons";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const VerifyEmail = ({ token }: { token: string }) => {
 const { error, isLoading, data } = trpc.auth.verifyEmail.useQuery(
  {
   token,
  },
  { refetchOnWindowFocus: false, retry: 1 }
 );

 if (isLoading) {
  return (
   <div className="flex flex-col items-center gap-2">
    <Loader2 className="animate-spin h-8 w-8 text-zinc-300" />

    <h3 className="font-semibold text-xl">Verifying...</h3>

    <p className="text-muted-foreground text-sm">This won&apos;t take long.</p>
   </div>
  );
 }

 if (error) {
  return (
   <div className="flex flex-col items-center gap-2">
    <XCircle className="h-8 w-8 text-red-600" />

    <h3 className="font-semibold text-xl">There was a problem</h3>

    <p className="text-muted-foreground text-sm">
     This token is not valid or might be expired. Please try again.
    </p>
   </div>
  );
 }

 if (data?.success) {
  return (
   <div className="flex h-full flex-col items-center justify-center">
    <div aria-hidden="true" className="relative h-32 w-32 mb-8">
     <Icons.logo className="w-full h-full" />
    </div>

    <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
    <p className="text-muted-foreground text-center mt-1">
     Thank you for verifying your email.
    </p>
    <Link className={buttonVariants({ className: "mt-4" })} href={"/sign-in"}>
     Sign in
    </Link>
   </div>
  );
 }
};

export default VerifyEmail;
