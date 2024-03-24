import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import tailwindConfig from "@/../tailwind.config";
import { CartItem } from "@/hooks/use-cart";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

export const tailwindColors = { ...tailwindConfig.theme.extend.colors };

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
