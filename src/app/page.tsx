import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";

export default function Home() {
 return (
  <MaxWidthWrapper>
   <ProductReel
    query={{ sort: "desc", limit: 4 }}
    title="Top sellers"
    subtitle="Explore our most popular products."
   />
  </MaxWidthWrapper>
 );
}
