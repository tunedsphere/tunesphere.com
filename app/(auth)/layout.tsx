import Image from "next/image"

import siteConfig from '@configs/site'
import { AuthNav } from "@/components"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
    <div className="absolute object-cover inset-0 ">
      <Image
          src="/bggenre/retina.png"
          alt="retina bggenre"
          fill
          priority
          quality={100}
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: 'cover', // cover, contain, none
          }}
        />

        </div>

    <AuthNav />

    <div className="md:grid min-h-screen justify-center overflow-hidden md:grid-cols-3 lg:grid-cols-2">
     
        <main className="container absolute top-1/2 md:col-span-1 flex -translate-y-1/2 justify-center items-center md:static md:flex md:translate-y-0 lg:col-span-1 invisible md:visible">
      <div className="grid max-w-lg items-center gap-8 p-8 justify-center">
      <span className="text-texthigh text-xl font-bold">{siteConfig.name}</span>
      <p className="text-texthigh"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, nam. Nulla, ab velit ad molestias suscipit officia quisquam sint iusto qui expedita maxime eos dolorum repellendus voluptas nostrum dignissimos quidem.</p>
      </div>
       
       
  
        </main>
      <main className="flex justify-center absolute top-1/2 col-span-1 mx-auto min-w-full -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
        {children}
      </main>
    </div>
    </>
  )
}
