'use client'
import * as React from 'react'

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
} from '@/components/ui/command'

import { useRouter } from 'next/navigation'
import { type Product } from '@/db/schema'

import { cn, isMacOs } from '@/lib/utils'
import { useDebounce } from '@/hooks/use-debounce'

import { Skeleton } from '@/components/ui/skeleton'

import { filterProductsAction } from '@/app/_actions/product'

export function ShopCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [data, setData] = React.useState<
    | {
        category: Product['category']
        products: Pick<Product, 'id' | 'name' | 'category'>[]
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
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((isOpen) => !isOpen)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSelect = React.useCallback((callback: () => unknown) => {
    setIsOpen(false)
    callback()
  }, [])

  React.useEffect(() => {
    if (!isOpen) {
      setQuery('')
    }
  }, [isOpen])

  return (
    <>
      <Command className="bg-transparent ">
        <CommandInput
          className="bg-transparent "
          placeholder="Search products..."
        />

        <CommandList className="left-0 top-0 z-50 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto">
          <CommandEmpty
            className={cn(isPending ? 'hidden' : 'py-6 text-center text-sm ')}
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
                className="z-100 border-b bg-blue-500 bg-theme-50 capitalize [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-primary"
                heading={group.category}
              >
                {group.products.map((item) => (
                  <CommandItem
                    className="cursor-pointer  bg-red-50 bg-theme-50 hover:bg-theme-200 focus:bg-theme-200 aria-selected:bg-theme-200"
                    key={item.id}
                    onSelect={() =>
                      handleSelect(() =>
                        router.push(`/shop/product/${item.id}`),
                      )
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
