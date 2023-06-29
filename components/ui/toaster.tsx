"use client"
import '@styles/globals.css';
import { Toaster as RadToaster } from "sonner"

export function Toaster() {
  return (
    <RadToaster
    className=''
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--background)",
          color: "var(--texthigh)",
          border: "1px solid var(--border)",
        },
      }}
    />
  )
}
