import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
 return (
  <MaxWidthWrapper>
   <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
    <h1>
     Your marketplace for high-quality{" "}
     <span className="text-blue-600">TECH TOOLS</span>
    </h1>

    <button className={buttonVariants({ variant: "link" })}>
     Start shopping
    </button>
   </div>
  </MaxWidthWrapper>
 );
}
