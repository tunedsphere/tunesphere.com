"use client"

import "@/styles/globals.css"

import React, { useEffect, useRef, useState } from "react"
import { SignedOut } from "@clerk/nextjs"
import { Shell } from "@/components/shells/shell"

import { useDebounce } from "@/hooks/use-debounce"
import SigninCard from "@/components/auth/SigninCard"

interface ModalProps {
  handleModalClose: () => void
}

const Modal: React.FC<ModalProps> = ({ handleModalClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const modalRef = useRef(null)
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)

  const handleClick = () => {
    setIsModalOpen(false)
  }

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleModalClose()
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleModalClose()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!isModalOpen) {
      setQuery("")
    }
  }, [isModalOpen])

  return (
    <>
      <SignedOut>
        {isModalOpen && (
          <div className="fixed inset-0 z-20000 flex h-screen items-center justify-center bg-background/30 backdrop-blur-xs @container">
            <div
              ref={modalRef}
              className="no-scrollbar no-scrollbar absolute bottom-0 top-0 z-20000 w-full overflow-y-auto"
            >
              <Shell variant="auth" className="z-40">
                <SigninCard onClose={handleClick} />
              </Shell>
            </div>
          </div>
        )}
      </SignedOut>
    </>
  )
}

export default Modal
