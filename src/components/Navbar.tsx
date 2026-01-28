"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Sword, Menu, X, Flame, Sparkles, Rocket, Zap } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home", icon: Rocket, requiresAuth: false },
  { href: "/games", label: "Games", icon: Sword, requiresAuth: false },
  { href: "/news", label: "News", icon: Flame, requiresAuth: false },
  { href: "/favorites", label: "Favorites", icon: Sparkles, requiresAuth: true },
  { href: "/about", label: "About", icon: Zap, requiresAuth: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group">
            <span className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-purple-300 transition-all duration-300">
                Next
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300">
                Play
              </span>
              <span className="text-pink-500 group-hover:text-pink-400 transition-colors animate-pulse">_</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks
              .filter((link) => !link.requiresAuth || isSignedIn)
              .map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                      isActive
                        ? "bg-purple-600/20 text-purple-400"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoaded && !isSignedIn && (
              <>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/25">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            )}
            {isLoaded && isSignedIn && (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 ring-2 ring-purple-500/50"
                  }
                }}
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-500/20">
            <div className="flex flex-col gap-2">
              {navLinks
                .filter((link) => !link.requiresAuth || isSignedIn)
                .map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={clsx(
                        "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200",
                        isActive
                          ? "bg-purple-600/20 text-purple-400"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  );
                })}
              
              {isLoaded && !isSignedIn && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-purple-500/20">
                  <SignInButton mode="modal">
                    <button className="flex-1 px-4 py-2 text-gray-300 hover:text-white font-medium border border-gray-700 rounded-lg transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              )}
              
              {isLoaded && isSignedIn && (
                <div className="mt-4 pt-4 border-t border-purple-500/20 flex justify-center">
                  <UserButton />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
