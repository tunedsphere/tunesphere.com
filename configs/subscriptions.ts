import { env } from "@/env.mjs"
import type { SubscriptionPlan } from "@/types"

export const freePlan: SubscriptionPlan = {
  name: "Ollie",
  description:
    "The ollie plan allows you to create up to 1 store, and 20 products.",
  stripePriceId: "",
  monthlyPrice: null,
}

export const proPlan: SubscriptionPlan = {
  name: "Tuned",
  description:
    "The Tuned plan allows you to create up to a store, and 20 products per store. For additional products contact TunedSphere",
  stripePriceId: null,
  monthlyPrice: 10,
}
