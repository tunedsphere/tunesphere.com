"use client";
import React, { ReactNode } from 'react';

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return <div className="sidebar">{children}</div>;
};

export default Sidebar;