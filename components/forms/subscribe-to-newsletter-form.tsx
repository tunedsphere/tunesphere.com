"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { emailSchema } from "@/lib/validations/email"
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

type Inputs = z.infer<typeof emailSchema>

export function SubscribeToNewsletterForm() {
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: Inputs) {
    console.log("Form Data:", data);

    startTransition(async () => {
      const response = await fetch("/api/email/newsletter", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          // This token is used as a search param in the email preferences page to identify the subscriber.
          token: crypto.randomUUID(),
          subject: "Welcome to TunedSphere",
        }),
      })

      if (!response.ok) {
        console.log("API Error Response:", response.status);  
        switch (response.status) {
          case 409:
            toast.error("You are already subscribed to our newsletter.")
            break
          case 422:
            toast.error("Invalid input.")
            break
          case 429:
            toast.error("The daily email limit has been reached.")
            break
          case 500:
            toast.error("Something went wrong. Please try again later.")
            break
          default:
            toast.error("Something went wrong. Please try again later.")
        }
        return
      }

      toast.success("You have been subscribed to our newsletter.")
      form.reset()
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full bg-background/80 rounded-md"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative space-y-0 ">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  placeholder="galactic@example.com"
                  className="pr-12"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute pt-2 pl-2" />
              <Button
                type="submit"
                className="absolute right-2 top-[4px] z-20 h-8 w-8 align-middle object-contain"
                size="icon"
                disabled={isPending}
              >
                {isPending ? (
                  <Icons.spinner
                    className="h-3 w-3 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Icons.flame className="h-3 w-3" aria-hidden="true" />
                )}
                <span className="sr-only">Join newsletter</span>
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
