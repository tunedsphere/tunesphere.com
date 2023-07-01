import React from 'react';

import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OAuthSignIn } from "@/components/auth/oauth-signin"
import { SignInForm } from "@components/forms/signin-form"

export const metadata = {
    title: "Sign In",
    description: "Sign in to your account",
  }
  
  interface SigninCardProps {
    onClose?: () => void;
  }
  const SigninCard: React.FC<SigninCardProps> = ({ onClose }) => {
    const handleClose = () => {
      if (onClose) {
        onClose();
      }
    };
  
    const handleLinkClick = () => {
      handleClose();
    };
  
    return (
      <div id="SigninCard" className="SigninCard relative top-32">
        <Card className=''>
        <div className='absolute bg-colortheme2 -z-10 -inset-2 blur'></div>
          <div className="flex justify-end">
            <button onClick={handleClose} type="button" title="close" className="right-1 top-1 w-6 h-6">
              <img src="svg/x.svg" alt="Close" />
            </button>
          </div>
          <CardHeader className="space-y-1 items-center">
            <CardTitle className="">Log in</CardTitle>
            <CardDescription className='p-2'>Choose your preferred log in method</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <OAuthSignIn />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <SignInForm />
          </CardContent>
          <CardFooter className="flex flex-wrap items-center space-x-2">
            <div className="flex-1 text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                aria-label="Sign up"
                href="/signup"
                className="text-textlow underline-offset-4 transition-colors hover:underline"
                onClick={handleLinkClick}
              >
                Sign up
              </Link>
            </div>
            <Link
              aria-label="Reset password"
              href="/signin/reset-password"
              className="text-sm text-textlow underline-offset-4 transition-colors hover:underline"
              onClick={handleLinkClick}
            >
              Reset password
            </Link>
          </CardFooter>
          
        </Card>
      </div>
     
    );
  };
  
  export default SigninCard;