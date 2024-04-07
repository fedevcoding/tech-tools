"use client";
import { useCallback, useEffect, useRef } from "react";
import { Icons } from "./Icons";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useFilters } from "@/hooks/use-filters";

const SearchBar = () => {
 const { setSearch } = useFilters();
 const inputRef = useRef<HTMLInputElement>(null);
 const searchParams = useSearchParams();
 const router = useRouter();

 const selectedCategory = searchParams.get("search");

 useEffect(() => {
  setSearch(selectedCategory);
 }, [selectedCategory, setSearch]);

 const createQueryString = useCallback(
  (name: string, value: string) => {
   const params = new URLSearchParams(searchParams.toString());
   params.set(name, value);

   return params.toString();
  },
  [searchParams]
 );

 return (
  <form
   onSubmit={(e) => {
    e.preventDefault();
    const query = inputRef.current?.value;
    router.push(`/?${createQueryString("search", query ?? "")}`);
   }}
  >
   <Input
    className="w-full pl-10"
    placeholder="Search for the product you want"
    ref={inputRef}
   />
   <Icons.search className="absolute left-2 top-[50%] translate-y-[-50%]" />
  </form>
 );
};

export default SearchBar;
