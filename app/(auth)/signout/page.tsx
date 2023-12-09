import type { Metadata } from "next";
import { env } from "@/env.mjs";

import { Shell } from "@/components/shells/shell";

import { LogOutButtons } from "@/components/auth/logout-buttons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

// export const runtime = "edge"
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Sign out",
  description: "Sign out of your account",
};
export default function SignOutPage() {
  return (
    <div className="p-8 bg-background gap-2 rounded-md border-muted/30 sm:border ">
      <PageHeader
        id="sign-out-page-header"
        aria-labelledby="sign-out-page-header-heading"
        className="text-center py-4"
        variant="auth"
      >
        <PageHeaderHeading size="sm">Sign out</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Are you sure you want to sign out?
        </PageHeaderDescription>
      </PageHeader>
      <LogOutButtons />
    </div>
  );
}
