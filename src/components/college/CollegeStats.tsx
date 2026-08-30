"use client";

import React from "react";
import { IndianRupee, Briefcase, Award, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { College } from "@/types/college";
import { formatCurrency, formatPackage } from "@/lib/utils";

interface CollegeStatsProps {
  college: College;
}

export const CollegeStats: React.FC<CollegeStatsProps> = ({ college }) => {
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    {
      label: "Average Annual Fees",
      val: `${formatCurrency(college.annualFees)}`,
      sub: "Excluding hostel/mess charges",
      icon: <IndianRupee className="h-5 w-5 text-emerald-600" />,
      bg: "bg-emerald-50/50 border-emerald-100"
    },
    {
      label: "Average Placement",
      val: formatPackage(college.averagePackage),
      sub: "Median salary across all branches",
      icon: <Briefcase className="h-5 w-5 text-indigo-600" />,
      bg: "bg-indigo-50/50 border-indigo-100"
    },
    {
      label: "Highest Placement",
      val: formatPackage(college.highestPackage),
      sub: "Highest salary recorded this year",
      icon: <Award className="h-5 w-5 text-violet-600" />,
      bg: "bg-violet-50/50 border-violet-100"
    },
    {
      label: "Overall Rating",
      val: `${college.rating.toFixed(1)} / 5.0`,
      sub: `From ${college.reviewCount} verified reviews`,
      icon: <Star className="h-5 w-5 text-amber-400" />,
      bg: "bg-amber-50/50 border-amber-100"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.96, 
      y: shouldReduceMotion ? 0 : 8 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
    }
  };

  const valueVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 4 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.3, delay: 0.2 } 
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={cardVariants}
          whileHover={shouldReduceMotion ? {} : { y: -3 }}
          className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between bg-white shadow-2xs transition-all duration-200 hover:shadow-xs hover:border-slate-350 cursor-default ${stat.bg}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-3xs font-extrabold uppercase text-slate-400 tracking-wider">
              {stat.label}
            </span>
            <div className="p-1.5 rounded-lg bg-white shrink-0 shadow-3xs">
              {stat.icon}
            </div>
          </div>
          <div className="mt-3">
            <motion.p 
              variants={valueVariants}
              className="text-xl sm:text-2xl font-black text-slate-900 leading-none"
            >
              {stat.val}
            </motion.p>
            <p className="text-3xs text-slate-400 mt-1 font-semibold leading-relaxed">
              {stat.sub}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
