"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError, useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { signUpSchema } from "@/lib/validations/auth";
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




type Inputs = z.infer<typeof signUpSchema> & {
  username: string;
  dateOfBirth: string;
};
export function SignUpForm() {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const [isPending, startTransition] = React.useTransition();

  const [passwordRequirements] = useState([
    {
      regex: /^(?=.*[a-z]).+$/,
      message: "Password must contain at least one lowercase letter",
    },
    {
      regex: /^(?=.*[A-Z]).+$/,
      message: "Password must contain at least one uppercase letter",
    },
    {
      regex: /^(?=.*[0-9]).+$/,
      message: "Password must contain at least one digit",
    },
    {
      regex: /^(?=.*[!@#$%^&*+=_~`|()\{\}[\]:;<>?/\\'".,\\\-]).+$/,
      message: "Password must contain at least one special character",
    },
    {
    regex: /^\S*$/,
    message: "Spaces are not allowed",
  },
  ]);

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const form = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      name: "",
      lastName: "",
      dateOfBirth: "",
    },
  });

  function validatePassword(password: string): boolean {
    const errors = passwordRequirements.reduce<string[]>((acc, requirement) => {
      if (!requirement.regex.test(password)) {
        acc.push(requirement.message);
      }
      return acc;
    }, []);

    setPasswordErrors(errors);
    return errors.length === 0;
  }

  function onSubmit(data: Inputs) {
    if (!isLoaded) return;

    startTransition(async () => {
      const isPasswordValid = validatePassword(data.password);

      if (isPasswordValid) {
        try {
          await signUp.create({
            emailAddress: data.email,
            password: data.password,
          });

          // Send email verification code
          await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
          });

          router.push("/signup/verify-email");
          toast.message("Check your email", {
            description: "We sent you a 6-digit verification code.",
          });
        } catch (error) {
          const unknownError = "Something went wrong, please try again.";

          isClerkAPIResponseError(error)
            ? toast.error(error.errors[0]?.longMessage ?? unknownError)
            : toast.error(unknownError);
        }
      }
    });
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
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="youremail@example.com" {...field} />
              </FormControl>
              {formState.errors.email && (
                <FormMessage>{formState.errors.email.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="**********"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event);
                    validatePassword(event.target.value);
                  }}
                />
              </FormControl>
              {passwordErrors.map((error, index) => (
                <FormMessage key={index} color="error">
                  {error}
                </FormMessage>
              ))}
              {formState.errors.password && !passwordErrors.length && (
                <FormMessage>{formState.errors.password.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
          <FormField
    control={form.control}
    name="username"
    render={({ field, formState }) => (
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="Enter your username" {...field} />
        </FormControl>
        {formState.errors.username && (
          <FormMessage>{formState.errors.username.message}</FormMessage>
        )}
      </FormItem>
    )}
  /> 
  
  <div className="flex flex-row">
  <div className="flex flex-col flex-grow mr-2">
    <FormField
      control={form.control}
      name="name"
      render={({ field, formState }) => (
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
      render={({ field, formState }) => (
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

  <FormField
    control={form.control}
    name="dateOfBirth"
    render={({ field, formState }) => (
      <FormItem>
        <FormLabel>Date of Birth</FormLabel>
        <FormControl>
          <Input
            type="date"
            placeholder="Select your date of birth"
            {...field}
          />
        </FormControl>
       
      </FormItem>
    )}
  />
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
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