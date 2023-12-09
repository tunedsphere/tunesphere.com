import React, { FC, SVGProps } from "react";
import { RefAttributes } from "react";

import { ShirtIcon } from "./Shirt";
import { BasketIcon } from "./Basket";
import { CreditCardIcon } from "./CreditCard";
import { CartIcon } from "./Cart";
import { ProductIcon } from "./Product";
import { BillingIcon } from "./Billing";
import { StoreIcon } from "./Store";
import { BackpackIcon } from "./Backpack";
import { BookIcon } from "./Book";
import { ArtIcon } from "./Art";
import { SprayIcon } from "./Spray";
import { LeafIcon } from "./Leaf";
import { CigaretteIcon } from "./Cigarette";
import { CdIcon } from "./Cd";
import { DollarSignIcon } from "./DollarSign";

export type ShopIconName =
  | "store"
  | "shirt"
  | "backpack"
  | "basket"
  | "credit-card"
  | "cart"
  | "dollar-sign"
  | "product"
  | "billing"
  | "book"
  | "art"
  | "spray"
  | "leaf"
  | "cigarette"
  | "cd";

export const shopIconMap = {
  "dollar-sign": DollarSignIcon,
  product: ProductIcon,
  store: StoreIcon,
  cart: CartIcon,
  shirt: ShirtIcon,
  basket: BasketIcon,
  backpack: BackpackIcon,
  billing: BillingIcon,
  "credit-card": CreditCardIcon,
  book: BookIcon,
  art: ArtIcon,
  spray: SprayIcon,
  leaf: LeafIcon,
  cigarette: CigaretteIcon,
  cd: CdIcon,
};
