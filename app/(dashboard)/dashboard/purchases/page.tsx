
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { Shell } from "@/components/shells/shell"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export const metadata: Metadata = {
  title: "Purchases",
  description: "Manage your purchases",
}

export default async function PurchasesPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  return (
    <>
      <Shell variant="dashboard">
      <PageHeader
        variant="dashboard"
        id="dashboard-purchases-header"
        aria-labelledby="dashboard-purchases-header-heading"
      >
        <PageHeaderHeading size="sm">Purchases</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your purchases
        </PageHeaderDescription>
      </PageHeader>
        <div className="grid gap-8 sm:px-8 px-2">
          <div>Purchases Table</div>
        </div>
      </Shell>
    </>
  )
}
