"use client"

import "@/styles/globals.css"

import * as React from "react"
import { useRouter } from "next/navigation"
import { type Product } from "@/db/schema"

import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"
import { filterProductsAction } from "@/app/_actions/product"

export function ShopSearchBar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)
  const [data, setData] = React.useState<
    | {
        category: Product["category"]
        products: Pick<Product, "id" | "name" | "category">[]
      }[]
    | null
  >(null)
  const [isPending, startTransition] = React.useTransition()

  React.useEffect(() => {
    if (debouncedQuery.length === 0) setData(null)

    if (debouncedQuery.length > 0) {
      startTransition(async () => {
        const data = await filterProductsAction(debouncedQuery)
        setData(data)
      })
    }
  }, [debouncedQuery])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((isOpen) => !isOpen)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSelect = React.useCallback((callback: () => unknown) => {
    setIsOpen(false)
    callback()
  }, [])

  React.useEffect(() => {
    if (!isOpen) {
      setQuery("")
    }
  }, [isOpen])

  return (
    <>
      <div className="flex h-12 w-full items-center rounded-md border-2 bg-transparent px-4 py-3">
        <input
          type="text"
          className="w-full bg-transparent py-3 text-lg text-textdark outline-none placeholder:text-muted-foreground focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search products..."
        ></input>
        <Icons.search className="right-2 text-muted-foreground"></Icons.search>
      </div>
    </>
  )
}
