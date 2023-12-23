'use client'

import '@/styles/globals.css'

import React, { useEffect, useRef, useState } from 'react'
import { SignedOut } from '@clerk/nextjs'
import { Shell } from '@/components/shells/shell'

import { useDebounce } from '@/hooks/use-debounce'
import SigninCard from '@/components/auth/SigninCard'

interface ModalProps {
  handleModalClose: () => void
}

export function Modal({ handleModalClose }: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const modalRef = useRef(null)
  const [query, setQuery] = React.useState('')
  const debouncedQuery = useDebounce(query, 300)

  return (
    <>
      <SignedOut>
        <div className="fixed inset-0 z-20000 flex h-screen items-center justify-center bg-background/30 backdrop-blur-sm @container">
          <div
            ref={modalRef}
            className="no-scrollbar no-scrollbar absolute bottom-0 top-0 z-20000 w-full overflow-y-auto"
          >
            <Shell variant="auth" className="z-40">
              <SigninCard onClose={handleModalClose} />
            </Shell>
          </div>
        </div>
      </SignedOut>
    </>
  )
}
