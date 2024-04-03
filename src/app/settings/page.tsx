import { Icons } from "@/components/Icons";

const Page = () => {
 return (
  <section>
   <h1 className="text-center mt-10 text-3xl">Settings</h1>

   <div className="flex flex-col justify-center items-center mt-10">
    <Icons.logo className="w-32 h-32" />
    <p className="text-muted-foreground">Coming soon</p>
   </div>
  </section>
 );
};

export default Page;
