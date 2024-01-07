'use client'
import '@/styles/globals.css'
import { docsConfig } from '@/configs/docs'
import * as React from 'react'

import { Icon } from '@/components/icon'
import { DocsMainNav } from '@/components/layouts/docs-main-nav'
import { DocsSearch } from '@/components/searchs/docs-search'
import { ThemeToggle } from '@/components/theme-toggle'

import { DocsMobileNav } from '@/components/layouts/docs-mobile-nav'
import { Breadcrumbs } from '@/components/pagers/breadcrumbs'
import { toTitleCase } from '@/lib/utils'
interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false)
  const openMobileMenu = () => {
    setShowMobileMenu(true)
  }
  const closeMobileMenu = () => {
    setShowMobileMenu(false)
  }
  return (
    <>
      <div className="sticky top-0 z-40 w-full flex-none  bg-background lg:border-b">
        <div className="mx-auto max-w-8xl">
          <div className="mx-4 flex items-center justify-between border-b  py-4 lg:mx-0 lg:border-0 lg:px-8">
            <div className="flex space-x-4">
              <DocsMainNav items={docsConfig.mainNav} />
            </div>
            <div className="flex items-center justify-between space-x-4 text-center">
              <DocsSearch />
              <ThemeToggle className="" />
            </div>
          </div>
          <div className="flex items-center justify-between border-b  p-4 sm:space-x-0 lg:hidden ">
            <div className="flex">
              <button className="flex items-center space-x-2">
                {showMobileMenu ? (
                  <div onClick={closeMobileMenu}>
                    <Icon name="close" className="h-6 w-6 hover:text-primary" />
                  </div>
                ) : (
                  <span onClick={openMobileMenu}>
                    <Icon
                      name="menu"
                      className="h-6 w-6 font-bold text-muted-foreground"
                    />
                  </span>
                )}
              </button>
              <div className="ml-4 flex min-w-0 space-x-3 whitespace-nowrap text-sm leading-6">
                <Breadcrumbs
                  segments={[
                    {
                      title: toTitleCase(docsConfig.sidebarNav[0].title),
                      href: `/docs/${docsConfig.sidebarNav[0].title.toLowerCase()}`,
                    },
                  ]}
                />
              </div>
              {showMobileMenu &&
                docsConfig.mainNav &&
                docsConfig.sidebarNav && (
                  <DocsMobileNav
                    closeMobileMenu={closeMobileMenu}
                    sideItems={docsConfig.sidebarNav}
                    items={docsConfig.mainNav}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen flex-col justify-between">
        <main className="relative mx-auto w-full max-w-8xl lg:flex lg:items-start ">
          {children}
        </main>
        <div className="border-t ">
          <div className="mx-auto w-full max-w-8xl space-y-8 px-4 py-8 md:p-8 md:pb-12 lg:flex lg:justify-between lg:space-y-0 lg:p-16 lg:pb-20">
            {' '}
            <div className="absolute left-[37%] h-24 w-60 bg-primary blur-[140px]" />
            <footer className="relative mx-auto max-w-8xl items-center px-4 py-8">
              <section
                id="footer-bottom"
                aria-labelledby="footer-bottom-heading"
                className="flex items-center justify-center align-middle"
              >
                <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
                  <h1 className="text-base font-extrabold text-texthigh">
                    TUNEDSPHERE
                  </h1>
                  <p className="text-sm font-normal text-textlow">
                    Copyright © 2023 - 2023 TunedSphere. All rights reserved.
                  </p>
                </div>
              </section>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}
