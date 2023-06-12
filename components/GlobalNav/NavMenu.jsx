"use client"
import './globalnavbarapp.css';
import React, { useState } from 'react';
import NavbarItems from './NavbarItems';
import '@styles/globals.css';

const NavMenu = () => {


  return (

    <nav className="navbar navbarbottom flex relative">
    <div className="flex navbar-container h-[80px] items-center">
      <ul className="navbar-list items-center">
                  {NavbarItems.map((item) => (
                       <li className="navbar-item text-primary-brand hover:text-primary px-3" key={item.id}>
                         <a href={`#${item.id}`}>{item.label}</a>
                     </li>
                    ))}
               </ul>
            </div>
       </nav>
  );
};

export default NavMenu;

