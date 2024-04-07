"use client";

import { TQyeryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";
import ProductListing from "./ProductListing";
import { Button } from "./ui/button";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { SORT_BY_TYPES, SORT_TYPES, useFilters } from "@/hooks/use-filters";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ProductReelProps {
 title: string;
 subtitle?: string;
 filter?: boolean;
 query: TQyeryValidator;
 classNames?: string;
}

const FALLBACK_LIMIT = 12;

const ProductReel = (props: ProductReelProps) => {
 const minRef = useRef<HTMLInputElement>(null);
 const maxRef = useRef<HTMLInputElement>(null);

 const { title, subtitle, query, filter = true, classNames } = props;

 const { data: queryResults, isLoading } =
  trpc.getInfiniteProducts.useInfiniteQuery(
   {
    limit: query.limit ?? FALLBACK_LIMIT,
    query,
   },
   {
    getNextPageParam: (lastPage) => lastPage.nextPage,
   }
  );

 const products = queryResults?.pages.flatMap((page) => page.items);
 const { setSort, setSortBy, setPrice } = useFilters();

 let map: (Product | null)[] = [];
 if (products && products.length) {
  map = products;
 } else if (isLoading) {
  map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
 }

 return (
  <section className={cn("py-12 lg:pl-10 flex-1", classNames)}>
   <div className="flex items-center justify-between mb-4 lg:flex-row flex-col gap-8 lg:gap-0">
    <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0 text-center">
     {title ? (
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
     ) : null}
     {subtitle ? (
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
     ) : null}
    </div>

    {filter && (
     <div className="flex md:flex-row flex-col items-center md:gap-10  gap-5">
      <div className="flex items-center gap-4">
       <Input placeholder="Min" className="w-16" ref={minRef} />
       <Input placeholder="Max" className="w-16" ref={maxRef} />
       <Button
        onClick={() => {
         setPrice({
          min: Number(minRef.current?.value),
          max: Number(maxRef.current?.value),
         });
        }}
       >
        Apply
       </Button>
      </div>
      <div className="flex items-center">
       <Select
        onValueChange={(v) => {
         const [sortBy, sort] = v.split("-") as [SORT_BY_TYPES, SORT_TYPES];
         setSort(sort);
         setSortBy(sortBy);
        }}
       >
        <SelectTrigger className="w-[180px]">
         <SelectValue placeholder="Order by" />
        </SelectTrigger>
        <SelectContent>
         <SelectItem value="price-desc">Price desc</SelectItem>
         <SelectItem value="price-asc">Price asc</SelectItem>
         <SelectItem value="name-desc">Name desc</SelectItem>
         <SelectItem value="name-asc">Name asc</SelectItem>
        </SelectContent>
       </Select>
      </div>
     </div>
    )}
   </div>

   <div className="relative">
    <div className="mt-6 flex items-center w-full">
     <div className="w-full grid grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-6 md:gap-y-10 lg:gap-x-8">
      {map.map((product, i) => (
       <ProductListing key={`product-${i}`} product={product} index={i} />
      ))}
     </div>
    </div>
   </div>
  </section>
 );
};

export default ProductReel;
