import { Shell } from "@/components/shells/shell"

import { Skeleton } from "@/components/ui/skeleton"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export default function AccountLoading() {
  return (
    <Shell variant="dashboard">
         <PageHeader variant="dashboard" id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm">Account</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-8 px-8">
        <div className="grid gap-10 rounded-lg p-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-8 w-52" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-8 w-52" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-8 w-52" />
          </div>
        </div>
      </div>
    </Shell>
  )
}
