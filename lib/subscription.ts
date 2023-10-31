import type { UserStoreSubscriptionPlan, StoreSubscriptionPlan } from "@/types"

import { storeSubscriptionPlans } from "@/configs/subscriptions"

export function getPlanFeatures(planId?: StoreSubscriptionPlan["id"]) {
  const plan = storeSubscriptionPlans.find((plan) => plan.id === planId)
  const features = plan?.features.map((feature) => feature.split(",")).flat()

  const maxStoreCount =
    features?.find((feature) => feature.match(/store/i))?.match(/\d+/) ?? 0

  const maxProductCount =
    features?.find((feature) => feature.match(/product/i))?.match(/\d+/) ?? 0

  return {
    maxStoreCount,
    maxProductCount,
  }
}

export function getDashboardRedirectPath(input: {
  storeCount: number
  subscriptionPlan: UserStoreSubscriptionPlan | null
}): string {
  const { storeCount, subscriptionPlan } = input

  const minStoresWithProductCount = {
    store_plan_basic: 1,
    store_plan_standard: 2,
    store_plan_pro: 3,
  }[subscriptionPlan?.id ?? "store_plan_basic"]

  const isActive = subscriptionPlan?.isActive ?? false
  const hasEnoughStores = storeCount >= minStoresWithProductCount

  return isActive && hasEnoughStores
    ? "/dashboard/billing"
    : "/dashboard/stores/new"
}