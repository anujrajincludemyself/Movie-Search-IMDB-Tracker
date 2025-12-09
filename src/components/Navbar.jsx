import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 bg-[#0d0d0d] text-white flex justify-between items-center shadow-md fixed top-0 left-0 z-10">
      
      <h2 className="text-lg font-semibold tracking-wide">🎬 MovieFinder    By Anuj Raj</h2>

      <div className="flex gap-6 text-sm font-medium">
        
        <a 
          href="https://www.linkedin.com/feed/" 
          target="_blank" 
          className="hover:text-purple-400 transition"
        >
          GitHub
        </a>

        <a 
          href="https://www.instagram.com/YOUR_INSTA" 
          target="_blank" 
          className="hover:text-pink-400 transition"
        >
          Instagram
        </a>

        <a 
          href="www.linkedin.com/in/anujrajmish" 
          target="_blank" 
          className="hover:text-blue-400 transition"
        >
          LinkedIn
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
