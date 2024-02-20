import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
 return (
  <>
   <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
    <div className="mx-auto flex W-full flex-col justify-center space-y-6 sm:w-[350px]">
     <div className="flex flex-col items-center space-y-2 text-center">
      <Icons.logo />

      <h1>Create an account</h1>

      <Link href={"/sign-in"} className={buttonVariants({ variant: "link" })}>
       Already have an account? Sign-in
      </Link>
     </div>
    </div>
   </div>
  </>
 );
};

export default Page;
