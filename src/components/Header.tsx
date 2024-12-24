"use client";

import React from "react";
import { Menu } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 border-b border-border header-gradient">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between relative">
          {/* Empty div to help with centering */}
          <div className="w-[40px]" />

          {/* Centered title */}
          <h1 className="text-2xl font-bold text-white absolute left-1/2 -translate-x-1/2">
            ZenStreet.ai
          </h1>

          {/* Right-aligned toggle with more padding */}
          <div className="flex items-end pr-2 sm:pr-4">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
