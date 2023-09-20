"use client"
import React, { useEffect, useState } from 'react';

function NavbarVideo() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 768) { // Adjust the breakpoint as needed
      setShouldLoadVideo(true);
    }
  }, []);

  return (
    shouldLoadVideo && (
      <video
        autoPlay
        loop
        muted
        className="absolute left-0 top-0 z-10 h-full w-full object-cover md:block"
        style={{ zIndex: -10 }}
      >
        <source src="@/public/bgvideo.mp4" type="video/mp4" />
      </video>
    )
  );
}
export default NavbarVideo