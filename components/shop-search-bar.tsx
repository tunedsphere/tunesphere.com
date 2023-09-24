"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { type Product } from "@/db/schema"

import { cn, isMacOs } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import {
  Command,
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
import { DialogContent } from "./ui/dialog"

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
      setQuery(""); // Hide the CommandList when the search bar is closed
    }
  }, [isOpen]);
  const handleInputClick = async () => {
    if (query.length > 0) {
      startTransition(async () => {
        const searchData = await filterProductsAction(query);
        setData(searchData);
      });
    }
  };
  
  const handleInputBlur = () => {
    // Hide the CommandList when the input loses focus
    setData(null);
  };
  
  return (
    <>
      {/* <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-full xl:justify-start xl:px-3 xl:py-2 hover:bg-theme-50"
        onClick={() => setIsOpen(true)}
      >
        <Icons.search className="h-4 w-4 xl:mr-2 text-textdark" aria-hidden="true" />
        <span className="hidden xl:inline-flex text-textdark">Search products...</span>
        <span className="sr-only text-textdark">Search products</span>
       <kbd className="bg-theme-50 text-textdark pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <abbr title={isMacOs() ? 'Command' : 'Control'}>{isMacOs() ? '⌘' : 'Ctrl+'}</abbr>K
        </kbd>
      </Button> */}
      <div className="relative flex flex-row w-full">
      <Command className={`text-textdark align-middle ${query ? 'bg-theme-50' : 'bg-theme-50'} w-full hover:bg-theme-50 focus:bg-theme-50`}>
      <CommandInput
          className="align-middle bg-transparent text-textdark px-0 py-0"
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
          onClick={handleInputClick} // Show the CommandList when the input is clicked
          onBlur={handleInputBlur}   // Hide the CommandList when the input loses focus
        />
 {data && (
        <CommandList 
        className="text-textdark flex-grow left-0 right-0 py-1 absolute mt-12 bg-theme-50 rounded-sm shadow-lg border-2 border-muted/30">
          <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm text-textdark")}
          >
            No products found.
          </CommandEmpty>
          {isPending ? (
            <div className="space-y-1 overflow-hidden px-4 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data?.map((group) => (
              <CommandGroup
                key={group.category}
                className="capitalize tracking-tighter bg-transparent [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-sm"
                heading={group.category}
              >
                {group.products.map((item) => (
                <CommandItem
                className="text-textdark cursor-pointer bg-transparent hover:bg-theme-200"
                key={item.id}
                aria-selected={false}
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
         )}
        </Command>
        </div>
    </>
  )
}
