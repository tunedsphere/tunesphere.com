import { type Product } from "@/db/schema"
import type { Option } from "@/types"

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
    subcategories: [
      {
        title: "tapistery",
        description: "Essentials",
        slug: "decorations",
      },
    ],
  },
  {
    title: "plants",
    image: "/images/plant-one.webp",
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
    title: "music",
    image: "/images/music-one.webp",
    subcategories: [
      {
        title: "albums",
        description: "Albums",
        slug: "albums",
      },
      {
        title: "vinyls",
        description: "Vinyls",
        slug: "vinyls",
      },
    ],
  },
  {
    title: "tools",
    image: "/images/tools-one.webp",
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
    title: "education",
    image: "/images/education-one.webp",
    subcategories: [
      {
        title: "courses",
        description: "Courses",
        slug: "courses",
      },
      {
        title: "workshops",
        description: "Workshops",
        slug: "workshops",
      },
    ],
  },
] satisfies {
  title: Product["category"]
  image: string
  subcategories: {
    title: string
    description?: string
    image?: string
    slug: string
  }[]
}[]

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
// export const productGenre = [
//   "Men",
//   "Woman",
//   "Unisex",
// ]
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
