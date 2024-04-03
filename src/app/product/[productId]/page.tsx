import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getPayloadClient } from "@/get-payload";
import { notFound } from "next/navigation";
import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbLink,
 BreadcrumbList,
 BreadcrumbPage,
 BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatPrice, getCategory, validImageUrls } from "@/lib/utils";
import { Check, Shield } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";
import ProductReel from "@/components/ProductReel";
import AddToCartButton from "@/components/AddToCartButton";
import { Metadata } from "next";

type PageProps = {
 params: {
  productId: string;
 };
};

export async function generateMetadata({
 params,
}: PageProps): Promise<Metadata> {
 const { productId } = params;

 const payload = await getPayloadClient();
 const {
  docs: [product],
 } = await payload.find({
  collection: "products",
  where: {
   id: {
    equals: productId,
   },
  },
  limit: 1,
 });
 if (!product) {
  return {
   title: `Product not found`,
  };
 }

 return {
  title: `TechTools | ${product.name}`,
 };
}

const Page = async ({ params: { productId } }: PageProps) => {
 const payload = await getPayloadClient();
 const {
  docs: [product],
 } = await payload.find({
  collection: "products",
  where: {
   id: {
    equals: productId,
   },
  },
  limit: 1,
 });

 if (!product) {
  notFound();
 }

 const validUrls = validImageUrls(product.images);

 return (
  <MaxWidthWrapper>
   <div>
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
     <div className="lg:max-w-lg lg:self-end">
      <Breadcrumb>
       <BreadcrumbList>
        <BreadcrumbItem>
         <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
         <BreadcrumbLink href="/">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
         <BreadcrumbPage>{product.name}</BreadcrumbPage>
        </BreadcrumbItem>
       </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4">
       <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {product.name}
       </h1>
      </div>

      <section className="mt-4">
       <div className="flex items-center">
        <p className="font-medium">{formatPrice(product.price)}</p>
        <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
         {getCategory(product.category)}
        </div>
       </div>
       <div className="mt-4 space-y-6">
        <p className="text-base text-muted-foreground">{product.description}</p>
       </div>
       <div className="mt-6 flex items-center">
        <Check
         aria-hidden="true"
         className="h-5 w-5 flex-shrink-0 text-green-500"
        />
        <p className="ml-2 text-sm text-muted-foreground">
         Free and Fast Shipping
        </p>
       </div>
      </section>
     </div>

     <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
      <div className="aspect-square rounded-lg max-w-[80%]">
       <ImageSlider urls={validUrls} />
      </div>
     </div>

     <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
      <div>
       <div className="mt-10">
        <AddToCartButton product={product} />
       </div>
       <div className="mt-6 text-center">
        <div className="group inline-flex text-sm text-medium">
         <Shield
          aria-hidden="true"
          className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
         />
         <span className="text-muted-foreground">
          Secure payments Guarantee
         </span>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>

   <ProductReel
    query={{ sort: "desc", limit: 6, category: getCategory(product.category) }}
    filter={false}
    title={`Similar`}
    subtitle={`Browse similar high-quality products just like '${product.name}'`}
   />
  </MaxWidthWrapper>
 );
};

export default Page;
