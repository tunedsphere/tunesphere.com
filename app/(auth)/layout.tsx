import Image from "next/image";

import { siteConfig } from '@configs/site';
 import AuthHeader from '@/components/layouts/auth-header';

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
    <div className="absolute object-cover inset-0 md:block hidden">
      <Image
          src="/bggenre/retina.png"
          alt="retina bggenre"
          fill
          priority
          quality={70}
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: 'cover', // cover, contain, none
          }}
        />
        </div>
            <AuthHeader/>
    <div className="md:grid min-h-screen justify-center overflow-hidden md:grid-cols-3 lg:grid-cols-2">
     
        <main className="container absolute md:top-1/2 md:col-span-1 justify-center items-center md:static md:flex md:translate-y-0 lg:col-span-1 invisible md:visible">
      <div className="grid max-w-lg items-center gap-8 p-8 justify-center">
      <span className="text-texthigh text-xl font-bold">{siteConfig.name}</span>
      <p className="text-texthigh font-semibold">Join and build together a dedidcated Wonderland of Psychedelic Art.
      Join us, 
      Drop On and Tune In  </p>
      </div>
        </main>
      <main className="flex justify-center absolute mt-24 sm:p-4 col-span-1 mx-auto min-w-full items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
        {children}
      </main>
    </div>
    </>
  )
}
