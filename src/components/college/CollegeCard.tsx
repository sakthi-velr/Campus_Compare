"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, BookmarkCheck, GitCompare, MapPin, IndianRupee, Briefcase, GraduationCap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { College } from "@/types/college";
import { formatCurrency, formatPackage } from "@/lib/utils";
import { Rating } from "../common/Rating";
import { Button } from "../common/Button";
import { useCompare } from "@/context/CompareContext";
import { useSaved } from "@/context/SavedContext";

interface CollegeCardProps {
  college: College;
  index?: number;
  hoverVariant?: "lift" | "border-focus";
}

export const CollegeCard: React.FC<CollegeCardProps> = ({ college, index, hoverVariant = "border-focus" }) => {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { toggleSave, isSaved } = useSaved();

  const isCompared = isInCompare(college.id);
  const saved = isSaved(college.id);

  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCompared) {
      removeFromCompare(college.id);
    } else {
      addToCompare(college);
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleSave(college.id, college.name);
  };

  const fallbackCover = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60";
  const imageSrc = imageError || !college.coverImage ? fallbackCover : college.coverImage;

  // Reusable hover values based on the card variant
  const containerClass = cn(
    "group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white h-full transition-all duration-300",
    hoverVariant === "lift"
      ? "border-slate-100 shadow-sm motion-safe:hover:-translate-y-1.5 hover:border-indigo-150 hover:shadow-md"
      : "border-slate-200/80 shadow-3xs hover:border-slate-350 hover:shadow-2xs"
  );

  const imageScaleClass = cn(
    "object-cover transition-transform duration-500",
    hoverVariant === "lift"
      ? "motion-safe:group-hover:scale-102"
      : "motion-safe:group-hover:scale-[1.025]"
  );

  const bookmarkScaleClass = hoverVariant === "lift" ? "hover:scale-105" : "hover:scale-108";

  return (
    <div className={containerClass}>
      
      {/* 1. College Image Container (16:9 Aspect Ratio) */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={imageSrc}
          alt={college.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className={cn(imageScaleClass, isImageLoading ? "blur-xs" : "blur-0")}
          priority={index !== undefined && index < 4}
          loading={index !== undefined && index < 4 ? undefined : "lazy"}
          onLoad={() => setIsImageLoading(false)}
          onError={() => setImageError(true)}
        />
        
        {/* Pulsing Placeholder while loading */}
        {isImageLoading && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse" />
        )}
        
        {/* Subtle Dark Gradient Overlay for Location Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
        
        {/* Bookmark Button (Top Right) */}
        <button
          onClick={handleSaveClick}
          className={cn(
            "absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-xs text-slate-600 shadow-xs transition-all duration-200 hover:bg-white hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            bookmarkScaleClass
          )}
          title={saved ? "Saved" : "Save College"}
          aria-label={saved ? `Remove saved ${college.name}` : `Save ${college.name}`}
        >
          {saved ? (
            <BookmarkCheck className="h-4.5 w-4.5 fill-amber-500 text-amber-500" />
          ) : (
            <Bookmark className="h-4.5 w-4.5" />
          )}
        </button>

        {/* Location Overlay (Bottom Left) */}
        <div className="absolute bottom-3 left-4 z-10 flex items-center text-xs font-semibold text-white pointer-events-none">
          <MapPin className="mr-1 h-3.5 w-3.5 shrink-0 text-indigo-300" />
          <span className="truncate">{college.city}, {college.state}</span>
        </div>
      </div>

      {/* 2. College Info Body */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between space-y-4">
        
        <div className="space-y-4 flex-1">
          {/* Category & Rating Row (Highlight on rating area hover) */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            <span className="text-2xs font-extrabold tracking-wider uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md shrink-0 select-none">
              {college.collegeType}
            </span>
            <div className="group/rating hover:bg-slate-50/85 px-1.5 py-0.5 rounded-lg transition-colors duration-150 cursor-help" title="Student ratings">
              <Rating 
                value={college.rating} 
                showText={true} 
                className="scale-90 origin-right shrink-0 transition-opacity group-hover/rating:opacity-90" 
              />
            </div>
          </div>

          {/* College Name (Fixed height to keep cards aligned) */}
          <div className="h-12 flex items-center">
            <h3 className="text-base font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-250">
              <Link href={`/colleges/${college.slug}`} title={college.name}>
                {college.name}
              </Link>
            </h3>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Stats Matrix (Base Fees vs Avg Package - subtle value emphasis on hover) */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Fees */}
            <div className="group/stat flex items-center space-x-1.5 sm:space-x-2.5 min-w-0 cursor-default">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-600 shrink-0 transition-colors duration-200 group-hover/stat:bg-emerald-50/40">
                <IndianRupee className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <p className="text-3xs font-semibold text-slate-400 uppercase tracking-wider transition-opacity duration-200 group-hover/stat:opacity-100">Base Fees</p>
                <p className="text-xs font-bold text-slate-700 transition-transform duration-200 group-hover/stat:-translate-y-0.25">{formatCurrency(college.annualFees)}/Yr</p>
              </div>
            </div>

            {/* Placement */}
            <div className="group/stat flex items-center space-x-1.5 sm:space-x-2.5 min-w-0 cursor-default">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-600 shrink-0 transition-colors duration-200 group-hover/stat:bg-indigo-50/40">
                <Briefcase className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <p className="text-3xs font-semibold text-slate-400 uppercase tracking-wider transition-opacity duration-200 group-hover/stat:opacity-100">Avg Package</p>
                <p className="text-xs font-bold text-slate-700 transition-transform duration-200 group-hover/stat:-translate-y-0.25">{formatPackage(college.averagePackage)}</p>
              </div>
            </div>
          </div>

          {/* Popular Course (Pill hover transition) */}
          <div className="flex items-start gap-2 pt-1.5 min-h-[2.5rem]">
            <GraduationCap className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
            <div className="flex flex-wrap items-center gap-1 min-w-0">
              <span className="text-xs text-slate-500 font-medium select-none">Popular:</span>
              <span className="inline-block text-3xs px-2 py-0.5 rounded font-semibold bg-indigo-50/70 text-indigo-700 border border-indigo-100/30 max-w-full break-words whitespace-normal transition-all duration-200 hover:scale-102 hover:bg-indigo-50 hover:border-indigo-200 select-none">
                {college.popularCourse}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Action Buttons (Compare & View Details aligned at bottom) */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2 mt-auto">
          <button
            onClick={handleCompareClick}
            aria-label={`Compare ${college.name}`}
            className={`flex-1 inline-flex items-center justify-center text-xs font-bold px-3 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:-translate-y-0.25 ${
              isCompared
                ? "bg-indigo-50 border-indigo-200 text-primary hover:bg-indigo-100"
                : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-350"
            }`}
          >
            <GitCompare className={`h-3.5 w-3.5 mr-1.5 shrink-0 ${isCompared ? "animate-pulse text-indigo-600" : ""}`} />
            {isCompared ? "Added" : "Compare"}
          </button>
          
          <Link href={`/colleges/${college.slug}`} className="flex-1 block w-full">
            <Button
              variant="primary"
              size="sm"
              className="w-full font-bold justify-center focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 group/btn hover:-translate-y-0.5 hover:shadow-xs"
              rightIcon={<ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.75" />}
            >
              View Details
            </Button>
          </Link>
        </div>

      </div>

    </div>
  );
};
