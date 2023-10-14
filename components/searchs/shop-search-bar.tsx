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
import { DialogContent } from "../ui/dialog"

export function ShopSearchBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, 300);
  const commandListRef = React.useRef<HTMLDivElement | null>(null);

  const [data, setData] = React.useState<
    | {
        category: Product["category"];
        products: Pick<Product, "id" | "name" | "category">[];
      }[]
    | null
  >(null);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (debouncedQuery.length === 0) setData(null);

    if (debouncedQuery.length > 0) {
      startTransition(async () => {
        const data = await filterProductsAction(debouncedQuery);
        setData(data);
      });
    }
  }, [debouncedQuery]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        commandListRef.current &&
        !commandListRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputClick = async () => {
    if (query.length > 0) {
      startTransition(async () => {
        const searchData = await filterProductsAction(query);
        setData(searchData);
      });
    }
  };

  const handleSelect = React.useCallback((callback: () => unknown) => {
    setIsOpen(false);
    callback();
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);
  return (
    <>
      {/* <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-full xl:justify-start xl:px-3 xl:py-2 hover:bg-theme-50"
        onClick={() => setIsOpen(true)}
      >
        <Icons.search className="h-4 w-4 xl:mr-2 " aria-hidden="true" />
        <span className="hidden xl:inline-flex ">Search products...</span>
        <span className="sr-only">Search products</span>
       <kbd className="bg-theme-50 pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <abbr title={isMacOs() ? 'Command' : 'Control'}>{isMacOs() ? '⌘' : 'Ctrl+'}</abbr>K
        </kbd>
      </Button> */}
      <div id="shop-search-bar" className="relative flex flex-row w-full border border-muted/30 hover:border-muted/50 rounded-lg">
      <Command className={` align-middle ${query ? 'bg-muted' : 'bg-muted'} w-full hover:bg-muted focus:bg-muted`}>
      <CommandInput
          className="align-middle bg-transparent  px-0 py-0"
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
          onClick={(e) => {
            handleInputClick();
            setIsOpen(true); // Open the CommandList
            e.stopPropagation(); // Prevent the click event from propagating to the parent Command element
          }}
        />
   {data && isOpen && (
        <CommandList 
        ref={commandListRef}
         className=" flex-grow left-0 right-0 py-1 absolute mt-12 bg-theme-50 rounded-sm shadow-lg border border-muted/30" >
          <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm ")}
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
                className=" cursor-pointer bg-transparent hover:bg-theme-200"
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
