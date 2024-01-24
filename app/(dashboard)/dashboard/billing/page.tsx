import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { env } from '@/env.mjs'
import { currentUser } from '@clerk/nextjs'

import { storeSubscriptionPlans } from '@/configs/subscriptions'
import { getSubscriptionPlanAction } from '@/app/_actions/stripe'
import { cn, formatDate, formatPrice } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ManageSubscriptionForm } from '@/components/forms/manage-subscription-form'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { Icon } from '@/components/icon'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Billing',
  description: 'Manage your billing and subscription',
}

export default async function BillingPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/signin')
  }

  const storeSubscriptionPlan = await getSubscriptionPlanAction(user.id)

  return (
    <>
      <Shell variant="dashboard">
        <PageHeader
          variant="dashboard"
          id="billing-header"
          aria-labelledby="billing-header-heading"
        >
          <PageHeaderHeading size="sm">Billing</PageHeaderHeading>
          <PageHeaderDescription size="sm">
            Manage your billing and subscription
          </PageHeaderDescription>
        </PageHeader>
        <section
          id="billing-info"
          aria-labelledby="billing-info-heading"
          className="space-y-5"
        >
          <h2 className="text-xl font-semibold sm:text-2xl">Billing info</h2>
          <Card variant="dashboard" className="grid gap-4 p-6">
            <h3 className="text-lg font-semibold sm:text-xl">
              <span>Current Plan :</span>
              <span className="font-medium text-primary">
                {' '}
                <strong> {storeSubscriptionPlan?.name}</strong>
              </span>
            </h3>
            <p className="text-sm text-muted-foreground">
              {!storeSubscriptionPlan?.isSubscribed
                ? 'Upgrade to create more stores and products.'
                : storeSubscriptionPlan.isCanceled
                  ? 'Your plan will be canceled on '
                  : 'Your plan renews on '}
              {storeSubscriptionPlan?.stripeCurrentPeriodEnd
                ? `${formatDate(storeSubscriptionPlan.stripeCurrentPeriodEnd)}.`
                : null}
            </p>
          </Card>
        </section>
        <section
          id="subscription-plans"
          aria-labelledby="subscription-plans-heading"
          className="space-y-5 pb-2.5"
        >
          <h2 className="text-xl font-semibold sm:text-2xl">
            Subscription plans
          </h2>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {storeSubscriptionPlans.map((plan, i) => (
              <Card
                variant="dashboard"
                key={plan.name}
                className={cn(
                  'flex flex-col py-4',
                  i === storeSubscriptionPlans.length - 1 &&
                    'lg:col-span-2 xl:col-span-1' &&
                    'border-primary shadow-md',
                )}
              >
                <CardHeader>
                  <CardTitle className="mb-4 line-clamp-1 text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-primary">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid flex-1 place-items-start gap-6">
                  <div className="text-3xl font-bold">
                    {formatPrice(plan.price, {
                      currency: 'EUR',
                    })}
                    <span className="text-sm font-normal text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Icon
                          name="check"
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  {storeSubscriptionPlan?.name === plan.name ? (
                    <Link href="/dashboard/stores" className="w-full">
                      <div
                        className={cn(
                          buttonVariants({
                            variant: 'primary',
                            className: 'w-full',
                          }),
                        )}
                      >
                        Manage Stores
                        <span className="sr-only">Manage Stores</span>
                      </div>
                    </Link>
                  ) : (
                    <ManageSubscriptionForm
                      stripePriceId={plan.stripePriceId}
                      stripeCustomerId={storeSubscriptionPlan?.stripeCustomerId}
                      stripeSubscriptionId={
                        storeSubscriptionPlan?.stripeSubscriptionId
                      }
                      isSubscribed={
                        storeSubscriptionPlan?.isSubscribed ?? false
                      }
                      isCurrentPlan={storeSubscriptionPlan?.name === plan.name}
                    />
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </Shell>
    </>
  )
}
