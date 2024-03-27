"use client";
import { Product } from "@/payload-types";
import { create } from "zustand";

export type CartItem = {
 product: Product;
 quantity: number;
};

export type SORT_TYPES = "asc" | "desc";
export type SORT_BY_TYPES = "price" | "name";

type FiltersState = {
 category: string;
 sort: SORT_TYPES;
 sortBy: SORT_BY_TYPES;
 price: {
  min: number | null;
  max: number | null;
 };

 setPrice: (price: { min: number | null; max: number | null }) => void;
 setCategory: (category: string) => void;
 setSort: (sort: SORT_TYPES) => void;
 setSortBy: (sortBy: SORT_BY_TYPES) => void;
};

export const useFilters = create<FiltersState>((set) => ({
 category: "all",
 sort: "asc",
 sortBy: "price",
 price: {
  min: null,
  max: null,
 },
 setPrice: (price) => set({ price }),
 setSortBy: (sortBy) => set({ sortBy }),
 setCategory: (category) => set({ category }),
 setSort: (sort) => set({ sort }),
}));
