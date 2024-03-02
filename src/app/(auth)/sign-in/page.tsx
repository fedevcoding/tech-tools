"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
 AuthCredentialsValidator,
 TAuthCredentialsValidator,
} from "@/lib/validators/account-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
 const searchParams = useSearchParams();
 const router = useRouter();
 const origin = searchParams.get("origin");

 const { mutate } = trpc.auth.signIn.useMutation({
  onError: (err) => {
   if (err.data?.code === "UNAUTHORIZED") {
    toast.error("Invalid email or password");
   }
  },
  onSuccess: () => {
   toast.success("Signed in successfully");

   if (origin) {
    router.push(`/${origin}`);
    router.refresh();
    return;
   }
   router.push("/");
   router.refresh();
  },
 });

 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm<TAuthCredentialsValidator>({
  resolver: zodResolver(AuthCredentialsValidator),
 });

 const onSubmit = (data: TAuthCredentialsValidator) => {
  mutate(data);
 };

 return (
  <>
   <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
    <div className="mx-auto flex W-full flex-col justify-center space-y-6 sm:w-[350px]">
     <div className="flex flex-col items-center space-y-2 text-center">
      <Icons.logo />

      <h1 className="text-3xl font-semibold">Sign in to your account</h1>

      <Link
       href={"/sign-up"}
       className={buttonVariants({ variant: "link", className: " gap-1.5" })}
      >
       Don&apos;t have an account?
      </Link>
     </div>

     <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
       <div className="grid gap-3">
        <div className="grid gap-2 py-1">
         <Label htmlFor="email">Email</Label>
         <Input
          {...register("email")}
          className={cn({ "focus-visible:ring-red-500": errors.email })}
          placeholder="Email"
         />
         {errors?.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
         )}
        </div>
        <div className="grid gap-2 py-1">
         <Label htmlFor="password">Password</Label>
         <Input
          {...register("password")}
          type="password"
          className={cn({ "focus-visible:ring-red-500": errors.password })}
          placeholder="Password"
         />
         {errors?.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
         )}
        </div>
        <Button>SIGN IN</Button>
       </div>
      </form>
     </div>
    </div>
   </div>
  </>
 );
};

export default Page;
