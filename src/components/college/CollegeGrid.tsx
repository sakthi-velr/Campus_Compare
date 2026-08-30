"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { College } from "@/types/college";
import { CollegeCard } from "./CollegeCard";

interface CollegeGridProps {
  colleges: College[];
}

export const CollegeGrid: React.FC<CollegeGridProps> = ({ colleges }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 15 
    },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const, 
        stiffness: 120, 
        damping: 18 
      } 
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6"
    >
      {colleges.map((college, index) => (
        <motion.div 
          key={college.id} 
          variants={itemVariants}
          className="h-full w-full"
        >
          <CollegeCard college={college} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
};
