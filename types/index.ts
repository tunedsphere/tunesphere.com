import type { Product, Store } from "@/db/schema"
import { type FileWithPath } from "react-dropzone"
import { type z } from "zod"
import { type userPrivateMetadataSchema } from "@/lib/validations/auth"
import type Stripe from "stripe"

import type { 
  cartItemSchema,
  cartLineItemSchema, 
  checkoutItemSchema } from "@/lib/validations/cart"
import { type Icons } from "@/components/icons"


export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}
export interface ShopNavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  description?: string
}
export interface ShopNavItemWithChildren extends ShopNavItem {
  items?: ShopNavItemWithChildren[]
}
export interface ShopNavItemWithOptionalChildren extends ShopNavItem {
  items?: ShopNavItemWithChildren[]
}
export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
    disabled?: boolean
  }[]
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items?: NavLink[];
    }
)
export type NavLink = {
  title: string
  href?: string
  url?: string
  disabled?: boolean
  external?: boolean
  items?: NavLink[];
  // You can add additional properties as needed
};
export type ShopMainNavItem = ShopNavItemWithOptionalChildren

export type MainNavItem = NavItem

export type UserRole = z.infer<typeof userPrivateMetadataSchema.shape.role>

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

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

export interface Category {
  title: Product["category"]
  image: string
  icon: React.ComponentType<{ className?: string }>
  subcategories: Subcategory[]
}

export interface Subcategory {
  title: string
  description?: string
  image?: string
  slug: string
}

export interface CuratedStore {
  id: Store["id"]
  name: Store["name"]
  storeBanner?: Store["storeBanner"]
  description?: Store["description"]
  stripeAccountId?: Store["stripeAccountId"]
  productCount?: number
}

export type CartItem = z.infer<typeof cartItemSchema>

export type CheckoutItem = z.infer<typeof checkoutItemSchema>

export type CartLineItem = z.infer<typeof cartLineItemSchema>

export type StripePaymentStatus = Stripe.PaymentIntent.Status

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

