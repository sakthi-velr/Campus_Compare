"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Briefcase, ArrowUpRight, School } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { College, Course, Review } from "@/types/college";
import { formatCurrency, formatPackage } from "@/lib/utils";
import { CourseCard } from "./CourseCard";
import { ReviewCard } from "./ReviewCard";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

interface CollegeDetailsGridProps {
  college: College;
  relatedColleges: College[];
}

export const CollegeDetailsGrid: React.FC<CollegeDetailsGridProps> = ({ college, relatedColleges }) => {
  const shouldReduceMotion = useReducedMotion();

  const courses = college.courses || [];
  const reviews = college.reviews || [];

  // Courses staggered entrance
  const coursesContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07
      }
    }
  };

  const courseItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
    }
  };

  // Related colleges staggered scale + fade
  const relatedContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07
      }
    }
  };

  const relatedItemVariants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.97 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.4 } 
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* Left Column (Main details) */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* 1. Overview Section */}
        <motion.section 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45 }}
          className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-2xs space-y-4"
        >
          {/* Underline Reveal Heading */}
          <div className="border-b border-slate-100 pb-3 relative">
            <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase">
              Overview
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeInOut" as const, delay: 0.1 }}
              className="absolute bottom-0 left-0 h-[2px] bg-primary"
            />
          </div>
          <motion.p 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium"
          >
            {college.description}
          </motion.p>
        </motion.section>

        {/* 2. Courses Section */}
        <section className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-2xs space-y-5">
          {/* Horizontal Slide Reveal Heading */}
          <motion.h2 
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45 }}
            className="text-lg font-black text-slate-800 tracking-tight uppercase border-b border-slate-100 pb-3"
          >
            Courses &amp; Fees
          </motion.h2>
          
          <motion.div 
            variants={coursesContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {courses.map((course) => (
              <motion.div key={course.id} variants={courseItemVariants}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 3. Placements Section */}
        <motion.section 
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-2xs space-y-6"
        >
          <div className="border-b border-slate-100 pb-3 relative">
            <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase">
              Placement Statistics
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeInOut" as const, delay: 0.1 }}
              className="absolute bottom-0 left-0 h-[2px] bg-primary"
            />
          </div>
          
          {/* Visual metrics panel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Average Salary Package */}
            <div className="group/placement bg-indigo-50/30 border border-indigo-100/50 rounded-2xl p-4 flex flex-col justify-between hover:bg-indigo-50/50 hover:border-indigo-200 transition-colors duration-200 cursor-default">
              <span className="text-3xs font-extrabold uppercase text-indigo-700 tracking-wider">Average Package</span>
              <p className="text-2xl font-black text-slate-900 mt-2 transition-colors duration-250 group-hover/placement:text-indigo-650">{formatPackage(college.averagePackage)}</p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min((college.averagePackage / 30) * 100, 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.25 }}
                  className="bg-indigo-600 h-1.5 rounded-full"
                />
              </div>
              <span className="text-3xs text-slate-400 mt-1 font-medium">Calculated across all recruitments</span>
            </div>

            {/* Highest Salary Package */}
            <div className="group/placement bg-violet-50/30 border border-violet-100/50 rounded-2xl p-4 flex flex-col justify-between hover:bg-violet-50/50 hover:border-violet-200 transition-colors duration-200 cursor-default">
              <span className="text-3xs font-extrabold uppercase text-violet-700 tracking-wider">Highest Package</span>
              <p className="text-2xl font-black text-slate-900 mt-2 transition-colors duration-250 group-hover/placement:text-violet-650">{formatPackage(college.highestPackage)}</p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min((college.highestPackage / 80) * 100, 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.25 }}
                  className="bg-violet-600 h-1.5 rounded-full"
                />
              </div>
              <span className="text-3xs text-slate-400 mt-1 font-medium">Top individual offer made</span>
            </div>

            {/* Placement rate percentage */}
            <div className="group/placement bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-4 flex flex-col justify-between hover:bg-emerald-50/50 hover:border-emerald-200 transition-colors duration-200 cursor-default">
              <span className="text-3xs font-extrabold uppercase text-emerald-700 tracking-wider">Placement Rate</span>
              <p className="text-2xl font-black text-slate-900 mt-2 transition-colors duration-250 group-hover/placement:text-emerald-650">{college.placementRate}%</p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${college.placementRate}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.25 }}
                  className="bg-emerald-600 h-1.5 rounded-full"
                />
              </div>
              <span className="text-3xs text-slate-400 mt-1 font-medium">Percentage of opting students placed</span>
            </div>

          </div>
        </motion.section>

        {/* 4. Student Reviews */}
        <section className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-2xs space-y-5">
          <motion.h2 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45 }}
            className="text-lg font-black text-slate-800 tracking-tight uppercase border-b border-slate-100 pb-3"
          >
            Verified Student Reviews
          </motion.h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

      </div>

      {/* Right Column (Recommendations & Similar institutions) */}
      <motion.aside 
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="space-y-6"
      >
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-2xs space-y-5">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
            Similar Colleges
          </h3>
          
          <motion.div 
            variants={relatedContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {relatedColleges.map((rel) => (
              <motion.div
                key={rel.id}
                variants={relatedItemVariants}
                className="group block p-3.5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-slate-350 hover:bg-white hover:shadow-2xs transition-all duration-205"
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 font-extrabold text-xs select-none transition-transform duration-200 group-hover:scale-[1.025]">
                        {rel.name.slice(0, 2).toUpperCase()}
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-800 line-clamp-1 group-hover:text-primary transition-colors duration-200">
                        {rel.name.split("(")[0].trim()}
                      </h4>
                    </div>
                    <Badge variant="neutral" className="text-3xs scale-90 origin-right">
                      {rel.collegeType}
                    </Badge>
                  </div>

                  {/* Stats summary */}
                  <div className="flex justify-between items-center text-3xs font-semibold text-slate-500 pt-2 border-t border-slate-200/50">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 text-indigo-400 mr-0.5" />
                      {rel.city}
                    </span>
                    <span className="flex items-center">
                      <Briefcase className="h-3 w-3 text-indigo-400 mr-0.5" />
                      {formatPackage(rel.averagePackage)} Avg
                    </span>
                  </div>

                  {/* Action button */}
                  <Link href={`/colleges/${rel.slug}`} className="block w-full pt-1">
                    <Button variant="outline" size="sm" className="w-full font-bold text-xs py-1 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 group/btn">
                      View Details
                      <ArrowUpRight className="h-3 w-3 ml-1 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.75 group-hover/btn:-translate-y-0.75" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.aside>

    </div>
  );
};
