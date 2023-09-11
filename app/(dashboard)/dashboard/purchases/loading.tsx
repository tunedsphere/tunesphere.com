import { Shell } from "@/components/shells/shell"

import { Skeleton } from "@/components/ui/skeleton"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export default function PurchasesLoading() {
  return (
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
      <div className="grid gap-10 rounded-lg p-4 px-8">
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-8 w-40" />
      </div>
    </Shell>
  )
}
