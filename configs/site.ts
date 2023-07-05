
import { slugify } from "@/lib/utils"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "TunedSphere",
  description: "A dedicated Psychedelic Art Platform, focusing on Music",
  url: "http://localhost:3000/",
  ogImage: "",
  navbarBottom: [
    {
      title: "Labels",
      label: "Labels",
      items: [],
      href: "/labels",
    },
    {
      title: "Artists",
      label: "Artists",
      items: [],
      href: "/Artists",
    },
    {
      title: "Dj",
      label: "Dj",
      items: [],
      href: "/djs",
    },
    {
      title: "Genres",
      label: "Genres",
      items: [],
      href: "/genres",
    },
    {
      title: "Festivals",
      label: "Festivals",
      items: [],
      href: "/festivals",
    },
    {
      title: "Shop",
      label: "Shop",
      items: [],
      href: "/shop",
    },
    {
      title: "Contact",
      label: "Contact",
      items: [],
      href: "/contact",
    },
  ],
};