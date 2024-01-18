import { productCategories } from '@/configs/products'
import { CategoryCard } from '@/components/cards/category-card'

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from '@/components/page-header'

import { delayFeaturedCategories } from '@/lib/delays'
import { AspectRatio } from './ui/aspect-ratio'

interface FeaturedCategoriesProps {}

export async function FeaturedCategories({}: FeaturedCategoriesProps) {
  await new Promise((resolve) => setTimeout(resolve, delayFeaturedCategories))

  return (
    <section
      id="featured-categories"
      aria-labelledby="featured-categories-heading"
      className="z-10 w-full space-y-6 py-6 @container md:pt-40"
    >
      <PageHeader className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <PageHeaderHeading as="h2" size="lg" className="py-8 ">
          Categories
        </PageHeaderHeading>
        <PageHeaderDescription size="lg" className="">
          Explore our categories and find the best products for you
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid grid-cols-4 gap-3 px-4 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
        {productCategories.map((category) => (
          <CategoryCard
            key={category.title}
            icon={category.icon}
            category={category}
          />
        ))}
      </div>
    </section>
  )
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-theme/10 before:to-transparent`

function CategorySkeleton() {
  return (
    <div className={`relative rounded-t-lg bg-card ${shimmer}`}>
      <AspectRatio ratio={16 / 9}>
        <div className="flex flex-col justify-around">
          <div className="flex justify-between p-4">
            <div className={`h-7 w-7 rounded-md bg-muted ${shimmer}`} />
            <div className={`h-6 w-1/6 rounded-md bg-muted ${shimmer}`} />
          </div>
          <div className="mt-auto flex items-end self-end p-4">
            <div
              className={`h-8 w-1/6 self-end rounded-md bg-muted ${shimmer}`}
            />
          </div>
        </div>
      </AspectRatio>
    </div>
  )
}

export function FeaturedCategoriesSkeleton() {
  return (
    <section
      id="featured-categories"
      aria-labelledby="featured-categories"
      className="z-10 w-full space-y-6 py-6 @container md:pt-10"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <PageHeader
          id="shop-categories-header"
          aria-labelledby="shop-categories-header-heading"
        >
          <PageHeaderHeading size="lg" className="py-8 ">
            Categories
          </PageHeaderHeading>
          <PageHeaderDescription size="lg" className="">
            Explore our categories and find the best products for you
          </PageHeaderDescription>
        </PageHeader>
      </div>
      <div className="space-y-6 pb-[5px]">
        <div className="grid grid-cols-3 gap-1.5 px-4 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
        </div>
      </div>
    </section>
  )
}
