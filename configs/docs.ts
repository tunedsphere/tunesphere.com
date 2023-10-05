import { DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs/introduction",
        },
        {
          title: "About TunedSphere",
          href: "/docs/about",
        },
        {
          title: "Contact Us",
          href: "/docs/contact",
        },
      ],
    },
  {
    title: "Shop",
    items: [
      {
        title: "Selling on TunedSphere",
        href: "/docs/shop/selling",
      },
      {
        title: "Fees & Pricing ",
        href: "/docs/shop/fees",
      },
      {
        title: "Tools",
        href: "/docs/shop/tools",
      },
      {
        title: "FAQ",
        href: "/docs/shop/faqs",
      },
    ],
  },  
    {
      title: "Legal Documentations",
      items: [
        {
          title: "Terms & Conditions",
          href: "/docs/legal/terms",
        },
        {
          title: "Privacy Policy",
          href: "/docs/legal/privacy",
        },
        {
          title: "Cookies",
          href: "/docs/legal/cookies",
        },
        {
          title: "Email Preferences",
          href: "/docs/legal/email-preferences",
        },
      ],
    },
    {
      title: "Blog",
      items: [
        {
          title: "Introduction",
          href: "/blog/introduction",
        },
        {
          title: "Shop Updates",
          href: "/blog/shop-updates",
        },
        {
          title: "Music News",
          href: "/blog/music-news",
        },
      ],
    },
    {
      title: "Dashboard",
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Layouts",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Server Components",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Authentication",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Database with Prisma",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "API Routes",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
  ],
}