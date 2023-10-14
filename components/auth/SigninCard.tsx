import * as React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"
import { currentUser, SignedOut } from "@clerk/nextjs"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OAuthSignIn } from "@/components/auth/oauth-signin"
import { SignInForm } from "@/components/forms/signin-form"
import { siteConfig } from "@/configs/site"
import { FooterItem } from "@/types"

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account",
}

interface SigninCardProps {
  onClose?: () => void
}
export default function SigninCard({ onClose }:SigninCardProps ) {
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }
  const handleLinkClick = () => {
    handleClose()
  }

  return (
    <div id="signin-card" className="z-20 @container">
      <div className="modal-gradient z-60"></div>
      <Card className="border-0 border-border/50 bg-card @md:border">
        <div className="signin-card-gradient -z-10"></div>
        <div className="flex justify-end p-2 sm:p-4">
          <Button
            variant="ghost"
            onClick={handleClose}
            type="button"
            title="close"
            className="text-texthigh "
          >
            <Icons.close className="text-texthigh" />
          </Button>
        </div>
        <CardHeader className="items-center space-y-1">
          <CardTitle as="h1" className="text-card-foreground">Log in</CardTitle>
          <CardDescription className="p-2 text-center text-primary">
            Choose your preferred log in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthSignIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <section className="">
          <SignInForm handleLinkClick={handleClose}/>
          <div className="flex justify-center">
          <span className="text-sm text-muted-foreground">
  By signing in you accept our{" "}
  {siteConfig.footerNav && (
    <>
   <Link
  href={siteConfig.footerNav[2]?.items[2]?.href as string} // "Terms" href
  target="_blank"
  rel="noreferrer"
  className="text-primary transition-colors hover:text-foreground"
>
  Terms
</Link>{" "}
and{" "}
<Link
  href={siteConfig.footerNav[2]?.items[3]?.href as string} // "Privacy" href
  target="_blank"
  rel="noreferrer"
  className="text-primary transition-colors hover:text-foreground"
>
  Privacy
</Link>
    </>
  )}
</span>

</div>
</section>

        </CardContent>
        <CardFooter className="flex flex-wrap items-center space-x-2 pt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              aria-label="Sign up"
              href="/signup"
              className="text-texthigh underline-offset-4 transition-colors hover:underline"
              onClick={handleLinkClick}
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
