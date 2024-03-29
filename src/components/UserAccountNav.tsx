"use client";
import {
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./Icons";
import { DropdownMenu } from "./ui/dropdown-menu";
import { User } from "payload/dist/auth";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, Package, Settings } from "lucide-react";
import Link from "next/link";

const UserAccountNav = ({ user }: { user: User }) => {
 const { signOut } = useAuth();
 return (
  <DropdownMenu>
   <DropdownMenuTrigger className="overflow-visible">
    <Icons.profile size={32} className="cursor-pointer" />
   </DropdownMenuTrigger>

   <DropdownMenuContent align="end" className="py-2 px-4">
    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <Link href="/settings">
     <DropdownMenuItem className="cursor-pointer flex justify-between">
      <p>Settings</p>
      <Settings className="w-4" />
     </DropdownMenuItem>
    </Link>
    <Link href="/orders">
     <DropdownMenuItem className="cursor-pointer flex justify-between">
      <p>My orders</p>
      <Package className="w-4" />
     </DropdownMenuItem>
    </Link>
    <DropdownMenuItem
     className="cursor-pointer flex justify-between"
     onClick={signOut}
    >
     <p>Sign out</p>
     <LogOut className="w-4" />
    </DropdownMenuItem>
    {/* 
    <DropdownMenuItem className="cursor-pointer" >
     Log out
    </DropdownMenuItem> */}
   </DropdownMenuContent>
  </DropdownMenu>
 );
};

export default UserAccountNav;
