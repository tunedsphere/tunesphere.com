
import '@/styles/globalnav.css';
import '@/styles/globals.css';

import Link from 'next/link';


  export default function Authheader() {

  return (
    <nav id="globalnav" className="globalnav fixed h-auto bg-accent0">
      <div id="globalnav-content" className="globalnav-content relative ">
        <nav className="navbar navbartop z-9999 algin-center px-4 md:px-8">
          <div className="py-5 navbar-container">

            <div className="flex justify-center">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h2 className="text-center text-brand hover:text-primary algin-center cursor-pointer font-extrabold text-[24px] leading-[30.24px]">
                  TUNEDSPHERE
                </h2>
              </Link>
            </div>
           
          </div>
        </nav>
      </div>
    </nav>
  );
};