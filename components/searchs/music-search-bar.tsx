"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { type Product } from "@/db/schema"

import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { filterProductsAction } from "@/app/_actions/product"

interface MusicSearchBarProps {

  isSearchBarVisible: boolean;
}
export function MusicSearchBar({ isSearchBarVisible }: MusicSearchBarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, 300);
  const commandListRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (inputRef.current && isSearchBarVisible) {
      inputRef.current.focus();
    }
  }, [isSearchBarVisible]);

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
      <div id="shop-search-bar" className="relative flex flex-row w-full border border-muted/30 hover:border-muted/50 rounded-lg">
      <Command className={`text-xs align-middle ${query ? 'bg-muted' : 'bg-muted'} text-xsw-full hover:bg-muted focus:bg-muted `}>
      <CommandInput
        ref={inputRef}
          className="text-xs align-middle bg-transparent px-0 py-0"
          placeholder="Search artists, djs, labels..."
          value={query}
          onValueChange={setQuery}
          onClick={(e) => {
            handleInputClick();
            setIsOpen(true); // Open the CommandList
            e.stopPropagation(); 
            // Prevent the click event from propagating to the parent Command element
          }}
        />
   {data && isOpen && (
        <CommandList 
        ref={commandListRef}
         className=" flex-grow left-0 right-0 py-1 absolute mt-12 rounded-sm shadow-lg  bg-card border border-muted/30" >
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