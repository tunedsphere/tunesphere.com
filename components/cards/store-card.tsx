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
import { StoreBanner } from "@/components/store-banner"


interface StoreCardProps {
  store: CuratedStore
  href: string

}

export function StoreCard({ 
  store,
  href,

 }: StoreCardProps) {

  return (
    <>
    <Link 
    key={store.id}
    aria-label={store.name}
    href={href}>
     <Card className="group h-full border-none shadow-xl hover:shadow-2xl relative">
  <AspectRatio ratio={21 / 9}>
    <Badge
      className={cn(
        "pointer-events-none absolute right-2 top-2 text-white z-200",
        store.stripeAccountId ? "bg-green-600" : "bg-red-600"
      )}
    >
      {store.stripeAccountId ? "Active" : "Inactive"}
    </Badge>
  {store.storeBanner ? (
    <StoreBanner className="object-fit"
    images={store.storeBanner} />
  ) : (
    <div
      className="h-full rounded-t-md"
      style={getRandomPatternStyle(String(store.id))}
    />
  )}
  </AspectRatio>
  <CardHeader className="z-100">
    <CardTitle className="line-clamp-1 text-lg font-semibold decoration-2 hover:decoration-4 underline underline-offset-4 decoration-primary">
      {store.name}
    </CardTitle>
    {store.description ? (
      <CardDescription className="line-clamp-2">
        {store.description}
      </CardDescription>
    ) : null}
  </CardHeader>
</Card>
    </Link>
    </>
  )
}
