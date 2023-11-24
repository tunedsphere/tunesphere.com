
import "./layouts.css"

import Link from "next/link"

export default function Authheader() {
  return (
    <nav id="globalnav" className="globalnav fixed h-auto bg-accent">
      <div id="globalnav-content" className="globalnav-content relative">
        <nav className="navbar z-9999 px-4 md:px-8">
          <div className="navbar-container py-5">
            <div className="flex justify-center">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h1 className="cursor-pointer text-center text-lg font-extrabold leading-[30.24px] text-brand">
                  TUNEDSPHERE
                </h1>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </nav>
  )
}
