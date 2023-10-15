import Image from "next/image"
import { siteConfig } from "@/configs/site"

import AuthHeader from "@/components/layouts/auth-header"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
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
      <div className="min-h-screen justify-center overflow-hidden md:grid md:grid-cols-3 lg:grid-cols-2">
        <main className="container invisible absolute items-center justify-center md:visible md:static md:top-1/2 md:col-span-1 md:flex md:translate-y-0 lg:col-span-1">
          <div className="grid max-w-lg items-center justify-center gap-8 p-8">
            <span className="text-3xl font-bold text-white">
              {siteConfig.name}
            </span>
            <p className="font-semibold text-white">
              Join and build together a dedidcated Wonderland of Psychedelic
              Art. Join us, Drop On and Tune In{" "}
            </p>
          </div>
        </main>
        <main className="absolute col-span-1 mx-auto mt-20 flex min-w-full items-center justify-center sm:p-4 md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
          {children}
        </main>
      </div>
    </>
  )
}
