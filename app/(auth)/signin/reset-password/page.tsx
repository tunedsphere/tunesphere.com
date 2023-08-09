import { Shell } from "@components/shells/shell"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ResetPasswordForm } from "@/components/forms/reset-password-form"

export const metadata = {
  title: "Reset Password",
  description: "Enter your email to reset your password",
}

export default function ResetPasswordPage() {
  return (
    <Shell variant="auth">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a verification code
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
