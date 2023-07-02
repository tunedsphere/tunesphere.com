"use client";
import './globalnavbarapp.css';
import '@/styles/globals.css';
import React from 'react';

import Link from 'next/link';


const AuthNav = () => {


  return (
    <nav id="globalnav" className="globalnav fixed h-auto">
      <div id="globalnav-content" className="globalnav-content relative ">
        <nav className="navbar navbartop z-9999 algin-center px-4 md:px-8">
          <div className="py-5/ navbar-container">

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

      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0 hidden md:block"
        style={{ zIndex: -10 }}
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>

      
    </nav>
  );
};

export default AuthNav;