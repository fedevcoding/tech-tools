"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import Sidebar from "@/components/Sidebar";
import { useFilters } from "@/hooks/use-filters";

export default function Home() {
 const { category, sortBy, sort, price } = useFilters();

 return (
  <MaxWidthWrapper>
   <div className="flex">
    <Sidebar />
    <ProductReel
     query={{ sort, limit: 18, category, sortBy, price }}
     title="Top sellers"
     subtitle="Explore our most popular products."
    />
   </div>
  </MaxWidthWrapper>
 );
}
