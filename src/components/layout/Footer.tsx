"use client";

import React from "react";
import Link from "next/link";
import { School } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const Footer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.footer 
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-md">
                <School className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Campus<span className="text-indigo-400 font-extrabold">Compare</span>
              </span>
            </Link>
            <p className="text-sm max-w-sm text-slate-400 leading-relaxed">
              Discover. Compare. Choose with confidence. Explore colleges, compare fees and placements, and make a smarter decision about your future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/colleges" className="hover:text-white transition">
                  Colleges
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition">
                  Compare
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  College Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Admission Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Placement Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-slate-500">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-400 transition">
              Terms of Service
            </a>
          </div>
          <div>
            <p>&copy; {new Date().getFullYear()} CampusCompare. All rights reserved.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
