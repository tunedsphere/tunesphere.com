"use client";

import * as React from "react";
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import type { OAuthStrategy } from "@clerk/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Icon, IconName } from "@/components/icon";

const oauthProviders = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  { name: "Facebook", strategy: "oauth_facebook", icon: "facebook" },
  { name: "Apple", strategy: "oauth_apple", icon: "apple" },
] satisfies {
  name: string;
  icon: IconName;
  strategy: OAuthStrategy;
}[];

export function OAuthSignIn() {
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null);
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!signInLoaded) return null;
    try {
      setIsLoading(provider);
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      setIsLoading(null);

      const unknownError = "Something went wrong, please try again.";

      isClerkAPIResponseError(error)
        ? toast.error(error.errors[0]?.longMessage ?? unknownError)
        : toast.error(unknownError);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-3 sm:gap-4">
      {oauthProviders.map((provider) => {
        const ProviderIcon = <Icon name={provider.icon} />;
        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            key={provider.strategy}
            variant="outline"
            className="w-full text-base sm:w-auto bg-background hover:bg-muted/30"
            onClick={() => void oauthSignIn(provider.strategy)}
          >
            {isLoading === provider.strategy ? (
              <Icon name="spinner" className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icon
                name={provider.icon}
                className="mr-2 h-4 w-4"
                aria-hidden="true"
              />
            )}
            {provider.name}
          </Button>
        );
      })}
    </div>
  );
}
