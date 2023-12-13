"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Icon } from "../icon";

interface ArtistTabsProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  ArtistId: string;
}

export function ArtistTabs({}: ArtistTabsProps) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  const tabs = [
    {
      title: "Discography",
      href: `/music/lunarave`,
      isActive: segment === null,
    },
    {
      title: "Merch",
      href: `/music/lunarave/merch`,
      isActive: segment === "merch",
    },
    {
      title: "Calendar",
      href: `/music/lunarave/calendar`,
      isActive: segment === "calendar",
    },
  ];

  return (
    <div className="flex justify-between items-center max-w-6xl mx-auto px-8 font-bold">
      <Tabs
        id="artist-tabs"
        defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
        onValueChange={(value) => router.push(value)}
      >
        <TabsList className="inline-flex items-center bg-transparent p-0 h-8">
          {tabs.map((tab) => (
            <div
              role="none"
              key={tab.href}
              className={cn("", tab.isActive && "")}
            >
              <TabsTrigger
                value={tab.href}
                className={cn(
                  "data-[state=active]:underline-offset-[10px] data-[state=active]:decoration-2 hover:underline underline-offset-[14px] hover:text-foreground/80 decoration-2 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background  data-[state=active]:underline data-[state=active]:decoration-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
                  tab.isActive && "text-foreground "
                )}
              >
                {tab.title}
              </TabsTrigger>
            </div>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
