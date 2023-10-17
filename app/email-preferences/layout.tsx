import Image from "next/image"
import { siteConfig } from "@/configs/site"

import AuthHeader from "@/components/layouts/auth-header"

interface EmailLayoutProps {
  children: React.ReactNode
}

export default function EmailLayout({ children }: EmailLayoutProps) {
  return (
    <>
      <div className="absolute inset-0 hidden min-h-full object-cover md:block">
        <Image
          src="/bggenre/retina.png"
          alt="retina bggenre"
          fill
          priority
          quality={70}
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: "cover", // cover, contain, none
          }}
        />
      </div>
      <AuthHeader />
      <div className="min-h-screen justify-center overflow-hidden">
        <main className="container invisible absolute items-center justify-center">
          <div className="grid max-w-lg items-center justify-center">
            <p className="font-semibold text-white">
            If you no longer want to receive these emails, you can Unsubscribe here!
            Thanks for Tuning In, we will miss you{" "}
            </p>
          </div>
        </main>
        <main className="absolute col-span-1 mx-auto flex min-w-full items-center justify-center">
          {children}
        </main>
      </div>
    </>
  )
}
