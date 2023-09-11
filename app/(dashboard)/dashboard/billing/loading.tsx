import { Shell } from "@/components/shells/shell"
import { Card } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export default function BillingLoading() {
  return (
    <>
      <Shell variant="dashboard">
        <PageHeader
          variant="dashboard"
          title="Billing">
         <PageHeaderHeading size="sm">Billing</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your billing and subscription
        </PageHeaderDescription>

          </PageHeader>

        <div className="grid gap-8 px-8">
          <div className="grid gap-10 rounded-lg p-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Card variant="dashboard" className="flex space-x-4 px-4 py-3">
              <Skeleton className="mt-2 h-4 w-4 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-14" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="block h-4 w-full md:hidden" />
              </div>
            </Card>
            <Card variant="dashboard" className="flex space-x-4 px-4 py-3">
              <Skeleton className="mt-2 h-4 w-4 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-14" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="block h-4 w-full md:hidden" />
              </div>
            </Card>
            <Skeleton className="h-8 w-40" />
          </div>
        </div>
      </Shell>
    </>
  )
}
