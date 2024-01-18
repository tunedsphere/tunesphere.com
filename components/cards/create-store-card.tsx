import Link from 'next/link'
import { type CuratedStore } from '@/types'

import { getRandomPatternStyle } from '@/lib/generate-pattern'
import { cn } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Icon } from '@/components/icon'

interface StoreCardProps {}

export function CreateStoreCard({}: StoreCardProps) {
  return (
    <>
      <Link href="/dashboard/stores/new">
        <Card className="group relative h-full bg-muted/70 shadow-xl hover:shadow-2xl">
          <AspectRatio ratio={21 / 9}>
            <Badge
              className={cn(
                'pointer-events-none absolute right-2 top-2 z-50 bg-red-600 text-white',
              )}
            >
              Not yet created
            </Badge>
            <div className="flex h-full flex-col items-center justify-center rounded-t-md bg-card">
              {/* <h6 className="pt-8 pb-2 items-center decoration-primary underline decoration-2 underline-offset-4">Add a new Store</h6> */}
              <div className=" flex-justify-content items-center rounded-md">
                <Icon
                  name="add"
                  className="h-20 w-20 p-2 hover:h-[84px] hover:w-[84px]"
                />
              </div>
            </div>
          </AspectRatio>
          <CardHeader className="bg-muted">
            <CardTitle className="line-clamp-1 text-lg font-semibold underline decoration-primary decoration-2 underline-offset-4 hover:decoration-4">
              Add Store
            </CardTitle>
            <CardDescription className="line-clamp-2">
              Sell your products using this store
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </>
  )
}
