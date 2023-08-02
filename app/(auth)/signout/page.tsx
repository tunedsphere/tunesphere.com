import { LogOutButtons } from "@/components/auth/logout-buttons"
import { Header } from "@/components/header"
import { Shell } from "@components/shells/shell"
import { Card } from "@components/ui/card"
// export const runtime = "edge"

export default function SignOutPage() {
  return (
    <Shell variant="auth" className="max-w-xs gap-2 sm:border border-white bg-accent1 p-16 rounded-md">
      <Header variant="auth"
        title="Sign out"
        description="Are you sure you want to sign out?"
        size="default"
        className="text-center py-4"
      />
      <LogOutButtons />
    </Shell>
  )
}
