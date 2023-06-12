import React from 'react';

const Header = () => {
  return (
    <header className="bg-black py-4">
      <div className="container mx-auto flex items-center justify-between">
        <h2 className="text-white text-xl">Label</h2>
        <nav className="text-white">
          <ul className="flex space-x-4">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Artists</li>
            <li className="hover:underline cursor-pointer">Releases</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;