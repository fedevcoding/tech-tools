import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import tailwindConfig from "@/../tailwind.config";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

export const tailwindColors = { ...tailwindConfig.theme.extend.colors };
