import { ShoppingCart } from "lucide-react";
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
 SheetTrigger,
} from "./ui/sheet";
import { Icons } from "./Icons";

const Cart = () => {
 return (
  <Sheet>
   <SheetTrigger>
    <div className="flex items-center gap-2">
     <Icons.cart size={32} className="cursor-pointer" />
     <span className="text-defaultGray">0</span>
    </div>
   </SheetTrigger>
   <SheetContent>
    <SheetHeader>
     <SheetTitle>Cart (0)</SheetTitle>
    </SheetHeader>
   </SheetContent>
  </Sheet>
 );
};

export default Cart;
