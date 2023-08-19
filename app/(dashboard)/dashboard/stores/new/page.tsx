import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"
import { Shell } from "@/components/shells/shell"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AddStoreForm } from "@/components/forms/add-store-form"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "New Store",
  description: "Add a new store",
}

export default async function NewStorePage() {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  return (
    <>
      <Shell variant="dashboard">
        <Header
          variant="dashboard"
          title="New Store"
          description="New store for your account."
          size="sm"
        />
        <div className="grid gap-8 sm:px-8 px-2">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Add store</CardTitle>
              <CardDescription>Add a new store to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <AddStoreForm userId={user.id} />
            </CardContent>
          </Card>
        </div>
      </Shell>
    </>
  )
}
