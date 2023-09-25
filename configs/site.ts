import type { FooterItem, NavbarNavItem, ShopNavItem } from "@/types"

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
  navbarNav: [
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
  ] satisfies NavbarNavItem[],
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
          title: "TunedSPhere Products",
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
  ] satisfies ShopNavItem[],
  footerNav: [
    {
      title: "Products", // Default href for "Products" title
      items: [
        {
          title: "Music",
          href: "/music",
          external: false,
        },
        {
          title: "Shop",
          href: "/shop",
          external: false,
        },
      ],
    },
    {
      title: "Docs", // Default href for "Docs" title
      items: [
        {
          title: "Legal Information",
          href: "/docs/legal-information",
          external: false,
        },
        {
          title: "Authors' rights",
          href: "/docs/authors-rights",
          external: false,
        },
        {
          title: "Terms & Conditions",
          href: "/docs/terms-conditions",
           external: false,
        },
        {
          title: "Contact Us",
          href: "/docs/contact-us",
          external: false,
        },
      ],
    },
    {
      title: "About Us", // Default href for "About Us" title
      items: [
        {
          title: "About",
          href: "/docs/about",
          external: false,
        },
        {
          title: "Contact",
          href: "/docs/contact",
          external: false,
        },
        {
          title: "Terms",
          href: "/docs/terms",
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
