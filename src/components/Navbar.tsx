import Link from "next/link";
import { Icons } from "./Icons";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Input } from "./ui/input";
import Cart from "./Cart";

const Navbar = () => {
 return (
  <div className="sticky z-50 top-0 h-20 border-b-2 border-defaultGray">
   <header className="relative">
    <MaxWidthWrapper>
     <div className="flex items-center justify-between h-20">
      <Link className="flex items-center" href={"/"}>
       <Icons.logo />
       <h1 className="text-2xl">TechTools</h1>
      </Link>
      <div className="relative w-96">
       <Input
        className="w-full"
        placeholder="Search for the product you want"
       />
       <Icons.search className="absolute right-4 top-[50%] translate-y-[-50%]" />
      </div>
      <div className="flex items-center gap-12">
       <Icons.bell size={32} className="cursor-pointer" />
       <Cart />
       <Icons.profile size={32} className="cursor-pointer" />
      </div>
     </div>
    </MaxWidthWrapper>
   </header>
  </div>
 );
};

export default Navbar;
