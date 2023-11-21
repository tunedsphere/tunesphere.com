import Image from "next/image"
import Link from "next/link"
import { db } from "@/db"
import { products, stores, type Product } from "@/db/schema"
import { Shell } from "@/components/shells/shell"
import { desc, eq, sql } from "drizzle-orm"
 import { Icons } from "@/components/icons"
import { productCategories } from "@/configs/products"
import { slugify } from "@/lib/utils"

import heroShop3 from "@/public/bghome/heroShop3.png"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs } from "@/components/ui/tabs"

import { ProductCard } from "@/components/cards/product-card"
import { CategoryCard } from "@/components/cards/category-card"
import { ProudctTabs } from "@/components/pagers/product-tabs"
import { StoreCard } from "@/components/cards/store-card"
import { WhatIsTunedSphere } from "@/components/whatistunedsphere-card"
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription
} from "@/components/page-header"
import { StartYourJourney } from "@/components/start-your-journey"
import { delayFeaturedCategories } from "@/lib/delays"
import { AspectRatio } from "./ui/aspect-ratio"
import { Suspense } from "react"

interface FeaturedCategoriesProps {
  }
  
export async function FeaturedCategories({ }:FeaturedCategoriesProps) {

    await new Promise((resolve) => setTimeout(resolve, delayFeaturedCategories));

  
    return (
      <section
      id="featured-categories"
      aria-labelledby="featured-categories"
      className="w-full space-y-6 py-6 @container md:pt-10 z-10"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <PageHeader
          id="shop-categories-header"
          aria-labelledby="shop-categories-header-heading">
          <PageHeaderHeading size="lg" className="py-8 ">Categories</PageHeaderHeading>
          <PageHeaderDescription size="lg" className="">
            Explore our categories and find the best products for you
          </PageHeaderDescription>
        </PageHeader>
      </div>
      <div className="grid grid-cols-3 sm:gap-8 gap-1.5 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productCategories.map((category) => (
          <CategoryCard 
          key={category.title} 
          category={category} />
        ))}
      </div>
    </section>

    )
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-theme/10 before:to-transparent`;

function CategorySkeleton() {
  return (

  <div className={`relative bg-card rounded-t-lg ${shimmer}`}>
    <AspectRatio ratio={16 / 9}>
      <div className="flex flex-col justify-around">
      <div className="flex justify-between p-4">
    <div className={`h-7 w-7 bg-muted rounded-md ${shimmer}`}/>
    <div className={`h-6 w-1/6 bg-muted rounded-md ${shimmer}`}/>
    </div>
    <div className="flex mt-auto p-4 items-end self-end">
    <div className={`h-8 w-1/6 bg-muted rounded-md self-end ${shimmer}`}/>
    </div>
    </div>
    </AspectRatio>
  </div>
  );
}

export function FeaturedCategoriesSkeleton() {
  return (
    <section
    id="featured-categories"
    aria-labelledby="featured-categories"
    className="w-full space-y-6 py-6 @container md:pt-10 z-10"
  >
    <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
      <PageHeader
        id="shop-categories-header"
        aria-labelledby="shop-categories-header-heading">
        <PageHeaderHeading size="lg" className="py-8 ">Categories</PageHeaderHeading>
        <PageHeaderDescription size="lg" className="">
          Explore our categories and find the best products for you
        </PageHeaderDescription>
      </PageHeader>
    </div>
    <div className="space-y-6 pb-[5px]">
      <div className="grid grid-cols-3 sm:gap-8 gap-1.5 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
  );
}