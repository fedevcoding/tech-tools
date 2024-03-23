import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import Sidebar from "@/components/Sidebar";

export default function Home() {
 return (
  <MaxWidthWrapper>
   <div className="flex">
    <Sidebar />
    <ProductReel
     query={{ sort: "desc", limit: 18 }}
     title="Top sellers"
     subtitle="Explore our most popular products."
    />
   </div>
  </MaxWidthWrapper>
 );
}
