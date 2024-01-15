import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/db'
import { products } from '@/db/schema'
import type { Subcategory } from '@/types' // Assuming there is a SubCategory type

import { formatTitleWithUnderscores } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface SubCategoryCardProps {
  subCategory: Subcategory
  category: string
}

export async function SubCategoryCard({
  subCategory,
  category,
}: SubCategoryCardProps) {
  return (
    <>
      <div className="grid grid-flow-row">
        <Link
          key={`${category}/${subCategory.title}_link`}
          href={`${category}/${subCategory.slug}`} // Assuming you have a slug property
          className="group relative mb-4 h-40 w-40 cursor-pointer overflow-hidden rounded-full border"
        >
          <Image
            key={`${subCategory.title}_key`}
            src={subCategory.image}
            alt={`${subCategory.title} subCategory`}
            className=" transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            priority
          />

          <span className="sr-only">{subCategory.title}</span>
        </Link>
        <div className="flex justify-center">
          <Link
            href={`${category}/${subCategory.slug}`}
            className="text-center text-base font-medium capitalize underline-offset-4 hover:text-muted-foreground hover:underline"
          >
            {subCategory.title}
          </Link>
        </div>
      </div>
    </>
  )
}
