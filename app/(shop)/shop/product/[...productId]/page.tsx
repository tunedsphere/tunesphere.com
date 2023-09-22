

import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { getSubcategories } from "@/configs/products"
import { and, desc, eq, not } from "drizzle-orm"

import { formatPrice, toTitleCase, slugify } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { AddToCartForm } from "@/components/forms/add-to-cart-form"
import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { ProductCard } from "@/components/cards/product-card"
import { ProductImageCarousel } from "@/components/products/product-image-carousel"
import { Shell } from "@/components/shells/shell"
import { PageHeader, PageHeaderHeading } from "@/components/page-header"

interface ProductPageProps {
  params: {
    productId: string
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const productId = Number(params.productId)


  const product = await db.query.products.findFirst({
    columns: {
      name: true,
      description: true,
    },
    where: eq(products.id, productId),
  })

  if (!product) {
    return {}
  }

  return {
    title: toTitleCase(product.name),
    description: product.description ?? undefined,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = Number(params.productId)

  const product = await db.query.products.findFirst({
    columns: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
      category: true,
      subcategory: true,
      storeId: true,
    },
    where: eq(products.id, productId),
  })

  if (!product) {
    notFound()
  }

  const store = await db.query.stores.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: eq(stores.id, product.storeId),
  })

  const otherProducts = store
    ? await db
        .select({
          id: products.id,
          name: products.name,
          price: products.price,
          images: products.images,
          category: products.category,
          inventory: products.inventory,
        })
        .from(products)
        .limit(4)
        .where(
          and(
            eq(products.storeId, product.storeId),
            not(eq(products.id, productId))
          )
        )
        .orderBy(desc(products.inventory))
    : []
  return (
    <Shell variant="shop">
    <Breadcrumbs
        segments={[
          {
            title: "Products",
            href: "/shop/products",
          },
          {
            title: toTitleCase(product.category),
            href: `/shop/c/${product.category}`,
          },
          {
            title: toTitleCase(product.subcategory || ''),
            href: `/shop/c/${product.category}/${product.subcategory || ''}`,
          },
          {
            title: product.name,
            href: `/shop/product/${product.id}`,
          },
        ]}
      />
      <div className="flex flex-col gap-8 md:flex-row md:gap-16 px-2">
        <ProductImageCarousel
          className="w-full md:w-1/2"
          images={product.images ?? []}
          options={{
            loop: true,
          }}
        />
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 text-textdark md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold text-textdark">
              {product.name}
            </h2>
            <p className="text-xl font-semibold text-textdark">
              {formatPrice(product.price)}
            </p>
            {store ? (
              <Link
                href={`/shop/store/${slugify(store.name)}`}
                className="line-clamp-1 inline-block text-base text-muted-foreground hover:underline"
              >
                {store.name}
              </Link>
            ) : null}
          </div>
          <Separator className="my-1.5" />
          <AddToCartForm productId={productId} />
          <Separator className="mt-5" />
          <Accordion type="single" collapsible className="w-full text-textdark">
            <AccordionItem value="description">
              <AccordionTrigger className="text-textdark">
                Description
              </AccordionTrigger>
              <AccordionContent>
                {product.description ??
                  "No description is available for this product."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <section
          id="products-from-store"
          aria-labelledby="products-from-store-heading"
          className="space-y-6 px-0"
        >
      {store && otherProducts.length > 0 ? (
        <div className="overflow-hidden md:pt-6 ">
          <PageHeader>
            <PageHeaderHeading size="sm" className="text-textdark/80">
            More products from <span className="text-4xl text-textdark underline-offset-4 underline decoration-4 decoration-theme">{store.name}</span>
            </PageHeaderHeading>
            </PageHeader>

          <div className="pt-6 px-2 grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
             {otherProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className="min-w-[260px]"
                />
              ))}
            </div>
        </div>
      ) : null}
      </section>
    </Shell>
  )
}