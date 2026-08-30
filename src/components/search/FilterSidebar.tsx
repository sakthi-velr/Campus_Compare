"use client";

import React from "react";
import { Star, MapPin, IndianRupee, BookOpen, Shield, RotateCcw } from "lucide-react";
import { FilterState } from "@/types/college";
import { formatCurrency } from "@/lib/utils";
import { Rating } from "../common/Rating";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onClear,
  className
}) => {
  const locations = ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Vellore"];
  const collegeTypes = ["Engineering", "Arts & Science", "Medical", "Management"];
  const ownerships = ["Government", "Government Aided", "Private"];
  const ratings = [4, 3, 2];

  const handleLocationChange = (loc: string) => {
    const active = filters.location.includes(loc);
    const updated = active
      ? filters.location.filter((l) => l !== loc)
      : [...filters.location, loc];
    onChange({ ...filters, location: updated });
  };

  const handleTypeChange = (typeVal: string) => {
    const active = filters.type.includes(typeVal);
    const updated = active
      ? filters.type.filter((t) => t !== typeVal)
      : [...filters.type, typeVal];
    onChange({ ...filters, type: updated });
  };

  const handleOwnershipChange = (ownerVal: string) => {
    const active = filters.ownership.includes(ownerVal);
    const updated = active
      ? filters.ownership.filter((o) => o !== ownerVal)
      : [...filters.ownership, ownerVal];
    onChange({ ...filters, ownership: updated });
  };

  const handleFeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, feesMax: Number(e.target.value) });
  };

  const handleRatingChange = (val: number) => {
    const updated = filters.ratingMin === val ? 0 : val;
    onChange({ ...filters, ratingMin: updated });
  };

  const isAnyFilterActive =
    filters.location.length > 0 ||
    filters.type.length > 0 ||
    filters.ownership.length > 0 ||
    filters.ratingMin > 0 ||
    filters.feesMax < 500000;

  return (
    <div className={className}>
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-800">Filters</h2>
          {isAnyFilterActive && (
            <button
              onClick={onClear}
              className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Clear All
            </button>
          )}
        </div>

        {/* Location Filter */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-slate-700">
            <MapPin className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-bold">Location</h3>
          </div>
          <div className="space-y-1.5">
            {locations.map((loc) => {
              const checked = filters.location.includes(loc);
              return (
                <label 
                  key={loc} 
                  className="flex items-center space-x-2.5 text-sm text-slate-600 cursor-pointer select-none py-1 px-1.5 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-colors duration-150 group/opt"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleLocationChange(loc)}
                    className="h-4 w-4 rounded border-slate-350 text-indigo-650 focus:ring-indigo-500 cursor-pointer transition-colors duration-150"
                  />
                  <span className={`transition-transform duration-150 group-hover/opt:translate-x-0.5 ${checked ? "font-bold text-slate-850" : ""}`}>
                    {loc}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* College Type Filter */}
        <div className="space-y-3 border-t border-slate-50 pt-5">
          <div className="flex items-center space-x-2 text-slate-700">
            <BookOpen className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-bold">College Type</h3>
          </div>
          <div className="space-y-1.5">
            {collegeTypes.map((t) => {
              const checked = filters.type.includes(t);
              return (
                <label 
                  key={t} 
                  className="flex items-center space-x-2.5 text-sm text-slate-600 cursor-pointer select-none py-1 px-1.5 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-colors duration-150 group/opt"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleTypeChange(t)}
                    className="h-4 w-4 rounded border-slate-350 text-indigo-650 focus:ring-indigo-500 cursor-pointer transition-colors duration-150"
                  />
                  <span className={`transition-transform duration-150 group-hover/opt:translate-x-0.5 ${checked ? "font-bold text-slate-850" : ""}`}>
                    {t}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Ownership Filter */}
        <div className="space-y-3 border-t border-slate-50 pt-5">
          <div className="flex items-center space-x-2 text-slate-700">
            <Shield className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-bold">Ownership</h3>
          </div>
          <div className="space-y-1.5">
            {ownerships.map((o) => {
              const checked = filters.ownership.includes(o);
              return (
                <label 
                  key={o} 
                  className="flex items-center space-x-2.5 text-sm text-slate-600 cursor-pointer select-none py-1 px-1.5 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-colors duration-150 group/opt"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleOwnershipChange(o)}
                    className="h-4 w-4 rounded border-slate-350 text-indigo-650 focus:ring-indigo-500 cursor-pointer transition-colors duration-150"
                  />
                  <span className={`transition-transform duration-150 group-hover/opt:translate-x-0.5 ${checked ? "font-bold text-slate-850" : ""}`}>
                    {o}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Fees Range Filter */}
        <div className="space-y-3 border-t border-slate-50 pt-5">
          <div className="flex items-center justify-between text-slate-700">
            <div className="flex items-center space-x-2">
              <IndianRupee className="h-4 w-4 text-slate-400" />
              <h3 className="text-sm font-bold">Max Fees</h3>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              {formatCurrency(filters.feesMax)}
            </span>
          </div>
          <div className="space-y-1">
            <input
              type="range"
              min="15000"
              max="500000"
              step="10000"
              value={filters.feesMax}
              onChange={handleFeesChange}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-3xs font-medium text-slate-400">
              <span>₹15K</span>
              <span>₹5L</span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="space-y-3 border-t border-slate-50 pt-5">
          <div className="flex items-center space-x-2 text-slate-700">
            <Star className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-bold">Rating</h3>
          </div>
          <div className="flex flex-col space-y-2">
            {ratings.map((val) => {
              const checked = filters.ratingMin === val;
              return (
                <button
                  key={val}
                  onClick={() => handleRatingChange(val)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-left border text-sm transition-all focus:outline-none group/opt ${
                    checked
                      ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-bold"
                      : "border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center space-x-1.5 transition-transform duration-150 group-hover/opt:translate-x-0.5">
                    <Rating value={val} showText={false} />
                    <span>{val}+</span>
                  </div>
                  {checked && <div className="h-2 w-2 rounded-full bg-primary" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
