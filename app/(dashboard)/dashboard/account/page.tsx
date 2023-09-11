import "@/styles/globals.css"

import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser, UserProfile } from "@clerk/nextjs"
import { Shell } from "@/components/shells/shell"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings",
}

export default async function AccountPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }
  const appearance = {
    variables: {
      colorBackground: "transparent",
      colorText: "hsl(199 80% 97%)",
      colorInputBackground: "hsl(240 4% 16%)",
      borderRadius: "",
      fontSize: "text-2xl",
    },

    elements: {
      card: "shadow-none items-center mx-auto w-10/12 lg:w-full",
      navbar: "hidden",
      navbarMobileMenuButton: "hidden",
      headerTitle: "hidden",
      headerSubtitle: "hidden",
      profilePage: "divide-y divide-muted gap-0 ",
      profileSectionTitle:
        "font-semibold text-2xl underline underline-offset-4 decoration-2 decoration-theme",
      profileSectionContent: "border rounded-md border-muted bg-card ",
      profileSectionPrimaryButton: "text-base text-primary",
      profileSection: "py-4",
      pageScrollBox: "p-0",
    },
  }

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
          <UserProfile appearance={appearance} />
        </section>
      </Shell>
    </>
  )
}
