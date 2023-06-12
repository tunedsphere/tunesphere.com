// "use client";
// import React, { useEffect, useState } from 'react';
// import NavbarBottom from './NavbarBottom';
// import './globalnavbarapp.css';



// const CollapseMenu = () => {
//   const [isNavbarBottomVisible, setIsNavbarBottomVisible] = useState(true);

//   useEffect(() => {
//     let lastScrollPosition = window.pageYOffset;

//     const handleScroll = () => {
//       const currentScrollPosition = window.pageYOffset;

//       if (currentScrollPosition > lastScrollPosition) {
//         setIsNavbarBottomVisible(false);
//       } else {
//         setIsNavbarBottomVisible(true);
//       }

//       lastScrollPosition = currentScrollPosition;
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);



//   return (

//       <div style={{ display: isNavbarBottomVisible ? 'block' : 'none' }}>
//         <NavbarBottom />
//       </div>

//   );
// };

// export default CollapseMenu;