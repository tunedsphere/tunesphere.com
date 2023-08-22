import type { Product, Store } from "@/db/schema"
import { type FileWithPath } from "react-dropzone"
import { type z } from "zod"
import { type userPrivateMetadataSchema } from "@/lib/validations/auth"

import type { cartItemSchema, checkoutItemSchema } from "@/lib/validations/cart"
import { type Icons } from "@/components/icons"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}
export interface FooterItem {
  title: string
  items: {
    title: string
    href?: string
    external?: boolean
  }[]
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}
export type ShopNavItem = NavItemWithOptionalChildren

export type ShopMainNavItem = NavItemWithOptionalChildren

export type NavbarNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export type UserRole = z.infer<typeof userPrivateMetadataSchema.shape.role>

export type Option = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export type FileWithPreview = FileWithPath & {
  preview: string
}

export type StoredFile = {
  id: string
  name: string
  url: string
}
export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}
export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[]
}
export interface CuratedStore {
  id: Store["id"]
  name: Store["name"]
  description?: Store["description"]
  stripeAccountId?: Store["stripeAccountId"]
  productCount?: number
}

export type CartItem = z.infer<typeof cartItemSchema>

export type CheckoutItem = z.infer<typeof checkoutItemSchema>

export interface CartLineItem
  extends Pick<
    Product,
    | "id"
    | "name"
    | "images"
    | "category"
    | "subcategory"
    | "price"
    | "inventory"
    | "storeId"
  > {
  quantity?: number
  storeName: string | null
}
export interface SubscriptionPlan {
  id: "basic" | "standard" | "pro"
  name: string
  description: string
  features: string[]
  stripePriceId: string
  price: number
}

export interface UserSubscriptionPlan extends SubscriptionPlan {
  stripeSubscriptionId?: string | null
  stripeCurrentPeriodEnd?: string | null
  stripeCustomerId?: string | null
  isSubscribed: boolean
  isCanceled: boolean
  isActive: boolean
}
