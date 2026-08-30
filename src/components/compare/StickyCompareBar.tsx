"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, GitCompare } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { Button } from "../common/Button";

export const StickyCompareBar: React.FC = () => {
  const { compareColleges, removeFromCompare, clearAllCompare } = useCompare();
  const count = compareColleges.length;

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl pb-safe-bottom"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Count & selected items */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center space-x-2 shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-primary">
                    <GitCompare className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">
                    {count} {count === 1 ? "college" : "colleges"} selected
                  </span>
                </div>

                {/* Badges for selected colleges */}
                <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {compareColleges.map((college) => (
                    <div
                      key={college.id}
                      className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-700"
                    >
                      <span className="truncate max-w-[120px] sm:max-w-[160px]">
                        {college.name.split("(")[0].trim()}
                      </span>
                      <button
                        onClick={() => removeFromCompare(college.id)}
                        className="text-slate-400 hover:text-slate-600 transition p-0.5 rounded-full hover:bg-slate-200/50"
                        title={`Remove ${college.name}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end space-x-4 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0">
                <button
                  onClick={clearAllCompare}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 transition"
                >
                  Clear All
                </button>
                <Link href="/compare">
                  <Button
                    variant="primary"
                    size="sm"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="w-full sm:w-auto shadow-indigo-100"
                  >
                    Compare Now
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
