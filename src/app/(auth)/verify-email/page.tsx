import { Icons } from "@/components/Icons";
import VerifyEmail from "@/components/VerifyEmail";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type PageProps = {
 searchParams: {
  [key: string]: string | string[] | undefined;
 };
};

const VerifyEmailPage = ({ searchParams }: PageProps) => {
 const { token, to } = searchParams;

 return (
  <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
   <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    {token && typeof token === "string" ? (
     <div className="grid gap-6">
      <VerifyEmail token={token} />
     </div>
    ) : (
     <div className="flex h-full flex-col items-center justify-center space-y-1">
      <div aria-hidden="true" className="relative h-32 w-32 mb-8">
       <Icons.logo className="w-full h-full" />
      </div>

      <h3 className="font-semibold text-2xl">Check your email</h3>

      {to ? (
       <p className="text-center">
        We&apos;ve sent a verification link to{" "}
        <span className="font-semibold">{to}</span>
       </p>
      ) : (
       <p>We&apos;ve sent a verification link to your email</p>
      )}
      <Link
       href={"/resend-verification"}
       className={buttonVariants({ variant: "link" })}
      >
       Didn&apos;t received email verification?
      </Link>
     </div>
    )}
   </div>
  </div>
 );
};

export default VerifyEmailPage;
