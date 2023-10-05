import { env } from "@/env.mjs"
import { type SubscriptionPlan } from "@/types"

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description:
      "Ideal for crafters and small businesses that want to sell online. Cost less than a Coffee",
    features: ["Create up to 1 store", "Create up to 10 products"],
    stripePriceId: "",
    price: 0,
  },
  {
    id: "standard",
    name: "Tuned",
    description:
      "Perfect for midsize businesses that want to sell online. Cost more than a Coffee",
    features: ["Create up to 2 store", "Create up to 20 products per store"],
    stripePriceId: env.STRIPE_STD_MONTHLY_PRICE_ID,
    price: 5,
  },
  {
    id: "pro",
    name: "Sphere",
    description: "Perfect for big businesses that want to sell online.",
    features: ["Create up to 3 stores", "Create up to 20 products per store"],
    stripePriceId: env.STRIPE_PRO_MONTHLY_PRICE_ID,
    price: 10,
  },
]
