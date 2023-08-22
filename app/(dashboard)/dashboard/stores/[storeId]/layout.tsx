import { notFound, redirect } from "next/navigation"
import { db } from "@/db"
import { stores } from "@/db/schema"
import { currentUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm"

import {
  getDashboardRedirectPath,
  getUserSubscriptionPlan,
} from "@/lib/subscription"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"
import { StoreSwitcher } from "@/components/pagers/store-switcher"
import { StoreTabs } from "@/components/pagers/store-tabs"
import { Shell } from "@/components/shells/shell"

interface StoreLayoutProps {
  children: React.ReactNode
  params: {
    storeId: string
  }
}

export default async function StoreLayout({
  children,
  params,
}: StoreLayoutProps) {
  const storeId = Number(params.storeId)

  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  const allStores = await db
    .select({
      id: stores.id,
      name: stores.name,
    })
    .from(stores)
    .where(eq(stores.userId, user.id))

  const store = allStores.find((store) => store.id === storeId)

  if (!store) {
    notFound()
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  return (
    <Shell variant="dashboard" className="gap-4">
           <PageHeader variant="dashboard" >
         <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
          {store.name}
        </PageHeaderHeading>
        </div>
        </PageHeader>
        <div className="flex items-center space-x-4 pr-1">
        {allStores.length > 1 ? (
          <StoreSwitcher
            currentStore={store}
            stores={allStores}
            dashboardRedirectPath={getDashboardRedirectPath({
              subscriptionPlan,
              storeCount: allStores.length,
            })}
          />
        ) : null}
      </div>
      <div className="space-y-4 overflow-hidden">
        <StoreTabs storeId={storeId} />
        {children}
      </div>
    </Shell>
  )
}