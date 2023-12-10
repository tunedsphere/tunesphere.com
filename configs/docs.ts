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
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "What is TunedSphere?",
      href: "/docs/what-is-tunedsphere",
      items: [
        {
          title: "About Us",
          href: "/docs/what-is-tunedsphere/about-us",
        },
        {
          title: "Contact",
          href: "/docs/what-is-tunedsphere/contact",
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
    title: "Music",
    disabled: true,
    items: [
      {
        title: "Introduction",
        href: "/docs/music/introduction",
      },
      {
        title: "Getting Started",
        href: "/docs/music/getting-started",
        disabled: true,
        items: [
          {
            title: "Account Registration",
            href: "/docs/music/getting-started/account-registration",
          },
          {
            title: "Logging In",
            href: "/docs/music/getting-started/logging-in",
          },
          {
            title: "User Profile",
            href: "/docs/music/getting-started/user-profile",
          },
        ],
      },
      {
        title: "Browsing Music",
        href: "/docs/music/browsing-music",
        disabled: true,
        items: [
          {
            title: "Browse by Genre",
            href: "/docs/music/browsing-music/browse-by-genre",
          },
          {
            title: "Search Music",
            href: "/docs/music/browsing-music/search-music",
          },
          {
            title: "Discover New Releases",
            href: "/docs/music/browsing-music/discover-new-releases",
          },
        ],
      },
      {
        title: "Listening to Music",
        href: "/docs/music/listening-to-music",
        disabled: true,
        items: [
          {
            title: "Playing Songs",
            href: "/docs/music/listening-to-music/playing-songs",
          },
          {
            title: "Creating Playlists",
            href: "/docs/music/listening-to-music/creating-playlists",
          },
          {
            title: "Offline Listening",
            href: "/docs/music/listening-to-music/offline-listening",
          },
        ],
      },
      {
        title: "Interacting with Artists",
        href: "/docs/music/interacting-with-artists",
        disabled: true,
        items: [
          {
            title: "Following Artists",
            href: "/docs/music/interacting-with-artists/following-artists",
          },
          {
            title: "Artist Profiles",
            href: "/docs/music/interacting-with-artists/artist-profiles",
          },
          {
            title: "Concerts and Events",
            href: "/docs/music/interacting-with-artists/concerts-and-events",
          },
        ],
      },
      {
        title: "Premium Features",
        href: "/docs/music/premium-features",
        disabled: true,
        items: [
          {
            title: "Subscriptions",
            href: "/docs/music/premium-features/subscriptions",
          },
          {
            title: "Ad-Free Listening",
            href: "/docs/music/premium-features/ad-free-listening",
          },
          {
            title: "High-Quality Audio",
            href: "/docs/music/premium-features/high-quality-audio",
          },
        ],
      },
      {
        title: "Developers",
        href: "/docs/music/developers",
        disabled: true,
        items: [
          {
            title: "API Documentation",
            href: "/docs/music/developers/api-documentation",
          },
          {
            title: "Integration Guides",
            href: "/docs/music/developers/integration-guides",
          },
          {
            title: "SDKs and Libraries",
            href: "/docs/music/developers/sdks-and-libraries",
          },
        ],
      },
      {
        title: "Legal",
        href: "/docs/music/legal",
        disabled: true,
        items: [
          {
            title: "Authors' Rights",
            href: "/docs/music/legal/authors-rights",
          },
          {
            title: "Fees & Pricing",
            href: "/docs/music/legal/fees-pricing",
          },
        ],
      },
      {
        title: "FAQ",
        href: "/docs/music/faq",
        disabled: true,
      },
      {
        title: "Support",
        href: "/docs/music/support",
        disabled: true,
        items: [
          {
            title: "Contact Us",
            href: "/docs/music/support/contact-us",
          },
          {
            title: "Troubleshooting",
            href: "/docs/music/support/troubleshooting",
          },
        ],
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
  ],
}