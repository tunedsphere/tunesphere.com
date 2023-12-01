"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"


import { catchClerkError } from "@/lib/utils"
import { authSignInSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons/icons"
import { PasswordInput } from "@/components/password-input"

type Inputs = z.infer<typeof authSignInSchema>

interface SignInFormProps {
  handleLinkClick?: () => void
}
export function SignInForm({ handleLinkClick }: SignInFormProps){
  const router = useRouter() 
  const { isLoaded, signIn, setActive } = useSignIn()
  const [isPending, startTransition] = React.useTransition()


  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: Inputs) {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const result = await signIn.create({
          identifier: data.email,
          password: data.password,
        })

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId })

          router.push(`${window.location.origin}/`)
        } else {
          /*Investigate why the login hasn't completed */
          console.log(result)
        }
      } catch (err) {
        catchClerkError(err)
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                autoComplete="email"
                className="bg-background" 
                placeholder="Email" {...field} />
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
              <div className="flex justify-between text-center items-center">
              <FormLabel>Password</FormLabel>
              <Link
            aria-label="Reset password"
            href="/signin/reset-password"
            className="text-xs text-secondary underline-offset-4 transition-colors hover:underline"
            onClick={handleLinkClick}
          >
            Forgot password?
          </Link>
          </div>
              <FormControl>
                <PasswordInput className="bg-background" placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          
        <Button
          type="submit"
          variant="logInButton"
          className="my-8 w-full items-center p-2 text-xl"
          disabled={isPending}
        >
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Log In
          <span className="sr-only">Log In</span>
        </Button>
      </form>
    </Form>
  )
}
