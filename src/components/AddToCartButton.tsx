"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

const AddToCartButton = ({ product }: { product: Product }) => {
 const { addItem, items, removeItem } = useCart();
 console.log(items);
 const isInCart = items.find((item) => item.product.id === product.id);

 return (
  <Button
   onClick={() => {
    isInCart ? removeItem(product.id) : addItem(product);
   }}
   size="lg"
   className="w-full"
   variant={isInCart ? "destructive" : "default"}
  >
   {isInCart ? "Remove from cart" : "Add to cart"}
  </Button>
 );
};

export default AddToCartButton;
