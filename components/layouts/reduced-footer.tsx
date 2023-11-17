"use client"

import "./layouts.css"
import Link from "next/link"
import * as React from "react"
import { Icons } from "@/components/icons"




export function ReducedFooter () {
  return (
    <footer className="fixed flex justify-between align-middle py-2 bottom-0 top[100%] bg-background border-t border-muted mx-auto w-full items-center px-4 overflow-x-auto" id="reduced-footer-bottom" aria-labelledby="reduced-footer-bottom-heading">
      <div className="hidden sm:flex flex-wrap justify-center items-center gap-2">
        <h5 className="text-base font-extrabold text-texthigh">TUNEDSPHERE</h5>
        <p className="text-sm font-normal text-textlow opacity-75">
          Copyright © 2023
        </p>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/docs/about">
              <span className="text-sm font-normal text-textlow opacity-75 hover:text-texthigh">About</span>
            </Link>
          </li>
          <li>
            <Link href="/docs/contact">
              <span className="text-sm font-normal text-textlow opacity-75 hover:text-texthigh">Contact</span>
            </Link>
          </li>
          <li>
            <Link href="/docs/legal/terms">
              <span className="text-sm font-normal text-textlow opacity-75 hover:text-texthigh">Terms</span>
            </Link>
          </li>
          <li>
            <Link href="/docs/privacy">
              <span className="text-sm font-normal text-textlow opacity-75 hover:text-texthigh">Privacy</span>
            </Link>
          </li>
          <li>
          <Link href="/" className="">
          <Icons.logo 
          className="w-6 h-6"/>
        </Link>
        </li>
        </ul>
      
      </div>
    </footer>
  );
}
