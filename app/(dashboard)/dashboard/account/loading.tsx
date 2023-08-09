import { Shell } from "@components/shells/shell"

import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/header"

export default function AccountLoading() {
  return (
    <Shell variant="dashboard">
      <Header
        variant="dashboard"
        title="Stores"
        description="Manage your stores."
        size="sm"
      />
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
