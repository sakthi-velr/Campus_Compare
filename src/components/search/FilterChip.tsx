"use client";

import React from "react";
import { X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, onRemove }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div 
      initial={{ scale: shouldReduceMotion ? 1 : 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: shouldReduceMotion ? 1 : 0.95, opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-semibold text-primary hover:bg-indigo-100/40 transition-colors duration-150"
    >
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:bg-indigo-150/40 p-0.5 rounded-full transition-all hover:scale-110 focus:outline-none opacity-80 hover:opacity-100"
        title={`Remove ${label}`}
      >
        <X className="h-3 w-3 text-indigo-500 hover:text-indigo-750" />
      </button>
    </motion.div>
  );
};
