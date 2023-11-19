"use client"

import "@/styles/globals.css"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { type Product, type Store } from "@/db/schema"
import type { Option } from "@/types"

import { getSubcategories, sortOptions } from "@/configs/products"
import { cn, toTitleCase, truncate } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { ProductCard } from "@/components/cards/product-card"
import { Icons } from "@/components/icons"
import { MultiSelect } from "@/components/multi-select"
import { PaginationButton } from "@/components/pagers/pagination-button"
import { delayProducts } from "@/lib/delays"

interface ProductsProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[]
  pageCount: number
  category?: Product["category"]
  categories?: Product["category"][]
  stores?: Pick<Store, "id" | "name">[]
  storePageCount?: number
}
export function Products({
  products,
  pageCount,
  category,
  categories,
  stores,
  storePageCount,
  ...props
}: ProductsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const per_page = searchParams?.get("per_page") ?? "16"
  const sort = searchParams?.get("sort") ?? "createdAt.desc"
  const store_ids = searchParams?.get("store_ids")
  const store_page = searchParams?.get("store_page") ?? "1"
 const storeNames = null
  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  // Price filter
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 500])
  const debouncedPrice = useDebounce(priceRange, 500)

  React.useEffect(() => {
    const [min, max] = debouncedPrice
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          price_range: `${min}-${max}`,
        })}`,
        {
          scroll: false,
        }
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPrice])


  // Category filter
  const [selectedCategories, setSelectedCategories] = React.useState<
    Option[] | null
  >(null)

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          categories: selectedCategories?.length
            ? // Join categories with a dot to make search params prettier
              selectedCategories.map((c) => c.value).join(".")
            : null,
        })}`,
        {
          scroll: false,
        }
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories])

  // Subcategory filter
  const [selectedSubcategories, setSelectedSubcategories] = React.useState<
    Option[] | null
  >(null)
  const subcategories = getSubcategories(category)

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          subcategories: selectedSubcategories?.length
            ? selectedSubcategories.map((s) => s.value).join(".")
            : null,
        })}`,
        {
          scroll: false,
        }
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubcategories])

  // Store filter
  const [storeIds, setStoreIds] = React.useState<number[] | null>(
    store_ids?.split(".").map(Number) ?? null
  )

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          store_ids: storeIds?.length ? storeIds.join(".") : null,
        })}`,
        {
          scroll: false,
        }
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeIds])

  const handlePerPageChange = (newValue :number) => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          per_page: newValue,
        })}`,
        {
          scroll: false,
        }
      );
    });
  };

  return (
    <div className="flex flex-col space-y-6"  {...props}>
      <div className="flex justify-between content-center items-stretch sm:px-12 px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label="Filter products" size="sm" disabled={isPending} className="font-semibold leading-6 bg-background-shopNavLink">
              All Filters
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col bg-background" side="left">
            <SheetHeader className="px-1">
              <SheetTitle className="text-4xl">Filters</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="flex flex-1 flex-col gap-5 overflow-hidden px-1">
              <div className="space-y-4">
                <h3 className="text-sm font-medium tracking-wide">
                  Price range (€)
                </h3>
                <Slider
                  variant="range"
                  thickness="thin"
                  defaultValue={[0, 500]}
                  max={500}
                  step={1}
                  value={priceRange}
                  onValueChange={(value: typeof priceRange) => {
                    setPriceRange(value)
                  }}
                />
                <div className="flex space-x-4">
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={priceRange[1]}
                    className="h-9"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setPriceRange([value, priceRange[1]])
                    }}
                  />
                  <span className="">-</span>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={priceRange[0]}
                    max={500}
                    className="h-9"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setPriceRange([priceRange[0], value])
                    }}
                  />
                </div>
              </div>
              {categories?.length ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wide">
                    Categories
                  </h3>
                  <MultiSelect
                    placeholder="Select categories"
                    selected={selectedCategories}
                    setSelected={setSelectedCategories}
                    options={categories.map((c) => ({
                      label: toTitleCase(c),
                      value: c,
                    }))}
                  />
                </div>
              ) : null}
              {category ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wide">
                    Subcategories
                  </h3>
                  <MultiSelect
                    placeholder="Select subcategories"
                    selected={selectedSubcategories}
                    setSelected={setSelectedSubcategories}
                    options={subcategories}
                  />
                </div>
              ) : null}
              {stores?.length ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <h3 className="flex-1 text-sm font-medium tracking-wide">
                      Stores
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          startTransition(() => {
                            router.push(
                              `${pathname}?${createQueryString({
                                store_page: Number(store_page) - 1,
                              })}`
                            )
                          })
                        }}
                        disabled={Number(store_page) === 1 || isPending}
                      >
                        <Icons.chevronLeft
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Previous store page</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          startTransition(() => {
                            router.push(
                              `${pathname}?${createQueryString({
                                store_page: Number(store_page) + 1,
                              })}`
                            )
                          })
                        }}
                        disabled={
                          Number(store_page) === storePageCount || isPending
                        }
                      >
                        <Icons.chevronRight
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Next store page</span>
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {stores.map((store) => (
                        <div
                          key={store.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`store-${store.id}`}
                            checked={storeIds?.includes(store.id) ?? false}
                            onCheckedChange={(value) => {
                              if (value) {
                                setStoreIds([...(storeIds ?? []), store.id])
                              } else {
                                setStoreIds(
                                  storeIds?.filter((id) => id !== store.id) ??
                                    null
                                )
                              }
                            }}
                          />
                          <Label
                            htmlFor={`store-${store.id}`}
                            className="line-clamp-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                             {truncate(store.name, 20)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ) : null}
            </div>
            <div>
              <Separator className="my-4" />
              <SheetFooter>
                <Button
                  aria-label="Clear filters"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    startTransition(() => {
                      router.push(
                        `${pathname}?${createQueryString({
                          price_range: 0 - 100,
                          store_ids: null,
                          categories: null,
                          subcategories: null,
                        })}`
                      )

                      setPriceRange([0, 100])
                      setSelectedCategories(null)
                      setSelectedSubcategories(null)
                      setStoreIds(null)
                    })
                  }}
                  disabled={isPending}
                >
                  Clear Filters
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex space-x-2">
          <DropdownMenu>
  <DropdownMenuTrigger asChild className="gap-1">
    <Button aria-label="Items per page" size="sm" disabled={isPending} className="font-semibold bg-background-shopNavLink leading-6">
    {per_page}
      <Icons.pageLayout className="h-4 w-4" aria-hidden="true" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start" className="w-4 bg-background">
  {[8, 16, 32].map((value) => (
    <DropdownMenuItem
      key={value}
      className={cn(
        value === +per_page && "",
        "hover:bg-muted/30 focus:bg-muted/30"
      )}
      onClick={() => handlePerPageChange(value)}
    >
      {value}
    </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
            </DropdownMenu>
            <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Sort products" size="sm" disabled={isPending} className="font-semibold leading-6 bg-background-shopNavLink">
              Sort
              <Icons.chevronDown className="" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-background">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={cn(
                  option.value === sort && "font-bold hover:bg-muted"
                )}
                onClick={() => {
                  startTransition(() => {
                    router.push(
                      `${pathname}?${createQueryString({
                        sort: option.value,
                      })}`
                    )
                  })
                }}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
         </DropdownMenu>
         </div>
        </div>
      </div>

      {!isPending && !products.length ? (
        <div className="mx-auto flex max-w-xs flex-col space-y-1.5">
          <h1 className="text-center text-2xl font-bold">
            No products found
          </h1>
          <p className="text-center text-muted-foreground">
            Try changing your filters, or check back later for new products
          </p>
        </div>
      ) : null}
      <div className="grid w-full grid-cols-2 px-0 sm:grid-cols-4 gap-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id}>
          <ProductCard 
          product={product}
            storeName={product.name}/>
          </div>
        ))}
      </div>
      {products.length ? (
        <PaginationButton
          pageCount={pageCount}
          page={page}
          per_page={per_page}
          sort={sort}
          createQueryString={createQueryString}
          router={router}
          pathname={pathname}
          isPending={isPending}
          startTransition={startTransition}
        />
      ) : null}
    </div>
  )
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

function ProductSkeleton() {
  return (
    <div className="col-span-4 space-y-4 lg:col-span-1">
      <div className={`relative h-[167px] rounded-xl bg-gray-900 ${shimmer}`} />

      <div className="h-4 w-full rounded-lg bg-gray-900" />
      <div className="h-6 w-1/3 rounded-lg bg-gray-900" />
      <div className="h-4 w-full rounded-lg bg-gray-900" />
      <div className="h-4 w-4/6 rounded-lg bg-gray-900" />
    </div>
  );
}

export function AllProductsSkeleton() {
  return (
    <div className="space-y-6 pb-[5px]">
      <div className="space-y-2">
        <div className={`h-6 w-1/3 rounded-lg bg-gray-900 ${shimmer}`} />
        <div className={`h-4 w-1/2 rounded-lg bg-gray-900 ${shimmer}`} />
      </div>

      <div className="grid grid-cols-4 gap-6">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    </div>
  );
}