import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
 return (
  <div className="sticky z-50 top-0 h-16 border-b-2 border-gray-700">
   <header className="relative">
    <MaxWidthWrapper>
     <div></div>
    </MaxWidthWrapper>
   </header>
  </div>
 );
};

export default Navbar;
