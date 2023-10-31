import Link from "next/link"
import { type CuratedStore } from "@/types"

import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"


interface StoreCardProps {
}

export function CreateStoreCard({ 
 }: StoreCardProps) {

  return (
    <>
    <Link
    href="/dashboard/stores/new"
    >
     <Card className="group h-full shadow-xl hover:shadow-2xl bg-muted/70 relative">
  <AspectRatio ratio={21 / 9}>
    <Badge
      className={cn(
        "pointer-events-none absolute right-2 top-2 text-white z-50 bg-red-600"
      )}
    >
Not yet created
    </Badge>
    <div
      className="flex h-full flex-col justify-center rounded-t-md items-center bg-card">
        {/* <h6 className="pt-8 pb-2 items-center decoration-primary underline decoration-2 underline-offset-4">Add a new Store</h6> */}
            <div className="border-2 border-primary rounded-md flex-justify-content items-center">
            <Icons.add className="h-20 w-20 p-2 hover:w-[84px] hover:h-[84px]"></Icons.add>
            </div>
        </div>
  </AspectRatio>
  <CardHeader className="bg-muted">
    <CardTitle className="line-clamp-1 text-lg font-semibold decoration-2 hover:decoration-4 underline underline-offset-4 decoration-primary">
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
