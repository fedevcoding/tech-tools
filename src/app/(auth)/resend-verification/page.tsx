"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
 EmailCredentialsValidator,
 TEmailCredentialsValidator,
} from "@/lib/validators/account-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
 const searchParams = useSearchParams();
 const router = useRouter();

 const { mutate } = trpc.auth.resendVerificationEmail.useMutation({
  onError: (err) => {
   if (err.data?.code === "BAD_REQUEST") {
    toast.error("Invalid email");
   }
  },
  onSuccess: ({ sentToEmail }) => {
   toast.success("Email sent successfully");

   router.push(`/verify-email?to=${sentToEmail}`);
  },
 });

 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm<TEmailCredentialsValidator>({
  resolver: zodResolver(EmailCredentialsValidator),
 });

 const onSubmit = (data: TEmailCredentialsValidator) => {
  mutate(data);
 };

 return (
  <>
   <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
    <div className="mx-auto flex W-full flex-col justify-center space-y-6 sm:w-[350px]">
     <div className="flex flex-col items-center space-y-2 text-center">
      <div aria-hidden="true" className="relative h-20 w-20 mb-8">
       <Icons.logo className="w-full h-full" />
      </div>

      <h1 className="text-3xl font-semibold">Resend verification email</h1>
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
        <Button>SEND</Button>
       </div>
      </form>
     </div>
    </div>
   </div>
  </>
 );
};

export default Page;
