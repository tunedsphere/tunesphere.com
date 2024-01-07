import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Shell } from '@/components/shells/shell'
import { CardFooter } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
export default function StoresLoading() {
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
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="/70 rounded-sm border">
              <CardHeader className="h-[155px] border-b bg-muted  p-0">
                <AspectRatio ratio={4 / 3}>
                  <div className="flex h-full items-center justify-center">
                    <Skeleton className="mx-auto h-full w-full" />
                  </div>
                </AspectRatio>
              </CardHeader>
              <CardContent className="grid h-[100px] gap-2.5 p-4">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Shell>
  )
}
