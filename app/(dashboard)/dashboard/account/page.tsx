import type { Metadata } from "next"
import { env } from "@/env.mjs"
import { Shell } from "@/components/shells/shell"
import { UserProfile } from "@/components/auth/user-profile"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"



export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Account",
  description: "Manage your account settings",
}

export default function AccountPage() {
  return (
    <>
      <Shell variant="dashboard">
      <PageHeader variant="dashboard" id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm">Account</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
        <section
        className="grid gap-8"
        id="user-account-info"
        aria-labelledby="user-account-info-heading">
          <UserProfile  />
        </section>
      </Shell>
    </>
  )
}
