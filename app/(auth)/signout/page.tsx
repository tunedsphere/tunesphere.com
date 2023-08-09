import { Shell } from "@components/shells/shell"
import { Card } from "@components/ui/card"

import { LogOutButtons } from "@/components/auth/logout-buttons"
import { Header } from "@/components/header"

// export const runtime = "edge"

export default function SignOutPage() {
  return (
    <Shell
      variant="auth"
      className="max-w-xs gap-2 rounded-md border-white bg-accent-1 p-16 sm:border"
    >
      <Header
        variant="auth"
        title="Sign out"
        description="Are you sure you want to sign out?"
        size="default"
        className="py-4 text-center"
      />
      <LogOutButtons />
    </Shell>
  )
}
