import { Shell } from "@/components/shells/shell"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"
import { PageHeader } from "@/components/page-header"

export default function ProductsLoading() {
  return (
    <Shell variant="shop">
      <PageHeader
      variant="shop">      
      <Skeleton className="h-9 w-32 mx-auto" />
      <Skeleton className="h-9 w-64 mx-auto" />
      </PageHeader>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-14" />
          <Skeleton className="h-9 w-20" />
        </div>
        <div className="flex justify-between content-center items-stretch px-12">
        <Skeleton className="h-9 w-14" />
        <Skeleton className="h-9 w-14" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="rounded-sm">
              <CardHeader className="border-b p-0">
                <div className="flex h-full items-center justify-center bg-muted/30">
                <Skeleton
                    className="h-36 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
              </CardHeader>
              <CardContent className="grid gap-2.5 p-4">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
              <CardFooter className="p-4">
                <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
                  <Skeleton className="h-8 w-full rounded-sm" />
                  <Skeleton className="h-8 w-full rounded-sm" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Shell>
  )
}
