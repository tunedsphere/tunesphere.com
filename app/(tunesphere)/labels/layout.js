
import '@styles/globals.css';
import { GlobalNav } from '@components';
import { Footer } from '@components';
import { ClerkProvider, SignIn } from "@clerk/nextjs";


export default function LabelsLayout({ children }) {

  return (

            <section>
             
             <main className='mx-auto'>{children}</main>
       
         
              </section>


  )
}
