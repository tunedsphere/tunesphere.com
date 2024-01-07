import { Shell } from '@/components/shells/shell'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Icon } from '@/components/icon'
import { PageHeader } from '@/components/page-header'

import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function ProductsLoading() {
  return (
    <Shell variant="shop">
      <PageHeader variant="shop">
        <Skeleton className="mx-auto h-9 w-32" />
        <Skeleton className="mx-auto h-9 w-64" />
      </PageHeader>
      <div className="flex items-center justify-between gap-2 px-4">
        <Skeleton className="h-9 w-14" />
        <Skeleton className="h-9 w-20" />
      </div>
      <div className="flex flex-col space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="/70 rounded-sm border">
              <CardHeader className="border-b bg-muted p-0 ">
                <AspectRatio ratio={4 / 3}>
                  <div className="flex h-full items-center justify-center">
                    <Skeleton className="mx-auto h-full w-full" />
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
