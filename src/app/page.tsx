"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Compass, GitCompare, Landmark, Star, Briefcase, ChevronRight, CheckCircle2, GraduationCap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { fetchColleges } from "@/lib/api";
import { College } from "@/types/college";
import collegesData from "@/lib/colleges.json";
import { CollegeCard } from "@/components/college/CollegeCard";
import { SearchBar } from "@/components/search/SearchBar";
import { Button } from "@/components/common/Button";
import { CollegeCardSkeleton } from "@/components/common/Skeleton";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handlePopularSearch = (term: string) => {
    router.push(`/colleges?search=${encodeURIComponent(term)}`);
  };

  const popularSearches = [
    "Engineering",
    "Chennai",
    "Bangalore",
    "Coimbatore",
    "Computer Science",
    "MBA"
  ];

  const rotatingPlaceholders = [
    "Search colleges...",
    "Search by city...",
    "Search by state...",
    "Search by course...",
    "Try IIT Madras...",
    "Try Computer Science...",
    "Try Chennai..."
  ];

  const [featuredColleges] = useState<College[]>(() => (collegesData as College[]).slice(0, 6));
  const [isFeaturedLoading] = useState(false);

  // 1. Hero Main Headline Animation Details
  const headlineWords = [
    { text: "Find", highlight: false },
    { text: "the", highlight: false },
    { text: "right", highlight: true },
    { text: "college", highlight: true },
    { text: "for", highlight: false },
    { text: "your", highlight: false },
    { text: "future.", highlight: true, useGradient: true }
  ];

  const headlineContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 18 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 18
      }
    }
  };

  // 2. Hero Description Animation
  const descriptionVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 10 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        delay: 0.7 
      } 
    }
  };

  // 3. Search Box Animation
  const searchVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 8 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4, 
        delay: 1.05 
      } 
    }
  };

  // 4. Popular Searches Animations
  const popularContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: 1.2
      }
    }
  };

  const popularHeaderVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 8 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const chipVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 8 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  // 5. Featured Section Animations (slide in left-to-right)
  const featuredHeadingVariants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : -20 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const featuredDescVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 10 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, delay: 0.2 } 
    }
  };

  const cardGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07
      }
    }
  };

  const cardItemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 15 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
    }
  };

  // 6. Why Section Animations
  const whyBoxContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const whyBoxVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 15 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4 } 
    }
  };

  // 7. How It Works Animations (Discover -> Compare -> Decide)
  const stepsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15
      }
    }
  };

  const stepItemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 15 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 90, damping: 14 } 
    }
  };

  // 8. Final CTA Animations
  const ctaWords = "Make your college decision with confidence.".split(" ");

  const ctaContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.1
      }
    }
  };

  const ctaWordVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 12 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const ctaContentVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } }
  };

  return (
    <div className="flex flex-col space-y-20 pb-20 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 py-20 lg:py-28">
        
        {/* Background blobs for premium styling */}
        <div className="absolute top-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[300px] w-[300px] rounded-full bg-violet-200/20 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          
          {/* Tagline / micro badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-50 border border-indigo-100/50 px-3 py-1 text-xs font-bold text-indigo-700 select-none"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Discover. Compare. Choose with confidence.</span>
          </motion.div>

          {/* Heading */}
          <div className="max-w-3xl mx-auto space-y-4">
            <motion.h1 
              variants={headlineContainerVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl font-black tracking-tight text-slate-800 sm:text-5xl lg:text-6xl leading-[1.1] flex flex-wrap justify-center gap-x-2.5 gap-y-1"
            >
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className={
                    word.useGradient 
                      ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block"
                      : word.highlight
                        ? "text-primary inline-block"
                        : "inline-block"
                  }
                >
                  {word.text}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p 
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed max-w-xl mx-auto"
            >
              Explore colleges, compare fees and placements, and make a smarter decision about your education.
            </motion.p>
          </div>

          {/* Hero Search input */}
          <motion.div 
            variants={searchVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto"
          >
            <SearchBar
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                handleSearchSubmit(val);
              }}
              rotatingPlaceholders={rotatingPlaceholders}
            />
          </motion.div>

          {/* Popular searches chips */}
          <motion.div 
            variants={popularContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto"
          >
            <motion.span 
              variants={popularHeaderVariants}
              className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 select-none"
            >
              Popular:
            </motion.span>
            {popularSearches.map((term) => (
              <motion.button
                key={term}
                variants={chipVariants}
                whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePopularSearch(term)}
                className="text-xs font-semibold px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-full hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 hover:shadow-xs transition-colors duration-200"
              >
                {term}
              </motion.button>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 2. Featured Colleges */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <motion.h2 
                variants={featuredHeadingVariants}
                className="text-2xl font-black text-slate-800 tracking-tight sm:text-3xl"
              >
                Explore Top Colleges
              </motion.h2>
              <motion.p 
                variants={featuredDescVariants}
                className="text-sm font-medium text-slate-500"
              >
                Explore handpicked top-rated universities in engineering and business.
              </motion.p>
            </div>
            <Link href="/colleges">
              <Button variant="outline" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />} className="font-bold">
                View All Colleges
              </Button>
            </Link>
          </div>

          <motion.div 
            variants={cardGridVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {isFeaturedLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <CollegeCardSkeleton key={i} />
              ))
            ) : featuredColleges.length > 0 ? (
              featuredColleges.map((college) => (
                <motion.div key={college.id} variants={cardItemVariants} className="h-full">
                  <CollegeCard college={college} hoverVariant="lift" />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 font-medium py-10 bg-white border border-slate-100 rounded-3xl">
                No featured colleges found.
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* 3. Why CampusCompare Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl"
        >
          {/* Background accent */}
          <div className="absolute bottom-[-20%] right-[-10%] h-[300px] w-[300px] rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            
            <div className="space-y-5 lg:pr-8 border-b lg:border-b-0 lg:border-r border-slate-800 pb-8 lg:pb-0">
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Why CampusCompare?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                We empower students with clear, transparent, and verified data. No sponsored listings, no hidden algorithms. Just honest facts to guide your career path.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  "100% Verified Placements",
                  "Real Annual Fees Transparency",
                  "Reviews from Actual Students",
                  "Up-to-3 College Side-by-Side Matrix"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm text-slate-300 font-semibold">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div 
              variants={whyBoxContainerVariants}
              className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                {
                  title: "Compare Placements",
                  desc: "Check average vs highest packages and campus recruitment rates.",
                  icon: <Briefcase className="h-5 w-5 text-indigo-400" />
                },
                {
                  title: "Compare Fees",
                  desc: "Filter base tuition fees and manage budget expectations.",
                  icon: <Landmark className="h-5 w-5 text-violet-400" />
                },
                {
                  title: "Compare Ratings",
                  desc: "Read star breakdowns and qualitative feedback from seniors.",
                  icon: <Star className="h-5 w-5 text-amber-400" />
                },
                {
                  title: "Advanced Search",
                  desc: "Locate engineering branches and management courses in one search.",
                  icon: <GraduationCap className="h-5 w-5 text-emerald-400" />
                }
              ].map((box, i) => (
                <motion.div 
                  key={i} 
                  variants={whyBoxVariants}
                  className="bg-slate-850 border border-slate-800 rounded-2xl p-5 space-y-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300 mb-3 shrink-0">
                    {box.icon}
                  </div>
                  <h3 className="text-base font-bold text-white">{box.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">{box.desc}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* 4. How It Works Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight sm:text-3xl">
              How It Works
            </h2>
            <p className="text-sm font-medium text-slate-500">
              Three simple steps to finding and selecting your dream institution.
            </p>
          </div>

          <motion.div 
            variants={stepsContainerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "01",
                title: "Discover",
                desc: "Search colleges based on locations (Chennai, Bangalore, Coimbatore), courses, or tags.",
                icon: <Compass className="h-6 w-6 text-indigo-600" />
              },
              {
                step: "02",
                title: "Compare",
                desc: "Add 2 or 3 colleges to your comparison list and match tuition fees, placements, and ratings side-by-side.",
                icon: <GitCompare className="h-6 w-6 text-violet-600" />
              },
              {
                step: "03",
                title: "Decide",
                desc: "Evaluate mathematically calculated leaders, read detailed reviews, and choose with total confidence.",
                icon: <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={stepItemVariants}
                className="bg-white rounded-3xl border border-slate-100 shadow-2xs p-6 space-y-4 relative hover:shadow-xs transition"
              >
                <span className="absolute top-4 right-6 text-3xl font-black text-slate-100 select-none">
                  {item.step}
                </span>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-indigo-600 mb-2">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 5. Final CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="rounded-3xl bg-gradient-to-tr from-primary to-secondary p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-lg shadow-indigo-150"
        >
          {/* Background blobs */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/5 pointer-events-none" />
          
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <motion.h2 
              variants={ctaContainerVariants}
              className="text-2xl font-black sm:text-3xl tracking-tight leading-tight flex flex-wrap justify-center gap-x-2 gap-y-1"
            >
              {ctaWords.map((word, i) => (
                <motion.span 
                  key={i} 
                  variants={ctaWordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            
            <motion.p 
              variants={ctaContentVariants}
              className="text-sm font-medium text-indigo-100 leading-relaxed"
            >
              Explore our full directory of government, private, and autonomous colleges in India. Compare courses, placements, and fees.
            </motion.p>
            
            <motion.div 
              variants={ctaContentVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
            >
              <Link href="/colleges" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full bg-white text-primary border-white hover:bg-indigo-50 font-bold">
                  Browse All Colleges
                </Button>
              </Link>
              <Link href="/compare" className="w-full sm:w-auto">
                <Button className="w-full bg-indigo-850 hover:bg-slate-900 border-none font-bold text-white">
                  Compare Colleges
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
