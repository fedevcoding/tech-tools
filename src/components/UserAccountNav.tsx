"use client";
import {
 DropdownMenuContent,
 DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Icons } from "./Icons";
import { DropdownMenu } from "./ui/dropdown-menu";
import { User } from "payload/dist/auth";

const UserAccountNav = ({ user }: { user: User }) => {
 return (
  <>
   <DropdownMenu>
    <DropdownMenuTrigger asChild className="overflow-visible">
     <Icons.profile size={32} className="cursor-pointer" />
    </DropdownMenuTrigger>

    <DropdownMenuContent className="bg-white w-60" align="end">
     <div className="flex items-center justify-start gap-2 p-2">
      <div className="flex flex-col space-y-0.5 leading-none">
       <p className="font-medium text-sm text-black">{user.email}</p>
      </div>
     </div>
    </DropdownMenuContent>
   </DropdownMenu>
  </>
 );
};

export default UserAccountNav;
