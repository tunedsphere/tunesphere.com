import { StoreIcons } from "@/components/icons/icons"
import type { MusicGenre, Option } from "@/types"


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

export const musicGenres = [
  {
    title: "ambient",
  },
  {
    title: "Downtempo",
  },
  {
    title: "Psybreaks",
  },
  {
    title: "Zenon",
  },
  {
    title: "Natural Trance",
  },
  {
    title: "Progressive",
  },
  {
    title: "Goa",
  },
  {
    title: "Full-On Morning",
  },
  {
    title: "Full-On Twilight",
  },
  {
    title: "Forest",
  },
  {
    title: "Dark",
  },
  {
    title: "Hi-Tech",
  },
] satisfies MusicGenre[]

