
import '@styles/globals.css';
import { GlobalNav } from '@components';
import { Footer } from '@components';
import { ClerkProvider, SignIn } from "@clerk/nextjs";


export default function LabelsLayout({ children }) {

  return (

            <section>
             
             <main className='mt-28 mx-auto px-4'>{children}</main>
       
         
              </section>


  )
}
