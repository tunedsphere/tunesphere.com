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
          title: "Build a Board",
          href: "/shop/build-a-board",
          description: "Build your own custom skateboard.",
          items: [],
        },
        {
          title: "Blog",
          href: "/shop/blog",
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
          href: `/shop/categories/${slugify(category.title)}`,
          description: `All ${category.title}.`,
          items: [],
        },
        ...category.subcategories.map((subcategory) => ({
          title: subcategory.title,
          href: `/shop/categories/${slugify(category.title)}/${
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
        },
        {
          title: "Shop",
          href: "/shop",
        },
      ],
    },
    {
      title: "Docs", // Default href for "Docs" title
      items: [
        {
          title: "Legal Information",
          href: "/legal-information",
        },
        {
          title: "Authors' rights",
          href: "/authors-rights",
        },
        {
          title: "Terms & Conditions",
          href: "/terms-conditions",
        },
        {
          title: "Contact Us",
          href: "/contact-us",
        },
      ],
    },
    {
      title: "About Us", // Default href for "About Us" title
      items: [
        {
          title: "Spirit",
          href: "/spirit",
        },
        {
          title: "Team",
          href: "/team",
        },
        {
          title: "Support",
          href: "/support",
        },
        {
          title: "Donate",
          href: "/donate",
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
