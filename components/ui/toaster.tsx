"use client"

import "@/styles/globals.css"

import { Toaster as RadToaster } from "sonner"
import { toast } from "sonner"

export function Toaster() {
  return (
    <RadToaster
      className="z-10000"
      position="bottom-right"
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--texthigh))",
          border: "1px solid hsl(var(--muted))",
        },
      }}
    />
  )
}
