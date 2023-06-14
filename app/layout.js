
import '@styles/globals.css';
import { GlobalNav } from '@components';
import { Footer } from '@components';
import { ClerkProvider, SignIn } from "@clerk/nextjs";


export const metadata = {
  title: 'TunedSphere',
  description: 'Psychedelic Dedicated Platform',

    keywords: [
      "Psytrance",
      "Music Platform",
      "Psychedelic",
      "Art",
      "Shop",
    ],
    authors: [
      {
        name: "TunedShpere",
        url: "https://TuneSphere.com",
      },
    ],
    creator: "Tunedsphere",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
    },


}

export default function RootLayout({ children }) {

  return (
    <ClerkProvider >


    <html lang="en">  
        <body className="min-h-screen bg-background font-sans antialiased">

              <GlobalNav/>

          {children}   
       
              <Footer />     


           </body>
    </html>

    </ClerkProvider>

  )
}
