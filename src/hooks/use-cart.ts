"use client";
import { Product } from "@/payload-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
 product: Product;
 quantity: number;
};

const MAX_QUANTITY = 20;

type CartState = {
 items: CartItem[];
 addItem: (product: Product) => void;
 removeItem: (product: string) => void;
 decrementItem: (product: string) => void;
 clearCart: () => void;
};

export const useCart = create<CartState>()(
 persist(
  (set) => ({
   items: [],
   addItem: (product) =>
    set((state) => {
     const item = state.items.find((item) => item.product.id === product.id);
     if (item && item.quantity >= MAX_QUANTITY) {
      return {};
     }

     if (item) {
      return {
       items: state.items.map((item) =>
        item.product.id === product.id
         ? { ...item, quantity: item.quantity + 1 }
         : item
       ),
      };
     }
     return { items: [...state.items, { product, quantity: 1 }] };
    }),
   removeItem: (id) =>
    set((state) => ({
     items: state.items.filter((item) => item.product.id !== id),
    })),
   decrementItem: (id: string) =>
    set((state) => {
     const item = state.items.find((item) => item.product.id === id);
     if (item && item.quantity > 1) {
      return {
       items: state.items.map((item) =>
        item.product.id === id ? { ...item, quantity: item.quantity - 1 } : item
       ),
      };
     }
     return { items: state.items.filter((item) => item.product.id !== id) };
    }),
   clearCart: () => set({ items: [] }),
  }),
  {
   name: "cart-storage",
   storage: createJSONStorage(() => localStorage),
  }
 )
);
