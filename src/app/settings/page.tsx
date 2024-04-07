import { Icons } from "@/components/Icons";
import { TITLE_PREFIX } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
 title: `${TITLE_PREFIX} Settings`,
};

const Page = () => {
 return (
  <section>
   <h1 className="text-center mt-10 text-3xl">Settings</h1>

   <div className="flex flex-col justify-center items-center mt-10">
    <div aria-hidden="true" className="relative h-28 w-28 mb-8">
     <Icons.logo className="w-full h-full" />
    </div>
    <p className="text-muted-foreground">Coming soon</p>
   </div>
  </section>
 );
};

export default Page;
