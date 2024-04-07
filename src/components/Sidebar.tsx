"use client";
import { PROUCT_CATEGORIES } from "@/constants";
import { useFilters } from "@/hooks/use-filters";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const Sidebar = () => {
 const searchParams = useSearchParams();
 const { setCategory } = useFilters();

 const selectedCategory = searchParams.get("category") || "all";

 useEffect(() => {
  setCategory(selectedCategory);
 }, [selectedCategory, setCategory]);

 const createQueryString = useCallback(
  (name: string, value: string) => {
   const params = new URLSearchParams(searchParams.toString());
   params.set(name, value);

   return params.toString();
  },
  [searchParams]
 );

 return (
  <div className="w-[15%] h-full lg:flex flex-col py-10 gap-y-12 overflow-y-scroll border-r-defaultGray border-r-2 hidden">
   <h1 className="text-2xl font-bold">Categories</h1>
   {PROUCT_CATEGORIES.map(({ value, name }) => (
    <Link
     key={value}
     className={cn("text-muted-foreground text-sm tracking-wide", {
      "font-bold text-white": value === selectedCategory,
     })}
     href={`/?${createQueryString("category", value)}`}
    >
     {name}
    </Link>
   ))}
  </div>
 );
};

export default Sidebar;
