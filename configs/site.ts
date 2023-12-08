import type { FooterItem, MainNavItem, ShopMainNavItem } from "@/types"

import { productCategories } from "@/configs/products"
import { slugify } from "@/lib/utils"

export type SiteConfig = typeof siteConfig

const links = {
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  twitter: "https://twitter.com/",
}

export const siteConfig = {
  name: "TunedSphere",
  description: "A dedicated Psychedelic Art Platform, focusing on Music",
  url: "http://localhost:3000/",
  ogImage: "",
  links: {
    facebook: "https://facebook.com/tunedsphere",
    instagram: "https://instagram.com/tunedsphere",
    twitter: "https://twitter.com/tunedsphere",
  },
  navbarNav: [
    {
      title: "Music",
      label: "Music",
      href: "/music",
      disabled: false,
    },
    {
      title: "Festivals",
      label: "Festivals",
      href: "/festivals",
      disabled: true,
    },
    {
      title: "Shop",
      label: "Shop",
      href: "/shop",
      disabled: false,
    },
  ] satisfies MainNavItem[],
  shopNav: [
    {
      title: "Lobby",
      items: [
        {
          title: "Products",
          href: "/shop/products",
          description: "All the products we have to offer.",
          items: [],
        },
        {
          title: "TunedSphere Products",
          href: "/shop/tunedsphere-products",
          description: "Create custom products.",
          items: [],
        },
        {
          title: "Blog",
          href: "/blog",
          description: "Read our latest blog posts.",
          items: [],
        },
      ],
    },
    ...productCategories.map((category) => ({
      title: category.title,
      items: [
        {
          title: "All",
          href: `/shop/c/${slugify(category.title)}`,
          description: `All ${category.title}.`,
          items: [],
        },
        ...category.subcategories.map((subcategory) => ({
          title: subcategory.title,
          href: `/shop/c/${slugify(category.title)}/${
            subcategory.slug
          }`,
          description: subcategory.description,
          items: [],
        })),
      ],
    })),
  ] satisfies ShopMainNavItem[],
  footerNav: [
    {
      title: "Products", // Default href for "Products" title
      items: [
        {
          title: "Music",
          href: "/music",
          external: false,
          disabled: true,
        },
        {
          title: "Shop",
          href: "/shop",
          external: false,
          disabled: false 
        },
        {
          title: "Festivals",
          href: "/festivals",
          external: false,
          disabled: true,
        },
        {
          title: "Blog",
          href: "/blog",
          external: false,
          disabled: false 
        },
      ],
    },
    {
      title: "Documentation", // Default href for "Docs" title
      items: [
        {
          title: "Shop Docs",
          href: "/docs/shop/selling",
           external: false,
        },
        {
          title: "Music Docs",
          href: "/docs/music/introduction",
          external: false,
        },
        {
          title: "Legal Information",
          href: "/docs/legal/terms",
          external: false,
        },
        {
          title: "Blog",
          href: "/docs/blog/introduction",
          external: false,
        },      
      ],
    },
    {
      title: "About Us", // Default href for "About Us" title
      items: [
        {
          title: "About",
          href: "/docs//what-is-tunedsphere/about-us",
          external: false,
        },
        {
          title: "Contact",
          href: "/docs//what-is-tunedsphere/contact",
          external: false,
        },
        {
          title: "Terms",
          href: "/docs/legal/terms",
          external: false,
        },
        {
          title: "Privacy",
          href: "/docs/privacy",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Facebook",
          href: links.facebook,
          external: true,
        },
        {
          title: "Instagram",
          href: links.instagram,
          external: true,
        },
        {
          title: "Twitter",
          href: links.twitter,
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
}
