import { Shell } from "@/components/shells/shell"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ResetPasswordStep2Form } from "@/components/forms/reset-password-form-step2"

export const metadata = {
  title: "Reset Password",
  description: "Enter your email to reset your password",
}

export default function ResetPasswordStep2Page() {
  return (
    <Shell variant="auth">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">verification code sent</CardTitle>
          <CardDescription>
            Enter your new password and paste your a verification code below,
            Did not receive it yet. Wait a little or check your spams.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ResetPasswordStep2Form />
        </CardContent>
      </Card>
    </Shell>
  )
}
