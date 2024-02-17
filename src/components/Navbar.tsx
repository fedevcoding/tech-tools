import { Icons } from "./Icons";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Input } from "./ui/input";

const Navbar = () => {
 return (
  <div className="sticky z-50 top-0 h-20 border-b-2 border-defaultGray">
   <header className="relative">
    <MaxWidthWrapper>
     <div className="flex items-center justify-between h-20">
      <div className="flex items-center">
       <Icons.logo />
       <h1 className="text-2xl">TechTools</h1>
      </div>

      <Input className="max-w-96" />

      <div className="flex items-center gap-12">
       <Icons.bell size={40} />
       <Icons.cart size={40} />
       <Icons.profile size={40} />
      </div>
     </div>
    </MaxWidthWrapper>
   </header>
  </div>
 );
};

export default Navbar;
