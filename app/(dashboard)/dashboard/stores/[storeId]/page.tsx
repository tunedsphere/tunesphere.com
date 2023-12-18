import { type Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { db } from '@/db'
import { stores } from '@/db/schema'
import { env } from '@/env.mjs'
import { and, eq, not } from 'drizzle-orm'

import { getStripeAccountAction } from '@/app/_actions/stripe'

import { cn, formatDate } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConnectStoreToStripeButton } from '@/components/connect-store-to-stripe-button'
import { UpdateStoreForm } from '@/components/forms/update-store-form'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Manage Store',
  description: 'Manage your store',
}

interface UpdateStorePageProps {
  params: {
    storeId: string
  }
}

export default async function UpdateStorePage({
  params,
}: UpdateStorePageProps) {
  const storeId = Number(params.storeId)
  const store = await db.query.stores.findFirst({
    where: eq(stores.id, storeId),
  })
  if (!store) {
    notFound()
  }

  const { account: stripeAccount } = await getStripeAccountAction({ storeId })

  return (
    <div className="space-y-6">
      {stripeAccount ? (
        <Card
          variant="dashboard"
          as="section"
          id="manage-stripe-account"
          aria-labelledby="manage-stripe-account-heading"
        >
          <CardHeader className="space-y-1">
            <CardTitle className="line-clamp-1 text-2xl">
              Manage Stripe account
            </CardTitle>
            <CardDescription>
              Manage your Stripe account and view your payouts
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <fieldset className="grid gap-2.5">
              <Label htmlFor="stripe-account-email">Email</Label>
              <Input
                id="stripe-account-email"
                name="stripeAccountEmail"
                readOnly
                defaultValue={stripeAccount.email ?? 'N/A'}
              />
            </fieldset>
            <fieldset className="grid gap-2.5">
              <Label htmlFor="stripe-account-country">Country</Label>
              <Input
                id="stripe-account-country"
                name="stripeAccountCountry"
                readOnly
                defaultValue={stripeAccount.country}
              />
            </fieldset>
            <fieldset className="grid gap-2.5">
              <Label htmlFor="stripe-account-currency">Currency</Label>
              <Input
                id="stripe-account-currency"
                name="stripeAccountCurrency"
                className="uppercase"
                readOnly
                defaultValue={stripeAccount.default_currency}
              />
            </fieldset>
            <fieldset className="grid gap-2.5">
              <Label htmlFor="stripe-account-created">Created</Label>
              <Input
                id="stripe-account-created"
                name="stripeAccountCreated"
                readOnly
                defaultValue={
                  stripeAccount.created
                    ? formatDate(stripeAccount.created * 1000)
                    : 'N/A'
                }
              />
            </fieldset>
          </CardContent>
          <CardFooter>
            <Link
              aria-label="Manage Stripe account"
              href="https://dashboard.stripe.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({
                  className: 'text-center',
                }),
              )}
            >
              Manage Stripe account
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <Card
          variant="dashboard"
          as="section"
          id="connect-to-stripe"
          aria-labelledby="connect-to-stripe-heading"
        >
          <CardHeader className="space-y-1">
            <CardTitle className="line-clamp-1 text-2xl">
              Connect to Stripe
            </CardTitle>
            <CardDescription>
              Connect your store to Stripe to start accepting payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConnectStoreToStripeButton storeId={storeId} />
          </CardContent>
        </Card>
      )}
      <UpdateStoreForm store={store} />
    </div>
  )
}
