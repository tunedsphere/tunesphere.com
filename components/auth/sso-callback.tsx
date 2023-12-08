"use client";

import * as React from "react";
import { type SSOCallbackPageProps } from "@/app/(auth)/sso-callback/page";
import { useClerk } from "@clerk/nextjs";

import { Icon } from "@/components/icon";

export default function SSOCallback({ searchParams }: SSOCallbackPageProps) {
  const { handleRedirectCallback } = useClerk();

  React.useEffect(() => {
    void handleRedirectCallback(searchParams);
  }, [searchParams, handleRedirectCallback]);

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-describedby="loading-description"
      className="flex items-center justify-center"
    >
      <Icon
        name="spinner"
        className="h-16 w-16 animate-spin"
        aria-hidden="true"
      />
    </div>
  );
}
