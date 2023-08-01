import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { Header } from "@/components/header"
import { Shell } from "@components/shells/shell"

export const metadata: Metadata = {
  title: "Purchases",
  description: "Manage your purchases",
}

export default async function PurchasesPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  return (
    <>
    <Shell variant="dashboard">
    <Header
        variant='dashboard'
        title="Purchases"
        description="Manage your purchases."
        size="sm"
      />
      <div className="px-8 gap-8 grid">
      <div>Purchases Table</div>
      </div>
    </Shell>
    </>
  )
}
