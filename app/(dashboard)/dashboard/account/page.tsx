import '@styles/globals.css';
import type { Metadata } from "next"
import { UserProfile } from "@clerk/nextjs"

import { Header } from "@/components/header"
import { Shell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings",
}

export default function AccountPage() {
  return (
    <Shell layout="dashboard">
      <Header
        title="Account"
        description="Manage your account settings."
        size="sm"
      />
      <div className="w-full overflow-hidden rounded-lg">
        <UserProfile
          appearance={{
            variables: {
              colorBackground: "transparent",
              colorText: "hsl(199 80% 97%)",
              colorInputBackground: "hsl(240 4% 16%)",
              borderRadius: "0.25rem",
              fontSize :"text-2xl"

            },
            elements: {
              card: "shadow-none",
              navbar: "hidden",
              navbarMobileMenuButton: "hidden",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              profilePage: "divide-y divide-[var(--accent4)] ",
              profileSectionTitle: "pt-4 font-semibold text-2xl underline underline-offset-4 decoration-2",
              profileSectionPrimaryButton: "text-[var(--colortheme)]",
              profileSectionContent: "ml-4",

     
            },
          }}
        />
        </div>
    </Shell>

  )
}
