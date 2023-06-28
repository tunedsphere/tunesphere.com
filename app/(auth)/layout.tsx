import Image from "next/image"
import Link from "next/link"

import siteConfig from '@configs/site'
import { Icons } from "@/components/icons"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
       <Image
          src="/bggenre/retina.png"
          alt="retina bggenre"
          priority
          fill
          className="absolute inset-0 object-cover"
        />
        <main className="container absolute top-1/2 col-span-1 flex -translate-y-1/2 justify-center items-center md:static md:flex md:translate-y-0 lg:col-span-1 invisible md:visible">
      <div className="grid max-w-lg items-center gap-8 p-8 justify-center">
      <span className="text-texthigh text-xl font-bold">{siteConfig.name}</span>
      <p className="text-texthigh"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, nam. Nulla, ab velit ad molestias suscipit officia quisquam sint iusto qui expedita maxime eos dolorum repellendus voluptas nostrum dignissimos quidem.</p>
      </div>
       
       
  
        </main>
      <main className="container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
        {children}
      </main>
    </div>
  )
}
