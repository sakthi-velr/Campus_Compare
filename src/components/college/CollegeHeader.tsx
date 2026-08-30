"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Bookmark, BookmarkCheck, GitCompare, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { College } from "@/types/college";
import { Rating } from "../common/Rating";
import { Button } from "../common/Button";
import { useCompare } from "@/context/CompareContext";
import { useSaved } from "@/context/SavedContext";

interface CollegeHeaderProps {
  college: College;
}

export const CollegeHeader: React.FC<CollegeHeaderProps> = ({ college }) => {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { toggleSave, isSaved } = useSaved();
  const shouldReduceMotion = useReducedMotion();

  const isCompared = isInCompare(college.id);
  const saved = isSaved(college.id);

  const handleCompareToggle = () => {
    if (isCompared) {
      removeFromCompare(college.id);
    } else {
      addToCompare(college);
    }
  };

  const handleSaveToggle = () => {
    toggleSave(college.id, college.name);
  };

  const bookmarkIconClass = "h-4.5 w-4.5 transition-transform duration-200 group-hover/save:scale-105";

  return (
    <div className="space-y-6">
      
      {/* 1. Breadcrumb navigation (Subtle fade, 250-350ms) */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider select-none"
      >
        <Link href="/" className="hover:text-slate-800 transition">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <Link href="/colleges" className="hover:text-slate-800 transition">
          Colleges
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-slate-800 font-extrabold truncate max-w-[180px] sm:max-w-xs">
          {college.name.split("(")[0].trim()}
        </span>
      </motion.nav> 
 
      {/* 2. Hero Header block */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative overflow-hidden">
        
        {/* Decorative background stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />

        {/* Logo and Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
          <motion.div 
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 border border-slate-200 text-slate-500 shadow-2xs overflow-hidden relative group/logo select-none"
          >
            {college.logo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={college.logo}
                alt={college.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover/logo:scale-[1.015]"
              />
            ) : (
              <span className="font-extrabold text-xl select-none transition-transform duration-300 group-hover/logo:scale-[1.015]">
                {college.name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </motion.div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <motion.span 
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="text-2xs font-extrabold uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded"
              >
                {college.collegeType}
              </motion.span>
              
              {/* Rating Pop-in */}
              <motion.div
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.3 }}
              >
                <Rating value={college.rating} count={college.reviewCount} />
              </motion.div>
            </div>
            
            {/* Title (Masked / Clip reveal style) */}
            <div className="overflow-hidden py-0.5">
              <motion.h1 
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="text-2xl font-black text-slate-800 tracking-tight sm:text-3xl"
              >
                {college.name}
              </motion.h1>
            </div>

            {/* Location (Horizontal slide, 350-450ms, with delay) */}
            <motion.div 
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex items-center justify-center sm:justify-start text-sm text-slate-500 font-semibold"
            >
              <MapPin className="h-4 w-4 text-indigo-500 mr-1.5 shrink-0" />
              <span>{college.city}, {college.state}</span>
            </motion.div>
          </div>
        </div>

        {/* Action Triggers (Upward reveal, delay, hover slide) */}
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="flex flex-row sm:flex-col gap-3 w-full md:w-auto shrink-0 justify-center sm:justify-start pt-4 md:pt-0 border-t md:border-t-0 border-slate-50"
        >
          <motion.button
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            onClick={handleCompareToggle}
            className={`flex-1 md:flex-none inline-flex items-center justify-center text-xs font-bold px-4 py-2.5 rounded-lg border transition-all duration-200 focus:outline-none hover:shadow-xs ${
              isCompared
                ? "bg-indigo-50 border-indigo-200 text-primary hover:bg-indigo-100"
                : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-350"
            }`}
          >
            <GitCompare className="h-4.5 w-4.5 mr-2 shrink-0" />
            <span>{isCompared ? "In Comparison" : "Add to Compare"}</span>
          </motion.button>

          <motion.div 
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            className="flex-1 md:flex-none group/save"
          >
            <Button
              variant={saved ? "outline" : "primary"}
              className={saved ? "border-amber-200 text-amber-600 bg-amber-50 hover:bg-amber-100 w-full" : "w-full"}
              leftIcon={saved ? <BookmarkCheck className={bookmarkIconClass} /> : <Bookmark className={bookmarkIconClass} />}
              onClick={handleSaveToggle}
            >
              <span>{saved ? "Saved" : "Save College"}</span>
            </Button>
          </motion.div>
        </motion.div>

      </div>

    </div>
  );
};
