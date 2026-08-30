"use client";

import React, { useState, useEffect } from "react";
import { Award, IndianRupee, Star, Sparkles, TrendingUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { College } from "@/types/college";
import { formatCurrency, formatPackage } from "@/lib/utils";

interface ComparisonHighlightsProps {
  colleges: College[];
}

export const ComparisonHighlights: React.FC<ComparisonHighlightsProps> = ({ colleges }) => {
  const shouldReduceMotion = useReducedMotion();

  // Typewriter effect state
  const typewriterText = "See which college stands out for your priorities.";
  const [summaryText, setSummaryText] = useState("");

  useEffect(() => {
    if (shouldReduceMotion) {
      setSummaryText(typewriterText);
      return;
    }

    setSummaryText("");
    let index = 0;
    const interval = setInterval(() => {
      setSummaryText((prev) => prev + typewriterText.charAt(index));
      index++;
      if (index >= typewriterText.length) {
        clearInterval(interval);
      }
    }, 35); // ~35ms per character typewriter

    return () => clearInterval(interval);
  }, [colleges, shouldReduceMotion]);

  if (colleges.length < 2) return null;

  // Compute Highlights
  const highestRated = [...colleges].sort((a, b) => b.rating - a.rating)[0];
  const lowestFees = [...colleges].sort((a, b) => a.annualFees - b.annualFees)[0];
  const bestAvgPlacement = [...colleges].sort(
    (a, b) => b.averagePackage - a.averagePackage
  )[0];
  const highestIndividualPackage = [...colleges].sort(
    (a, b) => b.highestPackage - a.highestPackage
  )[0];

  const getSummaryTrait = (college: College) => {
    let traits = [];
    if (college.id === lowestFees.id) {
      traits.push("Best for affordability");
    }
    if (college.id === bestAvgPlacement.id) {
      traits.push("Best for placement & salary packages");
    } else if (college.id === highestIndividualPackage.id) {
      traits.push("Offers the highest individual package");
    }
    if (college.id === highestRated.id) {
      traits.push("Highest rated by students");
    }

    if (traits.length === 0) {
      if (college.ownership === "Government" || college.ownership === "Government Aided") {
        return "Reliable public institution offering balanced education";
      }
      return "Strong private alternative with robust infrastructure";
    }

    return traits.join(" & ");
  };

  const cards = [
    {
      title: "Highest Rated",
      college: highestRated.name.split("(")[0].trim(),
      val: `${highestRated.rating} / 5.0`,
      desc: `Based on reviews from ${highestRated.reviewCount} verified students.`,
      icon: <Star className="h-5 w-5 text-amber-500" />,
      bg: "bg-amber-50/50 border-amber-100 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:border-amber-250"
    },
    {
      title: "Lowest Fees",
      college: lowestFees.name.split("(")[0].trim(),
      val: `${formatCurrency(lowestFees.annualFees)} / Yr`,
      desc: "Ideal for student budget considerations.",
      icon: <IndianRupee className="h-5 w-5 text-emerald-600" />,
      bg: "bg-emerald-50/50 border-emerald-100 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:border-emerald-250"
    },
    {
      title: "Best Avg Placement",
      college: bestAvgPlacement.name.split("(")[0].trim(),
      val: formatPackage(bestAvgPlacement.averagePackage),
      desc: "Highest average salary returned for graduates.",
      icon: <TrendingUp className="h-5 w-5 text-indigo-600" />,
      bg: "bg-indigo-50/50 border-indigo-100 hover:shadow-[0_0_15px_rgba(79,70,229,0.15)] hover:border-indigo-250"
    },
    {
      title: "Highest Placement Peak",
      college: highestIndividualPackage.name.split("(")[0].trim(),
      val: formatPackage(highestIndividualPackage.highestPackage),
      desc: "Top package record achieved in the campus.",
      icon: <Award className="h-5 w-5 text-violet-600" />,
      bg: "bg-violet-50/50 border-violet-100 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:border-violet-250"
    }
  ];

  // Spotlight entry container
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
      scale: shouldReduceMotion ? 1 : 0.95 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" as const }
    }
  };

  // Stagger elements inside the card
  const labelVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const winnerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } }
  };

  const valVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.2 } }
  };

  return (
    <div className="space-y-6">
      
      {/* High-level visual highlight boxes */}
      <div>
        <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center space-x-1.5 select-none">
          <Sparkles className="h-5 w-5 text-primary shrink-0" />
          <span>Metric Leaders</span>
        </h3>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {cards.map((c, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              className={`rounded-2xl border p-4 space-y-3 bg-white transition-all duration-300 hover:shadow-xs group/card ${c.bg}`}
            >
              <div className="flex items-center justify-between">
                <motion.span variants={labelVariants} className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider">
                  {c.title}
                </motion.span>
                <div className="p-1 rounded-lg bg-white shrink-0 shadow-2xs">{c.icon}</div>
              </div>
              <div>
                <motion.h4 variants={winnerVariants} className="text-sm font-extrabold text-slate-800 truncate">
                  {c.college}
                </motion.h4>
                <motion.p variants={valVariants} className="text-lg font-black text-slate-900 mt-1 transition-colors duration-200 group-hover/card:text-primary">
                  {c.val}
                </motion.p>
                <p className="text-3xs text-slate-400 mt-1 leading-relaxed">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Comparison Summary Text Section */}
      <motion.div 
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.35 }}
        className="rounded-2xl border border-slate-100 bg-white p-5 space-y-3"
      >
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Comparison Summary
          </h3>
          <p className="text-xs text-slate-400 font-semibold h-4 select-none">
            {summaryText}
          </p>
        </div>
        <ul className="space-y-2 pt-2 border-t border-slate-50">
          {colleges.map((college, idx) => (
            <motion.li 
              key={college.id} 
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.5 + idx * 0.08 }}
              className="text-sm text-slate-600 flex items-start space-x-2"
            >
              <span className="text-primary mt-1 shrink-0 font-bold select-none">•</span>
              <div>
                <span className="font-bold text-slate-800">{college.name.split("(")[0].trim()}</span>
                {" — "}
                <span className="font-medium text-slate-600">{getSummaryTrait(college)}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

    </div>
  );
};
