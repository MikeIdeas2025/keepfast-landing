"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 navbar bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-4 lg:px-8 shadow-sm">
      <div className="flex-1">
        <Logo />
      </div>

      <div className="flex-none">
        <nav className="hidden lg:flex items-center gap-8 mr-8">
          <Link 
            href="#features" 
            className="link link-hover font-medium text-gray-700 hover:text-brand-yellow transition-colors duration-200"
          >
            Features
          </Link>
          <Link 
            href="#how-it-works" 
            className="link link-hover font-medium text-gray-700 hover:text-brand-yellow transition-colors duration-200"
          >
            How It Works
          </Link>
          <Link 
            href="#pricing" 
            className="link link-hover font-medium text-gray-700 hover:text-brand-yellow transition-colors duration-200"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link 
            href="#waitlist" 
            className="btn btn-brand-yellow hidden sm:inline-flex"
          >
            Join Waitlist
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden btn btn-ghost btn-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-fadeIn">
          <nav className="flex flex-col p-4 gap-4">
            <Link
              href="#features"
              className="link link-hover font-medium text-gray-700 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="link link-hover font-medium text-gray-700 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="link link-hover font-medium text-gray-700 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#waitlist"
              className="btn btn-brand-yellow w-full mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Waitlist
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
