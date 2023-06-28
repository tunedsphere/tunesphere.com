
import '@styles/globals.css';
import { GlobalNav } from '@components';
import { Footer } from '@components';
import { ClerkProvider, SignIn } from "@clerk/nextjs";


export default function FestivalsLayout({ children }) {

  return (

            <section>
             
             <main className='mt-28 mx-auto max-w-[1600px] px-4'>{children}</main>
       
         
              </section>


  )
}
