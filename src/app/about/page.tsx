"use client";

import React from "react";
import Link from "next/link";
import { School, Compass, ShieldCheck, Mail, Phone, MapPin, Sparkles, Search, FileText, BarChart3, Laptop } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/common/Button";

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  // About introduction lines
  const introLines = [
    "CampusCompare is built as a complete college discovery and comparison platform.",
    "Our goal is to streamline the student journey from high school graduate to confident college applicant."
  ];

  // Alternating features list
  const features = [
    {
      title: "Smart Search",
      desc: "Find engineering or medical colleges with debounced keyword matching and rotating search prompts.",
      icon: <Search className="h-6 w-6 text-indigo-600" />
    },
    {
      title: "Detailed College Profiles",
      desc: "Verify verified student reviews, placements, and course breakdowns in one profile view.",
      icon: <FileText className="h-6 w-6 text-violet-600" />
    },
    {
      title: "Side-by-Side Comparison",
      desc: "Compare tuition fees, rankings, and average packages for up to 3 institutions simultaneously.",
      icon: <BarChart3 className="h-6 w-6 text-emerald-600" />
    },
    {
      title: "Responsive Experience",
      desc: "Browse, filter, and compare seamlessly on mobile, tablet, or high-definition screens.",
      icon: <Laptop className="h-6 w-6 text-blue-600" />
    }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-20 overflow-hidden">
      
      {/* 1. About Hero */}
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-primary mb-2 shadow-xs select-none"
        >
          <School className="h-6 w-6" />
        </motion.div>
        
        {/* Heading: Fade + scale text reveal */}
        <motion.h1 
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-black text-slate-800 tracking-tight sm:text-4xl select-none"
        >
          About CampusCompare
        </motion.h1>

        {/* Introduction: Fade + line reveal */}
        <div className="space-y-1.5 max-w-xl mx-auto">
          {introLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 + idx * 0.15 }}
              className="text-sm font-medium text-slate-500 leading-relaxed"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      {/* 2. Track & Project context (Mission left reveal + lift hover) */}
      <motion.div 
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        whileHover={shouldReduceMotion ? {} : { y: -3 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-2xs hover:border-slate-350 hover:shadow-2xs transition-all duration-300 space-y-6 cursor-default"
      >
        <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center space-x-2 select-none">
          <Sparkles className="h-5 w-5 text-primary shrink-0 animate-pulse" />
          <span>Project MVP Context</span>
        </h2>
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600"
        >
          <div className="space-y-3">
            <p className="leading-relaxed">
              <strong className="text-slate-800">Track:</strong> Track A &mdash; College Discovery Platform
            </p>
            <p className="leading-relaxed">
              <strong className="text-slate-800">Tagline:</strong> Discover. Compare. Choose with confidence.
            </p>
            <p className="leading-relaxed">
              This application has been developed to highlight front-end architectural principles, responsive table design, state synchronization with URL parameters, and accessibility best practices in Next.js and TailwindCSS.
            </p>
          </div>
          <div className="space-y-3">
            <p className="leading-relaxed">
              <strong className="text-slate-800">Key Achievements:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-500 font-medium">
              <li>Debounced Search query matching</li>
              <li>Live URL filtering (Location, Fees, Rating, Course, Type)</li>
              <li>Staggered Framer Motion grid updates</li>
              <li>Sticky 3-way compare drawer with limits checks</li>
              <li>Side-by-side comparative table with mobile scroll</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Alternating Feature Cards (Odd left slide, Even right slide + left/right side accents on hover) */}
      <div className="space-y-8">
        <h2 className="text-xl font-black text-slate-800 tracking-tight text-center select-none">
          Key Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, idx) => {
            const isOdd = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ 
                  opacity: 0, 
                  x: shouldReduceMotion ? 0 : (isOdd ? -15 : 15) 
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
                className="relative overflow-hidden group bg-white rounded-2xl border border-slate-100 p-6 space-y-4 hover:border-indigo-100 hover:shadow-xs transition duration-300 cursor-default"
              >
                {/* Left/Right Accent bars */}
                {isOdd ? (
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-indigo-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-all duration-250" />
                ) : (
                  <div className="absolute top-0 bottom-0 right-0 w-1 bg-indigo-500 rounded-r-2xl opacity-0 group-hover:opacity-100 transition-all duration-250" />
                )}

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-indigo-600 select-none">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800 transition-colors duration-200 group-hover:text-primary">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. Core Pillars (Icon transformation & card lift translateY(-2px)) */}
      <div className="space-y-8">
        <h2 className="text-xl font-black text-slate-800 tracking-tight text-center select-none">
          Our Core Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Discover Easily",
              desc: "Locate engineering and management branches using keyword and city matches without complex navigation.",
              icon: <Compass className="h-6 w-6 text-indigo-600" />
            },
            {
              title: "Compare Transparently",
              desc: "Evaluate annual fees and placements averages side-by-side using calculated highlights and summary notes.",
              icon: <School className="h-6 w-6 text-violet-600" />
            },
            {
              title: "Decide Confidently",
              desc: "Read reviews from real seniors and inspect accurate statistics to select your matching campus.",
              icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />
            }
          ].map((v, i) => (
            <motion.div 
              key={i} 
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              className="group bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-3xs hover:border-indigo-150 transition-all duration-200 cursor-default"
            >
              <motion.div 
                initial={{ scale: shouldReduceMotion ? 1 : 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.1 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-indigo-600 select-none transition-all duration-250 group-hover:bg-indigo-50 group-hover:scale-[1.06]"
              >
                {v.icon}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.1 + 0.15 }}
                className="space-y-2"
              >
                <h3 className="text-base font-bold text-slate-800 transition-colors duration-250 group-hover:text-primary">{v.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{v.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. Contact Section & Final CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
        
        {/* Split line reveal CTA */}
        <h2 className="text-xl font-black flex flex-wrap items-center justify-center gap-1.5 select-none">
          <motion.span
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Make your college decision
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-primary"
          >
            with confidence.
          </motion.span>
        </h2>

        {/* Description fade-up */}
        <motion.p 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-medium"
        >
          If you have questions regarding college rankings, placements calculations, or would like to submit college metadata, feel free to contact us.
        </motion.p>
        
        {/* Contact info list fade-in */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2 text-xs font-semibold text-slate-300"
        >
          <div className="flex items-center space-x-2">
            <Mail className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
            <span>support@campuscompare.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4.5 w-4.5 text-violet-400 shrink-0" />
            <span>+91 44 2235 7226</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
            <span>Chennai, India</span>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
