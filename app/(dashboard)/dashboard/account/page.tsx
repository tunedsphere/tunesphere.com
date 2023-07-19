import '@styles/globals.css';
import type { Metadata } from "next"
import { UserProfile } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Header } from "@/components/header"
import { Shell } from "@/components/shell"

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
      fontSize: "text-2xl"
    },

    elements: {
      card: "shadow-none flex justify-center items-center mx-auto object-contain sm:w-10/12 lg:w-full w-full",
      navbar: "hidden",
      navbarMobileMenuButton: "hidden",
      headerTitle: "hidden",
      headerSubtitle: "hidden",
      profilePage: "divide-y divide-[var(--accent6)] gap-0",
      profileSectionTitle: "font-semibold text-2xl underline underline-offset-4 decoration-2",
      profileSectionPrimaryButton: "hidden",
      profileSection: "py-4",   
    },
  };

  return (
    <Shell layout="dashboard">
      <div className='bg-accent2 md:p-8'>
        <Header
          className='bg-acent1 p-8'
          title="Account"
          description="Manage your account settings."
          size="sm"
        />
      </div>
      <div className="overflow-hidden rounded-lg flex justify-center">
        <UserProfile appearance={appearance} />
      </div>
    </Shell>
  )
}

