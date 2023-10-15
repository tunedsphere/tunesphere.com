import Link from "next/link"
import { type CuratedStore } from "@/types"

import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { db } from "@/db"
import { products, stores } from "@/db/schema"

import { desc, eq, sql } from "drizzle-orm"

import {
  getDashboardRedirectPath,
  getPlanFeatures,
  getUserSubscriptionPlan,
} from "@/lib/subscription"
import { currentUser } from "@clerk/nextjs"

import { buttonVariants } from "@/components/ui/button"
import { redirect } from "next/navigation"

interface StoreCardProps {
}

export async function CreateStoreCard({ 
 }: StoreCardProps) {

  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  const allStores = await db
    .select({
      id: stores.id,
      name: stores.name,
      storeBanner: stores.storeBanner,
      description: stores.description,
      stripeAccountId: stores.stripeAccountId,
    })
    .from(stores)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`))
    .where(eq(stores.userId, user.id))

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  const { maxStoreCount, maxProductCount } = getPlanFeatures(
    subscriptionPlan?.id
  )

  return (
    <>
    <Link  href={getDashboardRedirectPath({
      storeCount: allStores.length,
      subscriptionPlan: subscriptionPlan,
    })}>
    <Link 
    aria-label="Create store"
    href={getDashboardRedirectPath({
      storeCount: allStores.length,
      subscriptionPlan: subscriptionPlan,
    })}
    className={cn(
      buttonVariants({
        size: "sm",
      })
    )}
  >
    Create store
  </Link>
     <Card className="group h-full border-none shadow-xl hover:shadow-2xl bg-muted/70 relative">
  <AspectRatio ratio={21 / 9}>
    <Badge
      className={cn(
        "pointer-events-none absolute right-2 top-2 text-white z-200 bg-red-600"
      )}
    >
Activate now
    </Badge>
    <div>
    <div
      className="h-full rounded-t-md"
    />
</div>
  </AspectRatio>
  <CardHeader>
    <CardTitle className="line-clamp-1 text-lg font-semibold decoration-2 hover:decoration-4 underline underline-offset-4 decoration-primary">
      Your Store Name
    </CardTitle>
      <CardDescription className="line-clamp-2">
        Store Desicription Example
      </CardDescription>
  </CardHeader>
</Card>
    </Link>
    </>
  )
}
