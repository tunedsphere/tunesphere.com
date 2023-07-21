
import '@styles/globals.css';
import * as React from "react"
import SigninCard from '@/components/auth/SigninCard';
import { Shell } from '@/components/shell';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { SignedOut, SignedIn, useSignIn } from '@clerk/nextjs';
import { Button } from '@components/ui/button';
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"



export function ModalLogIn() {


  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)
 

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((isOpen) => !isOpen)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])
  const handleCloseDialog = React.useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleSelect = React.useCallback((callback: () => unknown) => {
    setIsOpen(false)
    callback()
  }, [])

  React.useEffect(() => {
    if (!isOpen) {
      setQuery("")
    }
  }, [isOpen])

  return (
    <>
                <SignedOut>
                  <Button 
                  variant="logInButton"
                  className='hidden sm:block'
                  size="xs"  onClick={() => setIsOpen(true)}>Log In</Button>
               </SignedOut>
          <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
          <div className="z-10000">
            <Shell layout="auth">
              <SigninCard onClose={handleCloseDialog}/>
            </Shell>
        </div>
            </CommandDialog>
            </>

  );
};
