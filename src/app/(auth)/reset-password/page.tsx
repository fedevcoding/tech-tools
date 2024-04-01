"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
 EmailCredentialsValidator,
 PasswordCredentialsValidator,
 TEmailCredentialsValidator,
 TPasswordCredentialsValidator,
} from "@/lib/validators/account-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
 const searchParams = useSearchParams();
 const router = useRouter();
 const token = searchParams.get("token");

 const { mutate: sendReset, isLoading: isLoadingEmail } =
  trpc.auth.sendResetPasswordUrl.useMutation({
   onError: () => {
    toast.error("Email not found or something went wrong");
   },
   onSuccess: () => {
    toast.success("Reset email sent successfully");
   },
  });

 const { mutate: resetPassword, isLoading: isLoadingPassword } =
  trpc.auth.resetPassword.useMutation({
   onError: () => {
    toast.error("Token is invalid or expired");
   },
   onSuccess: () => {
    toast.success("Password reset successfully");
    router.push("/sign-in");
   },
  });

 const {
  register: registerEmail,
  handleSubmit: handleSubmitEmail,
  formState: { errors: errorsEmail },
 } = useForm<TEmailCredentialsValidator>({
  resolver: zodResolver(EmailCredentialsValidator),
 });

 const onSubmitEmail = (data: TEmailCredentialsValidator) => {
  sendReset(data);
 };

 const {
  register: registerPassword,
  handleSubmit: handleSubmitPassword,
  formState: { errors: errorsPassword },
 } = useForm<TPasswordCredentialsValidator>({
  resolver: zodResolver(PasswordCredentialsValidator),
 });

 const onSubmitPassword = (data: TPasswordCredentialsValidator) => {
  if (!token) return;
  resetPassword({
   token,
   password: data.password,
  });
 };

 return (
  <>
   <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
    <div className="mx-auto flex W-full flex-col justify-center space-y-6 sm:w-[350px]">
     <div className="flex flex-col items-center space-y-2 text-center">
      <Icons.logo />

      <h1 className="text-3xl font-semibold">Reset account password</h1>
     </div>

     <div className="grid gap-6">
      {token ? (
       <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
        <div className="grid gap-3">
         <div className="grid gap-2 py-1">
          <Label htmlFor="password">New Password</Label>
          <Input
           {...registerPassword("password")}
           type="password"
           className={cn({
            "focus-visible:ring-red-500": errorsPassword.password,
           })}
           placeholder="New Password"
          />
          {errorsPassword?.password && (
           <p className="text-sm text-red-500">
            {errorsPassword.password.message}
           </p>
          )}
         </div>
         <Button disabled={isLoadingPassword}>SEND</Button>
        </div>
       </form>
      ) : (
       <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
        <div className="grid gap-3">
         <div className="grid gap-2 py-1">
          <Label htmlFor="email">Email</Label>
          <Input
           {...registerEmail("email")}
           className={cn({ "focus-visible:ring-red-500": errorsEmail.email })}
           placeholder="Email"
          />
          {errorsEmail?.email && (
           <p className="text-sm text-red-500">{errorsEmail.email.message}</p>
          )}
         </div>
         <Button disabled={isLoadingEmail}>SEND</Button>
        </div>
       </form>
      )}
     </div>
    </div>
   </div>
  </>
 );
};

export default Page;
