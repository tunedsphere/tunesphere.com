'use client'

import { useRouter, useSelectedLayoutSegment } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ArtistTabsProps extends React.ComponentPropsWithoutRef<typeof Tabs> {}

export function ArtistTabs({}: ArtistTabsProps) {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()

  const tabs = [
    {
      title: 'Discography',
      href: `/music/lunarave`,
      isActive: segment === null,
    },
    {
      title: 'Merch',
      href: `/music/lunarave/merch`,
      isActive: segment === 'merch',
    },
    {
      title: 'Calendar',
      href: `/music/lunarave/calendar`,
      isActive: segment === 'calendar',
    },
  ]

  return (
    <div className="mx-8 flex items-center justify-between border-b font-bold ">
      <Tabs
        id="artist-tabs"
        defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
        onValueChange={(value) => router.push(value)}
      >
        <TabsList className="inline-flex h-8 items-center bg-transparent p-0">
          {tabs.map((tab) => (
            <div
              role="none"
              key={tab.href}
              className={cn('', tab.isActive && '')}
            >
              <TabsTrigger
                value={tab.href}
                className={cn(
                  'inline-flex items-center justify-center whitespace-nowrap rounded-sm p-0 px-3 text-sm font-medium decoration-2 underline-offset-[10px] ring-offset-background transition-all hover:text-foreground/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:underline  data-[state=active]:decoration-primary data-[state=active]:decoration-2 data-[state=active]:underline-offset-[10px] data-[state=active]:shadow-none',
                  tab.isActive && 'text-foreground ',
                )}
              >
                {tab.title}
              </TabsTrigger>
            </div>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
