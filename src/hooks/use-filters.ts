"use client";
import { Product } from "@/payload-types";
import { create } from "zustand";

export type CartItem = {
 product: Product;
 quantity: number;
};

type FiltersState = {
 category: string;
 sort: "asc" | "desc";

 setCategory: (category: string) => void;
 setSort: (sort: "asc" | "desc") => void;
};

export const useFilters = create<FiltersState>((set) => ({
 category: "all",
 sort: "asc",

 setCategory: (category) => set({ category }),
 setSort: (sort) => set({ sort }),
}));
