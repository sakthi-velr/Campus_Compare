"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
  rotatingPlaceholders?: string[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search colleges, courses or locations...",
  isLoading = false,
  className,
  rotatingPlaceholders
}) => {
  const [localValue, setLocalValue] = useState(value);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [fadeState, setFadeState] = useState(true); // true = visible, false = hidden
  const [isFocused, setIsFocused] = useState(false);

  // Keep local value synced with parent value (e.g. on clear all)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setLocalValue(newVal);

    // Setup debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onChange(newVal);
    }, 450);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  };

  // Rotating placeholder effect
  useEffect(() => {
    if (!rotatingPlaceholders || rotatingPlaceholders.length === 0 || localValue || isFocused) {
      return;
    }

    const interval = setInterval(() => {
      // Fade out
      setFadeState(false);
      
      // Wait 300ms for fade out transition, change text, then fade in
      const timer = setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % rotatingPlaceholders.length);
        setFadeState(true);
      }, 300);

      return () => clearTimeout(timer);
    }, 3500);

    return () => clearInterval(interval);
  }, [rotatingPlaceholders, localValue, isFocused]);

  const showPlaceholder = rotatingPlaceholders && rotatingPlaceholders.length > 0 && !localValue && !isFocused;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 z-10">
        {isLoading ? (
          <Loader2 className="h-5 w-5 text-indigo-500 animate-spin" />
        ) : (
          <Search className="h-5 w-5 text-slate-400" />
        )}
      </div>
      
      <div className="relative w-full flex items-center">
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={rotatingPlaceholders ? "" : placeholder}
          className="block w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-10 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm transition-all hover:border-slate-300 hover:shadow-md focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100/50"
        />

        {showPlaceholder && (
          <div 
            className={cn(
              "pointer-events-none absolute left-11 text-sm font-medium text-slate-400 transition-opacity duration-300 select-none",
              fadeState ? "opacity-100" : "opacity-0"
            )}
          >
            {rotatingPlaceholders[placeholderIndex]}
          </div>
        )}
      </div>

      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition z-10"
          title="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
