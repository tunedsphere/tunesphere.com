import * as React from "react"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { type z } from "zod"

import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { and, eq, not } from "drizzle-orm"
import { getStripeAccountAction } from "@/app/_actions/stripe"

import { storeSchema } from "@/lib/validations/store"
import { StoredFile } from "@/types"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "@/components/loading-button"
import { Textarea } from "@/components/ui/textarea"


interface UpdateStoreFormProps {
  params: {
    storeId: string
  }
}
type Inputs = z.infer<typeof storeSchema>


export async function UpdateStoreForm({
  params,
}: UpdateStoreFormProps) {
  const storeId = Number(params.storeId)

  async function updateStore(fd: FormData) {
    "use server"

    const name = fd.get("name") as string
    const description = fd.get("description") as string
    const headline = fd.get("headline") as string
    const storeBanner = fd.get("storeBanner") as StoredFile[] | null

    const storeWithSameName = await db.query.stores.findFirst({
      where: and(eq(stores.name, name), not(eq(stores.id, storeId))),
      columns: {
        id: true,
      },
    })

    if (storeWithSameName) {
      throw new Error("Store name already taken")
    }

    await db
      .update(stores)
      .set({ name, description, headline, storeBanner })
      .where(eq(stores.id, storeId))

    revalidatePath(`/dashboard/stores/${storeId}`)
  }

  async function deleteStore() {
    "use server"

    const store = await db.query.stores.findFirst({
      where: eq(stores.id, storeId),
      columns: {
        id: true,
      },
    })

    if (!store) {
      throw new Error("Store not found")
    }

    await db.delete(stores).where(eq(stores.id, storeId))

    // Delete all products of this store
    await db.delete(products).where(eq(products.storeId, storeId))

    const path = "/dashboard/stores"
    revalidatePath(path)
    redirect(path)
  }

  const store = await db.query.stores.findFirst({
    where: eq(stores.id, storeId),
    columns: {
      id: true,
      name: true,
      description: true,
      headline: true,
      storeBanner: true,
    },
  })

  if (!store) {
    notFound()
  }

  const { account: stripeAccount } = await getStripeAccountAction({
    storeId,
  })

  return (
    <Card
        variant="dashboard"
        as="section"
        id="update-store"
        aria-labelledby="update-store-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Update your store</CardTitle>
          <CardDescription>
            Update your store name and description, or delete it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            action={updateStore}
            className="grid w-full max-w-xl gap-5"
          >
            <div className="grid gap-2.5">
              <Label htmlFor="update-store-name">Name</Label>
              <Input
                id="update-store-name"
                aria-describedby="update-store-name-description"
                name="name"
                required
                minLength={3}
                maxLength={50}
                placeholder="Type store name here."
                defaultValue={store.name}
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="update-store-description">Description</Label>
              <Textarea
                id="update-store-description"
                aria-describedby="update-store-description-description"
                name="description"
                minLength={3}
                maxLength={255}
                placeholder="Type store description here."
                defaultValue={store.description ?? ""}
              />
            </div>
            <div className="grid gap-2.5">
  <Label htmlFor="update-store-headline">Headline</Label>
  <Textarea
    id="update-store-headline"
    aria-describedby="update-store-headline-description"
    name="headline"
    maxLength={100} // Maximum of 100 characters
    placeholder="Short description. Maximum of 100 characters."
    defaultValue={store.headline ?? ""} // Set the initial value from the database
  />
</div>
            <div className="flex flex-col gap-2 xs:flex-row">
              <LoadingButton>
                Update store
                <span className="sr-only">Update store</span>
              </LoadingButton>
              <LoadingButton
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                formAction={deleteStore}
                variant="destructive"
              >
                Delete store
                <span className="sr-only">Delete store</span>
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>
  )
}