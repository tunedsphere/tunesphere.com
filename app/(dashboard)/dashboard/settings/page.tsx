import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"
import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
  } from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { UpdateEmailPreferencesForm } from "@/components/forms/update-email-preferences-form"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { emailPreferences } from "@/db/schema"
import { eq } from "drizzle-orm"
export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: "Settings",
    description: "Manage your Settings",
  }
interface SettingsPageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
      }
  }
  
  export default async function SettingsPage({
    searchParams,
}: SettingsPageProps) {
  
  
    const user = await currentUser()
  
    if (!user) {
      redirect("/signin")
    }
    const token = typeof searchParams.token === "string" ? searchParams.token : ""
    const emailPreference = await db.query.emailPreferences.findFirst({
      where: eq(emailPreferences.token, token),
    })
  
    if (!emailPreference) {
      notFound()
    }
return (
    <>
      <Shell variant="dashboard">
      <PageHeader
        variant="dashboard"
        id="dashboard-Settings-header"
        aria-labelledby="dashboard-Settings-header-heading"
      >
        <PageHeaderHeading size="sm">Settings</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your settings
        </PageHeaderDescription>
      </PageHeader>
        <UpdateEmailPreferencesForm emailPreference={emailPreference}/>
      </Shell>
    </>
  )
}