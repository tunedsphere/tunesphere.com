"use client"
import "@/styles/globals.css"
import { UserProfile as ClerkUserProfile } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { type Theme } from "@clerk/types"
import { useTheme } from "next-themes"

    const appearance: Theme = {
    variables: {
      colorBackground: "transparent",
      colorInputBackground: "",
      borderRadius: "",
      fontSize: "text-2xl",
    },
    elements: {
      card: "shadow-none items-center mx-auto w-11/12",
      rootBox: "shadow-none items-center sm:w-10/12",
      form: "px-2",
      navbar: "hidden",
      navbarMobileMenuButton: "hidden",
      headerTitle: "hidden",
      headerSubtitle: "hidden",
      profilePage: "gap-0",
      profileSectionTitle:
        "font-semibold text-2xl",
      profileSectionContent: "border rounded-md border-muted bg-card py-2",
      profileSectionPrimaryButton: "text-sm text-foreground text-semibold py-3",
      profileSection: "py-4",
      pageScrollBox: "p-0",
      formFieldInput: "w-11/12 p-2 bg-input text-texthigh rounded-md outline-primary accent-transparent ring-1 ring-primay focus:ring-primary outline-offset-0 ring-offset-primary",
      formFieldLabel: "py-2 font-semibold",
      formButtonPrimary: "bg-primary hover:bg-primary/70 rounded-sm",
      formButtonReset: "rounded-sm",
      badge: "text-primary",
    },
  }


  export function UserProfile() {
    const { theme } = useTheme()
  
    return (
      <ClerkUserProfile
        appearance={{
          ...appearance,
          baseTheme: theme === "dark" ? dark : appearance.baseTheme,
          variables: {
            ...appearance.variables,
            colorBackground: theme === "light" ? "transparent" : "transparent",
            colorText: theme === "light" ? "#fafafa" : "#000000",

          },
        }}
      />
    )
  }