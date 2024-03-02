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
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
   </DropdownMenuContent>
  </DropdownMenu>
 );
};

export default UserAccountNav;
