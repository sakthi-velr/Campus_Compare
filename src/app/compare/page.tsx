"use client";

import React from "react";
import Link from "next/link";
import { GitCompare, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useCompare } from "@/context/CompareContext";
import { ComparisonTable } from "@/components/compare/ComparisonTable";
import { ComparisonHighlights } from "@/components/compare/ComparisonHighlights";
import { Button } from "@/components/common/Button";

export default function ComparePage() {
  const { compareColleges, removeFromCompare } = useCompare();
  const shouldReduceMotion = useReducedMotion();
  const count = compareColleges.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10 overflow-hidden">
      
      {/* 1. Header Information */}
      <div className="space-y-3">
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider select-none"
        >
          <GitCompare className="h-4.5 w-4.5" />
          <span>College Evaluation</span>
        </motion.div>
        
        {/* Split heading reveal */}
        <h1 className="text-3xl font-black text-slate-800 tracking-tight sm:text-4xl flex items-center gap-2 select-none">
          <motion.span
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block"
          >
            Compare
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block text-primary"
          >
            Colleges
          </motion.span>
        </h1>

        {/* Blur-to-clear / fade reveal description */}
        <motion.p 
          initial={{ 
            opacity: 0, 
            filter: shouldReduceMotion ? "none" : "blur(4px)" 
          }}
          animate={{ 
            opacity: 1, 
            filter: "blur(0px)" 
          }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="text-sm font-medium text-slate-500 max-w-xl leading-relaxed"
        >
          Evaluate fees, ratings, placements and location before making your decision. Compare up to 3 colleges side-by-side.
        </motion.p>
      </div>

      {/* 2. Main Comparison display */}
      {count >= 1 ? (
        <div className="space-y-10">
          
          {/* Active Comparison Matrix */}
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="text-base font-bold text-slate-800 uppercase tracking-wider select-none"
            >
              Comparison Table
            </motion.h2>
            
            <ComparisonTable
              colleges={compareColleges}
              onRemove={removeFromCompare}
            />
          </div>

          {/* Metrics highlights */}
          {count >= 2 ? (
            <ComparisonHighlights colleges={compareColleges} />
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-center text-xs text-indigo-700 font-semibold max-w-2xl mx-auto"
            >
              Please select at least 2 colleges to reveal metric highlights and comparison summary cards.
            </motion.div>
          )}

        </div>
      ) : (
        /* Empty State if no colleges are selected */
        <div className="flex flex-col items-center justify-center text-center p-12 bg-white border border-dashed border-slate-200 rounded-3xl min-h-[400px]">
          {/* One-time icon upward slide */}
          <motion.div 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-50 p-5 rounded-full mb-5 text-slate-400 select-none"
          >
            <GitCompare className="h-12 w-12" />
          </motion.div>
          
          {/* Soft fade-in heading */}
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-xl font-bold text-slate-800 mb-2"
          >
            Compare colleges to make your decision easier
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="text-sm text-slate-500 max-w-sm mb-8 leading-relaxed font-medium"
          >
            You need to select at least 2 colleges to run a side-by-side comparison. Browse the directory to get started.
          </motion.p>
          
          {/* Delayed button fade-in */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link href="/colleges">
              <Button variant="primary" rightIcon={<ChevronRight className="h-4.5 w-4.5" />}>
                Browse Colleges
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Go to Homepage</Button>
            </Link>
          </motion.div>
        </div>
      )}

    </div>
  );
}
