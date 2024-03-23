"use client";

import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

const AddToCartButton = ({ product }: { product: Product }) => {
 const { addItem } = useCart();

 return (
  <Button
   onClick={() => {
    addItem(product);
    document.getElementById("cart-modal")?.click();
   }}
   size="lg"
   className="w-full"
   variant={"default"}
  >
   Add to cart
  </Button>
 );
};

export default AddToCartButton;
