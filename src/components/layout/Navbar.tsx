"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bookmark, School, Home, GraduationCap, GitCompare, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

import { useCompare } from "@/context/CompareContext";
import { useSaved } from "@/context/SavedContext";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { compareColleges } = useCompare();
  const { savedCollegeIds } = useSaved();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Colleges", href: "/colleges", icon: GraduationCap },
    { name: "Compare", href: "/compare", icon: GitCompare },
    { name: "About", href: "/about", icon: Compass }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-md shadow-indigo-100 transition-transform duration-200 group-hover:scale-105">
                <School className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">
                Campus<span className="text-primary font-extrabold">Compare</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center h-full">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative group py-2.5 px-0.5 text-sm font-bold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center",
                    isActive
                      ? "text-primary"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <span>{item.name}</span>
                  
                  {/* Underline Reveal element */}
                  <span className={cn(
                    "absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-200",
                    isActive 
                      ? "w-full" 
                      : "w-0 group-hover:w-full"
                  )} />

                  {item.name === "Compare" && compareColleges.length > 0 && (
                    <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-2xs font-extrabold rounded-full bg-primary text-white scale-90">
                      {compareColleges.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-4">
            {savedCollegeIds.length > 0 && (
              <Link
                href="/colleges?saved=true"
                className="p-2 text-slate-500 hover:text-slate-800 transition-all duration-200 hover:scale-105 relative"
                title="Saved Colleges"
              >
                <Bookmark className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              </Link>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-opacity duration-200 active:opacity-75 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white shadow-lg animate-in fade-in slide-in-from-top-4 duration-200" id="mobile-menu">
          <div className="space-y-1 px-4 py-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-lg text-base font-semibold",
                    isActive
                      ? "text-primary bg-indigo-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <item.icon className="h-5 w-5 text-indigo-500 mr-1" />
                      <span>{item.name}</span>
                    </div>
                    {item.name === "Compare" && compareColleges.length > 0 && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-primary text-white">
                        {compareColleges.length}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
            <div className="border-t border-slate-100 pt-4 pb-2 flex flex-col space-y-2">
              {savedCollegeIds.length > 0 && (
                <Link
                  href="/colleges?saved=true"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-slate-900"
                >
                  <Bookmark className="h-5 w-5 text-amber-500" />
                  <span>Saved Colleges ({savedCollegeIds.length})</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
