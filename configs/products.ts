import type { IconName } from "@/components/icon/shop";
import type { Category, Option } from "@/types"


export const sortOptions = [
  { label: "Date: Old to new", value: "createdAt.asc" },
  {
    label: "Date: New to old",
    value: "createdAt.desc",
  },
  { label: "Price: Low to high", value: "price.asc" },
  { label: "Price: High to low", value: "price.desc" },
  {
    label: "Alphabetical: A to Z",
    value: "name.asc",
  },
  {
    label: "Alphabetical: Z to A",
    value: "name.desc",
  },
]

export const productCategories = [
  {
    title: "clothing",
    image: "/images/skateboard-one.webp",
    icon: "shirt" as IconName,
    subcategories: [
      {
        title: "pants",
        description: "pants",
        image: "/images/deck-one.webp",
        slug: "pants",
      },
      {
        title: "hoodies",
        description: "Hoodies",
        image: "/images/wheel-one.webp",
        slug: "hoodies",
      },
      {
        title: "T-shirts",
        description: "T-shirts",
        image: "/images/truck-one.webp",
        slug: "t-shirts",
      },
    ],
  },
  {
    title: "accessories",
    image: "/images/clothing-one.webp",
    icon: "backpack",
    subcategories: [
      {
        title: "pipe",
        description: "Cool and comfy tees for effortless style.",
        slug: "pipe",
      },
    ],
  },
  {
    title: "art",
    image: "/images/shoe-one.webp",
    icon: "art",
    subcategories: [
      {
        title: "Painting",
        description: "Paintings",
        slug: "paintings",
      },
    ],
  },
  {
    title: "decorations",
    image: "/images/backpack-one.webp",
    icon: "spray",
    subcategories: [
      {
        title: "tapistery",
        description: "Essentials",
        slug: "tapistery",
      },
    ],
  },
  {
    title: "plants",
    image: "/images/plant-one.webp",
    icon: "leaf",
    subcategories: [
      {
        title: "cacti",
        description: "Cacti",
        slug: "cacti",
      },
      {
        title: "succulents",
        description: "Succulents",
        slug: "succulents",
      },
    ],
  },
  {
    title: "literature",
    image: "/images/book-one.webp",
    icon: "book",
    subcategories: [
      {
        title: "books",
        description: "Books",
        slug: "books",
      },
      {
        title: "magazines",
        description: "Magazines",
        slug: "magazines",
      },
    ],
  },
  {
    title: "tools",
    image: "/images/tools.webp",
    icon: "cigarette",
    subcategories: [
      {
        title: "vaporizers",
        description: "Vaporizers",
        slug: "vaporizers",
      },
      {
        title: "smoking accessories",
        description: "Smoking Accessories",
        slug: "smoking-accessories",
      },
    ],
  },
  {
    title: "cds_and_vinyls",
    image: "/images/physical_musical_format.jpg",
    icon: "cd",
    subcategories: [
      {
        title: "Vinyl Records",
        description: "Vinyl Records",
        slug: "vinyl-records",
      },
      {
        title: "Compact Discs",
        description: "Compact Discs",
        slug: "compact-discs",
      },

    ],
  },
] satisfies Category[]

export const productTags = [
  "new",
  "sale",
  "bestseller",
  "featured",
  "popular",
  "trending",
  "limited",
  "exclusive",
]
export function getSubcategories(category?: string): Option[] {
  if (!category) return []

  const subcategories =
    productCategories
      .find((c) => c.title === category)
      ?.subcategories.map((s) => ({
        label: s.title,
        value: s.slug,
      })) ?? []

  return subcategories
}