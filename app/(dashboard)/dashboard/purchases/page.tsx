
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { Shell } from "@/components/shells/shell"

import { Header } from "@/components/header"


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
          variant="dashboard"
          title="Purchases"
          description="Manage your purchases."
          size="sm"
        />
        <div className="grid gap-8 px-8">
          <div>Purchases Table</div>
        </div>
      </Shell>
    </>
  )
}
