import Image from "next/image";
import Link from "next/link";
import { db } from "@/db";
import { products } from "@/db/schema";
import type { Category } from "@/types";
import { eq, sql } from "drizzle-orm";
import { formatTitleWithUnderscores } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import { ShopIcon, IconName } from "../icon/shop";

interface CategoryCardProps {
  category: Category;
  icon?: string;
}

export async function CategoryCard({ category, icon }: CategoryCardProps) {
  const productCount = await db
    .select({
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(products)
    .where(eq(products.category, category.title))
    .execute()
    .then((res) => res[0]?.count ?? 0);

  return (
    <>
      <div className="flex flex-col">
        <Link
          key={`${category.title}_link`}
          href={`shop/c/${category.title}`}
          className="group relative overflow-hidden sm:rounded-md border border-muted rounded-full cursor-default"
        >
          <AspectRatio ratio={16 / 9}>
            <div className="absolute inset-0 z-10 bg-muted/20 transition-color group-hover:bg-zinc-950/50" />
            <Image
              key={`${category.title}_key`}
              src={category.image}
              alt={`${category.title} category`}
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              priority
            />
          </AspectRatio>
          <div className="absolute inset-2 sm:inset-4 z-20 flex flex-col">
            <div className="flex sm:items-start items-center top-0 justify-between space-x-2 sm:space-x-4">
              <div
                className={cn(
                  buttonVariants({
                    size: "icon",
                    className:
                      "pointer-events-none sm:bg-zinc-200 sm:text-zinc-950 bg-transparent",
                  })
                )}
                aria-hidden="true"
              >
                {icon && (
                  <ShopIcon name={icon as IconName} className="h-4 w-4" />
                )}
              </div>
              <p className="hidden sm:block text-sm text-zinc-200">
                {productCount} items
              </p>
            </div>

            <h3 className="mt-auto text-xl font-medium capitalize text-zinc-200 text-center sm:text-left hidden sm:block">
              {formatTitleWithUnderscores(category.title)}
            </h3>
          </div>
          <span className="sr-only">{category.title}</span>
        </Link>
        <div>
          <Link
            key={category.title}
            href={`shop/c/${category.title}`}
            className="group relative overflow-hidden sm:rounded-md rounded-full"
          >
            <h4 className="text-base font-medium capitalize text-center z-400 sm:hidden block">
              {category.title}
            </h4>
          </Link>
        </div>
      </div>
    </>
  );
}
