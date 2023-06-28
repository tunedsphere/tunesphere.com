import { useEffect, useRef } from 'react';
import '@styles/globals.css';
import { useState } from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {

  return (
    <aside

      className="flex flex-col min-w-[200px] shrink-0 overflow-x-hidden overflow-auto border-accent4 border-y-2"
    >
      {children}

    </aside>
  );
};

export default Sidebar;