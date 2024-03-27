import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "../hooks/use-cart";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

export function formatPrice(
 price: number | string,
 options: {
  currency?: "USD" | "EUR" | "GBP" | "BDT";
  notation?: Intl.NumberFormatOptions["notation"];
 } = {}
) {
 const { currency = "USD", notation = "compact" } = options;

 const numericPrice = typeof price === "string" ? parseFloat(price) : price;

 return new Intl.NumberFormat("en-US", {
  style: "currency",
  currency,
  notation,
  maximumFractionDigits: 2,
 }).format(numericPrice);
}

export const getCartTotal = (items: CartItem[]) => {
 return items.reduce(
  (acc, { product, quantity }) => acc + product.price * quantity,
  0
 );
};

export function fmap<T, U>(data: T[], callback: (arg: T) => U | undefined) {
 return data.reduce((accum, arg) => {
  const x = callback(arg);
  if (x !== undefined) {
   accum.push(x);
  }
  return accum;
 }, [] as U[]);
}
