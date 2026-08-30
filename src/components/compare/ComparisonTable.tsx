"use client";

import React from "react";
import Link from "next/link";
import { Trash2, Plus, MapPin, IndianRupee, Star, Briefcase, Award, TrendingUp, BookOpen, Shield } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { College } from "@/types/college";
import { formatCurrency, formatPackage } from "@/lib/utils";
import { Rating } from "../common/Rating";
import { Button } from "../common/Button";

interface ComparisonTableProps {
  colleges: College[];
  onRemove: (id: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ colleges, onRemove }) => {
  const shouldReduceMotion = useReducedMotion();
  const count = colleges.length;

  // Criteria to compare
  const criteria = [
    { key: "location", label: "Location", icon: <MapPin className="h-4 w-4" /> },
    { key: "fees", label: "Annual Fees", icon: <IndianRupee className="h-4 w-4 text-emerald-600" /> },
    { key: "rating", label: "Rating & Reviews", icon: <Star className="h-4 w-4 text-amber-500" /> },
    { key: "averagePlacement", label: "Average Placement", icon: <Briefcase className="h-4 w-4 text-indigo-600" /> },
    { key: "highestPlacement", label: "Highest Placement", icon: <Award className="h-4 w-4 text-violet-600" /> },
    { key: "placementRate", label: "Placement Rate", icon: <TrendingUp className="h-4 w-4 text-emerald-600" /> },
    { key: "popularCourse", label: "Popular Course", icon: <BookOpen className="h-4 w-4 text-blue-600" /> },
    { key: "type", label: "College Type", icon: <Shield className="h-4 w-4 text-slate-600" /> }
  ];

  const getCellValue = (college: College, key: string) => {
    switch (key) {
      case "location":
        return `${college.city}, ${college.state}`;
      case "fees":
        return `${formatCurrency(college.annualFees)} / Yr`;
      case "rating":
        return (
          <div className="flex flex-col items-center sm:items-start space-y-1">
            <Rating value={college.rating} showText={true} />
            <span className="text-2xs text-slate-500">({college.reviewCount} reviews)</span>
          </div>
        );
      case "averagePlacement":
        return formatPackage(college.averagePackage);
      case "highestPlacement":
        return formatPackage(college.highestPackage);
      case "placementRate":
        return `${college.placementRate}%`;
      case "popularCourse":
        return college.popularCourse;
      case "type":
        return college.collegeType;
      default:
        return "-";
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      
      {/* Scrollable Container for Mobile comparison (Horizontal native scroll) */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full table-fixed min-w-[700px] sm:min-w-0">
          
          {/* Table Header with College Banner, Info & Delete Button */}
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              
              {/* Category Column Header Label */}
              <th className="w-1/4 p-6 text-left text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Compare Criteria
              </th>

              {/* College Card Columns */}
              {Array.from({ length: 3 }).map((_, idx) => {
                const college = colleges[idx];
                return (
                  <th key={idx} className="w-1/4 p-6 text-center align-top relative border-l border-slate-100 transition-colors duration-200 hover:bg-slate-50/20">
                    {college ? (
                      <motion.div 
                        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col items-center space-y-4"
                      >
                        {/* Banner preview */}
                        <div className="relative h-20 w-full rounded-xl overflow-hidden bg-slate-100 hidden sm:block">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={college.coverImage}
                            alt={college.name}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-slate-900/10" />
                        </div>

                        {/* College Info */}
                        <div className="space-y-1">
                          <Link
                            href={`/colleges/${college.slug}`}
                            className="text-sm font-bold text-slate-800 hover:text-primary transition line-clamp-2"
                          >
                            {college.name}
                          </Link>
                          <span className="text-3xs font-extrabold uppercase text-slate-400">
                            {college.collegeType}
                          </span>
                        </div>

                        {/* Remove Action */}
                        <button
                          onClick={() => onRemove(college.id)}
                          className="inline-flex items-center text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-all duration-150 hover:scale-105 active:scale-95 group/remove"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1 transition-transform duration-150 group-hover/remove:scale-110 opacity-90 group-hover/remove:opacity-100" />
                          Remove
                        </button>
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-4 transition-all duration-200 hover:border-indigo-350 hover:bg-indigo-50/20 hover:-translate-y-0.5 cursor-pointer">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-2">
                          <Plus className="h-5 w-5" />
                        </div>
                        <p className="text-2xs font-bold text-slate-400 text-center mb-3">Add college slot</p>
                        <Link href="/colleges">
                          <Button variant="outline" size="sm" className="scale-90 font-bold">
                            Select College
                          </Button>
                        </Link>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body comparing features (Row-by-Row Staggered reveal) */}
          <tbody>
            {criteria.map((item, rowIdx) => (
              <motion.tr
                key={item.key}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: rowIdx * 0.04 }}
                className={`border-b border-slate-50 hover:bg-indigo-50/15 transition-colors duration-150 ${
                  rowIdx % 2 === 1 ? "bg-slate-50/10" : ""
                }`}
              >
                {/* Header Label Column */}
                <td className="p-4 sm:p-5 text-sm font-bold text-slate-700">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <span className="shrink-0 text-slate-400">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </td>

                {/* Values columns */}
                {Array.from({ length: 3 }).map((_, colIdx) => {
                  const college = colleges[colIdx];
                  return (
                    <td
                      key={colIdx}
                      className="p-4 sm:p-5 text-center sm:text-left text-sm text-slate-600 border-l border-slate-50 align-middle font-medium"
                    >
                      {college ? (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="flex justify-center sm:justify-start transition-all duration-150 hover:text-indigo-750 hover:font-bold cursor-default"
                        >
                          {getCellValue(college, item.key)}
                        </motion.div>
                      ) : (
                        <span className="text-slate-300 font-light">-</span>
                      )}
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};
