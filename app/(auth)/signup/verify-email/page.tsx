import { Shell } from "@components/shells/shell"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { VerifyEmailForm } from "@/components/forms/verify-email-form"

export const metadata = {
  title: "Verify Email",
  description: "Verify your email address to continue with your sign up",
}

export default function VerifyEmailPage() {
  return (
    <Shell variant="auth">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify email</CardTitle>
          <CardDescription>
            Verify your email address to complete your account creation
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <VerifyEmailForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
