import { env } from "@/env.mjs"
import { StoreSubscriptionPlan, MusicAppSubscriptionPlan } from "@/types"; // Updated import statements
 // Import the updated interface
 export const storeSubscriptionPlans: StoreSubscriptionPlan[] = [
  {
    id: "store_plan_basic",
    name: "Basic",
    description:
      "Ideal for crafters and small businesses that want to sell online. Cost less than a Coffee",
    features: ["Create up to 1 store", "Create up to 10 products"],
    stripePriceId: "",
    price: 0,
  },
  {
    id: "store_plan_standard",
    name: "Tuned",
    description:
    "Perfect for midsize businesses that want to sell online. Cost more than a Coffee",
  features: ["Create up to 2 store", "Create up to 20 products per store"],
  stripePriceId: env.STRIPE_STD_MONTHLY_PRICE_ID,
  price: 5,
  },
  {
    id: "store_plan_pro",
    name: "Sphere",
    description: "Perfect for big businesses that want to sell online.",
    features: ["Create up to 3 stores", "Create up to 20 products per store"],
    stripePriceId: env.STRIPE_PRO_MONTHLY_PRICE_ID,
    price: 10,
  },
];

export const musicAppSubscriptionPlans: MusicAppSubscriptionPlan[] = [
  {
    id: "music_app_basic",
    name: "Basic Music App Plan",
    description: "Description for the basic music app plan.",
    features: ["Feature A", "Feature B"],
    stripePriceId: "your_stripe_price_id_for_basic_music_app",
    price: 7,
  },
  {
    id: "music_app_standard",
    name: "Standard Music App Plan",
    description: "Description for the standard music app plan.",
    features: ["Feature X", "Feature Y"],
    stripePriceId: "your_stripe_price_id_for_standard_music_app",
    price: 12,
  },
  {
    id: "music_app_pro",
    name: "Pro Music App Plan",
    description: "Description for the pro music app plan.",
    features: ["Feature M", "Feature N"],
    stripePriceId: "your_stripe_price_id_for_pro_music_app",
    price: 20,
  },
];