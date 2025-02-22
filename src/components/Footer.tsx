"use client";

import React from "react";
import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full border-t border-border bg-background">
      <div className="container mx-auto py-4 px-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-text-primary">
              © 2025 MultiFourms. All rights reserved.
            </p>
            <a
              href="https://www.instagram.com/zenstreet.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary hover:text-gray-300 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/zenstreet.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary hover:text-gray-300 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
