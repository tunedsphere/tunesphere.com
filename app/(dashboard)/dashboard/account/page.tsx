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
      card: "shadow-none items-center mx-auto w-11/12",
      rootBox: "shadow-none items-center sm:w-10/12",
      form: "px-2",
      navbar: "hidden",
      navbarMobileMenuButton: "hidden",
      headerTitle: "hidden",
      headerSubtitle: "hidden",
      profilePage: "gap-0",
      profileSectionTitle:
        "font-semibold text-2xl",
      profileSectionContent: "border rounded-md border-muted bg-card py-2",
      profileSectionPrimaryButton: "text-base text-primary py-3",
      profileSection: "py-4",
      pageScrollBox: "p-0",
      formFieldInput: "w-11/12 p-2 text-texthigh rounded-md outline-primary accent-transparent ring-1 ring-primay focus:ring-primary outline-offset-0 ring-offset-primary",
      formFieldLabel: "py-2 font-semibold",
      formButtonPrimary: "text-texthigh bg-primary hover:bg-primary/70 rounded-sm",
      formButtonReset: "text-primary rounded-sm",
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
