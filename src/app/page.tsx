"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import Sidebar from "@/components/Sidebar";
import { useFilters } from "@/hooks/use-filters";

export default function Home() {
 const { category } = useFilters();

 return (
  <MaxWidthWrapper>
   <div className="flex">
    <Sidebar />
    <ProductReel
     query={{ sort: "desc", limit: 18, category }}
     title="Top sellers"
     subtitle="Explore our most popular products."
    />
   </div>
  </MaxWidthWrapper>
 );
}
