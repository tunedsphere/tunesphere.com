"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError, useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { authSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { PasswordInput } from "@/components/password-input";


type Inputs = z.infer<typeof authSchema>
export function SignUpForm() {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    },
  })
  function onSubmit(data: Inputs) {
    if (!isLoaded) return
  startTransition(async () => {
    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      })

      // Send email verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      })

      router.push("/signup/verify-email")
      toast.message("Check your email", {
        description: "We sent you a 6-digit verification code.",
      })
    } catch (error) {
      const unknownError = "Something went wrong, please try again."

      isClerkAPIResponseError(error)
        ? toast.error(error.errors[0]?.longMessage ?? unknownError)
        : toast.error(unknownError)
    }
  })
}

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="youremail@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
               <PasswordInput placeholder="**********" {...field} />
               </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
    control={form.control}
    name="username"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="Enter your username" {...field} />
        </FormControl>
        <FormMessage />
            </FormItem>
          )}
        />
  
  <div className="flex flex-row">
  <div className="flex flex-col flex-grow mr-2">
    <FormField
      control={form.control}
      name="firstName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter your name" {...field} />
          </FormControl>
    
        </FormItem>
      )}
    />
  </div>
  <div className="flex flex-col flex-grow">
    <FormField
      control={form.control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter your last name" {...field} />
          </FormControl>
        
        </FormItem>
      )}
    />
  </div>
</div>


        <Button 
        className="py-2 my-2"
        variant="logInButton"
        disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin "
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  );
}