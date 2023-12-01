import { Shell } from "@/components/shells/shell"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons/icons"
import { PageHeader } from "@/components/page-header"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function ProductsLoading() {
  return (
    <Shell variant="shop">
      <PageHeader
      variant="shop">      
      <Skeleton className="h-9 w-32 mx-auto" />
      <Skeleton className="h-9 w-64 mx-auto" />
      </PageHeader>      
        <div className="flex justify-between items-center gap-2 px-4">
          <Skeleton className="h-9 w-14" />
          <Skeleton className="h-9 w-20" />
        </div>
        <div className="flex flex-col space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="rounded-sm border border-muted/70">
              <CardHeader className="border-b p-0 bg-muted border-muted">
                <AspectRatio ratio={4 / 3}>
                  <div className="flex h-full items-center justify-center">
                  <Skeleton className="h-full w-full mx-auto" />
                  </div>
                </AspectRatio>
              </CardHeader>
              <CardContent className="grid gap-2.5 p-4">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
              <CardFooter className="p-4">
                <Skeleton className="h-8 w-full rounded-sm" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Shell>
  )
}
