"use client"
 
import * as React from "react"
import { Icons } from "./icons"
 
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useRouter } from "next/navigation"
import { type Product } from "@/db/schema"

import { cn, isMacOs } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"


import { Skeleton } from "@/components/ui/skeleton"

import { filterProductsAction } from "@/app/_actions/product"

export function ShopCombobox() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
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
<Command className="bg-transparent text-textdark">
  <CommandInput 
  className="bg-transparent text-textdark" 
  placeholder="Search products..." />

   <CommandList
   className="left-0 top-0 w-full z-50 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto">
     <CommandEmpty
       className={cn(isPending ? "hidden" : "py-6 text-center text-sm text-textdark")}
     >
       No products found.
     </CommandEmpty>
     {isPending ? (
       <div className="space-y-1 overflow-hidden px-1 py-2">
         <Skeleton className="h-4 w-10 rounded" />
         <Skeleton className="h-8 rounded-sm" />
         <Skeleton className="h-8 rounded-sm" />
       </div>
     ) : (
       data?.map((group) => (
         <CommandGroup
           key={group.category}
           className="bg-blue-500 z-100 capitalize text-textdark bg-theme-50 border-b border-muted/30 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-dark"
           heading={group.category}
         >
           {group.products.map((item) => (
             <CommandItem
             className="bg-red-500 text-textdark cursor-pointer bg-theme-50 hover:bg-theme-200 focus:bg-theme-200 aria-selected:bg-theme-200 aria-selected:text-textdark"
               key={item.id}
               onSelect={() =>
                 handleSelect(() => router.push(`/shop/product/${item.id}`))
               }
             >
               {item.name}
             </CommandItem>
           ))}
         </CommandGroup>
       ))
     )}
   </CommandList>
   </Command>
   </>
  )
}