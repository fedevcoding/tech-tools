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
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

const Page = () => {
 const router = useRouter();

 const { mutate } = trpc.auth.createPayloadUser.useMutation({
  onError: (err) => {
   if (err.data?.code === "CONFLICT") {
    toast.error("This email is already in use. Sign in instead?");
    return;
   }

   if (err instanceof ZodError) {
    toast.error(err.issues[0].message);
    return;
   }

   toast.error("Something went wrong. Please try again");
  },
  onSuccess: ({ sentToEmail }) => {
   toast.success(`Verification email sent to ${sentToEmail}.`);
   router.push(`/verify-email?to=${sentToEmail}`);
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

      <h1 className="text-3xl font-semibold">Create an account</h1>

      <Link
       href={"/sign-in"}
       className={buttonVariants({ variant: "link", className: " gap-1.5" })}
      >
       Already have an account? Sign-in
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
        <Link
         href={"/resend-verification"}
         className={buttonVariants({ variant: "link" })}
        >
         Didn&apos;t received email verification?
        </Link>
        <Button>SIGN UP</Button>
       </div>
      </form>
     </div>
    </div>
   </div>
  </>
 );
};

export default Page;
