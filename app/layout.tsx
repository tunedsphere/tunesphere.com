
import '@styles/globals.css';
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider";

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
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "light" },
      { media: "(prefers-color-scheme: dark)", color: "dark" },
    ],
    creator: "TunedSphere",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
    },
}

interface RootLayoutProps {
  children: React.ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>

    <html lang="en">   
        <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

                {children}

              </ThemeProvider>   
              <Toaster />  
              <script src="@utils/searchscript.js" defer></script>
           </body>       
    </html>

    </ClerkProvider>
    
  )
}
