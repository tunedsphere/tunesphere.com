"use client";
import "@/styles/globals.css";
import { docsConfig } from "@/configs/docs";
import * as React from "react";

import { Icon } from "@/components/icon";
import { DocsMainNav } from "@/components/layouts/docs-main-nav";
import { DocsSearch } from "@/components/searchs/docs-search";
import { ThemeToggle } from "@/components/theme-toggle";

import { DocsMobileNav } from "@/components/layouts/docs-mobile-nav";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import { toTitleCase } from "@/lib/utils";
import SiteFooter from "@/components/layouts/site-footer";
import Link from "next/link";
import { siteConfig } from "@/configs/site";
import { SubscribeToNewsletterForm } from "@/components/forms/subscribe-to-newsletter-form";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const openMobileMenu = () => {
    setShowMobileMenu(true);
  };
  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };
  return (
    <>
      <div className="sticky top-0 z-40 w-full lg:border-b border-muted bg-background flex-none">
        <div className="max-w-8xl mx-auto">
          <div className="flex py-4 items-center justify-between border-b border-muted lg:border-0 lg:px-8 mx-4 lg:mx-0">
            <div className="flex space-x-4">
              <DocsMainNav items={docsConfig.mainNav} />
            </div>
            <div className="flex items-center justify-between text-center space-x-4">
              <DocsSearch />
              <ThemeToggle className="" />
            </div>
          </div>
          <div className="lg:hidden flex p-4 border-b border-muted items-center justify-between sm:space-x-0 ">
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
              <div className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0 space-x-3">
                <Breadcrumbs
                  segments={[
                    {
                      title: toTitleCase(docsConfig.sidebarNav[0].title),
                      href: `/docs/${docsConfig.sidebarNav[0].title.toLowerCase()}`,
                    },
                  ]}
                />
                {/* 
          <div className="flex items-center space-x-3 ">
            <span>{sidebarNav.title}</span>
          </div>
          <div className="font-semibold truncate">{SidebarNav.item}</div>
          */}
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
        <main className="relative w-full mx-auto max-w-8xl lg:flex lg:items-start ">
          {children}
        </main>
        <div className="border-t border-muted">
          <div className="mx-auto w-full max-w-8xl space-y-8 px-4 py-8 md:p-8 md:pb-12 lg:flex lg:justify-between lg:space-y-0 lg:p-16 lg:pb-20">
            {" "}
            <footer className="relative mx-auto max-w-8xl items-center px-4 py-8">
              <div className="footer-gradient -z-10 w-1/5" />

              <section
                id="footer-bottom"
                aria-labelledby="footer-bottom-heading"
                className="flex items-center justify-center align-middle"
              >
                <div className="flex flex-wrap justify-center items-center gap-4 pt-8">
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
      {/* 
  <div className="fixed-gradient">
    <div className="fixed footer-gradient right-0 top-0 h-full w-3/5" />
  </div>
  */}
    </>
  );
}
