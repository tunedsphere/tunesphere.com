
export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "TunedSphere",
  description: "A dedicated Psychedelic Art Platform, focusing on Music",
  url: "http://localhost:3000/",
  ogImage: "",
  navbarBottom: [
    {
      title: "Music",
      label: "Music",
      items: [],
      href: "/music",
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
  
  ],
};