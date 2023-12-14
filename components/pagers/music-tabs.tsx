'use client'

import { useRouter, useSelectedLayoutSegment } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface MusicTabsProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  onTabChange: (tab: string) => void // Define the onTabChange prop
}

export function MusicTabs({ onTabChange }: MusicTabsProps) {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()
  const tabs = [
    {
      title: 'Home',
      href: `/music`,
      isActive: segment === 'home',
    },
    {
      title: 'Albums',
      href: `/music/albums`,
      isActive: segment === 'albums',
    },
    {
      title: 'Labels',
      href: `/music/labels`,
      isActive: segment === 'labels',
    },
    {
      title: 'Djs',
      href: `/music/djs`,
      isActive: segment === 'djs',
    },
    {
      title: 'Artists',
      href: `/music/artists`,
      isActive: segment === 'arstits',
    },
  ]
  const handleTabChange = (tabTitle: string) => {
    onTabChange(tabTitle)
    // Update the URL with the selected tab
  }

  return (
    <Tabs
      id="music-tabs"
      defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
      className="z-30 mx-auto flex w-full justify-center overflow-auto px-1"
      onValueChange={(value) => router.push(value)}
    >
      <TabsList className="inline-flex justify-center space-x-2 bg-transparent text-muted-foreground">
        {tabs.map((tab) => (
          <div
            role="none"
            key={tab.href}
            className={cn('border-transparent', tab.isActive && '')}
          >
            <TabsTrigger
              onClick={() => handleTabChange(tab.title)} // Call handleTabChange when a tab is clicked
              value={tab.href}
              className={cn(
                '5xl:text-2xl 8xl:text-4xl inline-flex items-center justify-center rounded-sm text-sm font-medium text-muted-foreground ring-offset-background transition-all hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                tab.isActive && 'text-foreground',
              )}
            >
              {tab.title}
            </TabsTrigger>
          </div>
        ))}
      </TabsList>
    </Tabs>
  )
}
