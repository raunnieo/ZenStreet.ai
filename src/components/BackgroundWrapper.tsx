"use client";

import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
      {children}
    </div>
  );
};

export default BackgroundWrapper;
