import Link from "next/link";
import { Icons } from "./Icons";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Input } from "./ui/input";
import Cart from "./Cart";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import { buttonVariants } from "./ui/button";
import UserAccountNav from "./UserAccountNav";
import SearchBar from "./Searchbar";

const Navbar = async () => {
 const nextCookies = cookies();
 const { user } = await getServerSideUser(nextCookies);

 return (
  <div className="sticky z-50 top-0 h-20 border-b-2 border-defaultGray bg-background">
   <header className="relative">
    <MaxWidthWrapper>
     <div className="flex items-center justify-between h-20 md:gap-10 gap-2">
      <Link className="flex items-center" href={"/"}>
       <Icons.logo />
       <h1 className="text-2xl hidden md:block pl-2">TechTools</h1>
      </Link>
      <div className="relative w-96">
       <SearchBar />
      </div>
      <div className="flex items-center md:gap-12 gap-4">
       <Cart />
       {!user ? (
        <Link
         href={"/sign-in"}
         className={buttonVariants({ variant: "secondary" })}
        >
         Sign in
        </Link>
       ) : (
        <UserAccountNav user={user} />
       )}
      </div>
     </div>
    </MaxWidthWrapper>
   </header>
  </div>
 );
};

export default Navbar;
