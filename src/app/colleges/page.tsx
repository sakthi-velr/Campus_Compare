"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown, Trash2, X } from "lucide-react";
import { fetchColleges } from "@/lib/api";
import { College, FilterState, SortOption } from "@/types/college";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { FilterChip } from "@/components/search/FilterChip";
import { SortDropdown } from "@/components/search/SortDropdown";
import { CollegeGrid } from "@/components/college/CollegeGrid";
import { CollegeCardSkeleton } from "@/components/common/Skeleton";
import { Pagination } from "@/components/common/Pagination";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Button } from "@/components/common/Button";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

function CollegesListContent() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const searchParams = useSearchParams();

  // Loading, Error, and Success states
  const [colleges, setColleges] = useState<College[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [retryTrigger, setRetryTrigger] = useState(0);

  // 1. Read filter parameters from the URL
  const querySearch = searchParams.get("search") || "";
  const queryLocation = searchParams.get("location") ? searchParams.get("location")!.split(",") : [];
  const queryCourse = searchParams.get("course") ? searchParams.get("course")!.split(",") : [];
  const queryType = searchParams.get("type") ? searchParams.get("type")!.split(",") : [];
  const queryOwnership = searchParams.get("ownership") ? searchParams.get("ownership")!.split(",") : [];
  const queryFeesMax = searchParams.get("feesMax") ? Number(searchParams.get("feesMax")) : 500000;
  const queryRatingMin = searchParams.get("ratingMin") ? Number(searchParams.get("ratingMin")) : 0;
  const querySortBy = (searchParams.get("sortBy") as SortOption) || "relevance";
  const queryPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // Active filters object
  const currentFilters: FilterState = {
    search: querySearch,
    location: queryLocation,
    course: queryCourse,
    type: queryType,
    ownership: queryOwnership,
    feesMax: queryFeesMax,
    ratingMin: queryRatingMin
  };

  // 2. Fetch database records when parameters or retry changes
  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setIsError(false);

    fetchColleges({
      filters: currentFilters,
      sortBy: querySortBy,
      page: queryPage,
      limit: 12 // Display exactly 12 colleges per page
    })
      .then((res) => {
        if (active) {
          setColleges(res.colleges);
          setTotalCount(res.total);
          setTotalPages(res.totalPages);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("API error fetching colleges:", err);
        if (active) {
          setIsError(true);
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [searchParams, retryTrigger]);

  // 3. Update url parameters
  const updateUrl = (updatedFilters: Partial<FilterState>, updatedSort?: SortOption, updatedPage?: number) => {
    const params = new URLSearchParams();

    const searchVal = updatedFilters.search !== undefined ? updatedFilters.search : querySearch;
    if (searchVal) params.set("search", searchVal);

    const locVal = updatedFilters.location !== undefined ? updatedFilters.location : queryLocation;
    if (locVal.length > 0) params.set("location", locVal.join(","));

    const courseVal = updatedFilters.course !== undefined ? updatedFilters.course : queryCourse;
    if (courseVal.length > 0) params.set("course", courseVal.join(","));

    const typeVal = updatedFilters.type !== undefined ? updatedFilters.type : queryType;
    if (typeVal.length > 0) params.set("type", typeVal.join(","));

    const ownershipVal = updatedFilters.ownership !== undefined ? updatedFilters.ownership : queryOwnership;
    if (ownershipVal.length > 0) params.set("ownership", ownershipVal.join(","));

    const feesVal = updatedFilters.feesMax !== undefined ? updatedFilters.feesMax : queryFeesMax;
    if (feesVal < 500000) params.set("feesMax", String(feesVal));

    const ratingVal = updatedFilters.ratingMin !== undefined ? updatedFilters.ratingMin : queryRatingMin;
    if (ratingVal > 0) params.set("ratingMin", String(ratingVal));

    const sortVal = updatedSort !== undefined ? updatedSort : querySortBy;
    if (sortVal !== "relevance") params.set("sortBy", sortVal);

    const pageVal = updatedPage !== undefined ? updatedPage : 1;
    if (pageVal > 1) params.set("page", String(pageVal));

    router.push(`/colleges?${params.toString()}`);
  };

  const handleSearchChange = (val: string) => {
    updateUrl({ search: val });
  };

  const handleFilterChange = (newFilters: FilterState) => {
    updateUrl(newFilters);
  };

  const handleClearFilters = () => {
    router.push("/colleges");
    setIsMobileDrawerOpen(false);
  };

  const handleSortChange = (newSort: SortOption) => {
    updateUrl({}, newSort);
  };

  const handlePageChange = (newPage: number) => {
    updateUrl({}, undefined, newPage);
  };

  const handleRetry = () => {
    setRetryTrigger((prev) => prev + 1);
  };

  // Compile active filter chips
  const filterChips: { label: string; onRemove: () => void }[] = [];

  queryLocation.forEach((loc) => {
    filterChips.push({
      label: loc,
      onRemove: () => updateUrl({ location: queryLocation.filter((l) => l !== loc) })
    });
  });

  queryType.forEach((t) => {
    filterChips.push({
      label: t,
      onRemove: () => updateUrl({ type: queryType.filter((item) => item !== t) })
    });
  });

  queryOwnership.forEach((o) => {
    filterChips.push({
      label: o,
      onRemove: () => updateUrl({ ownership: queryOwnership.filter((item) => item !== o) })
    });
  });

  if (queryFeesMax < 500000) {
    filterChips.push({
      label: `Fees ≤ ₹${queryFeesMax / 100000}L`,
      onRemove: () => updateUrl({ feesMax: 500000 })
    });
  }

  if (queryRatingMin > 0) {
    filterChips.push({
      label: `Rating ${queryRatingMin}+`,
      onRemove: () => updateUrl({ ratingMin: 0 })
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      
      {/* Page Title & Search Bar */}
      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-2xl font-black text-slate-800 tracking-tight sm:text-3xl"
        >
          Find Your College
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <SearchBar
            value={querySearch}
            onChange={handleSearchChange}
            placeholder="Search by college name, course, city, or state..."
            isLoading={isLoading && querySearch !== ""}
            className="w-full"
          />
        </motion.div>
      </div>

      {/* Grid Layout: Sidebar Filters + Cards Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Filter Sidebar - Desktop */}
        <motion.div 
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="hidden lg:block lg:col-span-1"
        >
          <FilterSidebar
            filters={currentFilters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
          />
        </motion.div>

        {/* Right Listing Section */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar: Mobile filters trigger, Sort selection, Count */}
          <div className="flex items-center justify-between bg-white border border-slate-100 p-4 rounded-2xl shadow-2xs gap-4">
            
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
              {filterChips.length > 0 && (
                <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-3xs font-bold">
                  {filterChips.length}
                </span>
              )}
            </button>

            <div className="text-xs sm:text-sm font-bold text-slate-500 whitespace-nowrap overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={isLoading ? "loading" : isError ? "error" : totalCount}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="inline-block"
                >
                  {isLoading
                    ? "Searching..."
                    : isError
                    ? "Error"
                    : `${totalCount} ${totalCount === 1 ? "college" : "colleges"} found`}
                </motion.span>
              </AnimatePresence>
            </div>

            <SortDropdown value={querySortBy} onChange={handleSortChange} />
          </div>

          {/* Active Chips */}
          {filterChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 select-none">Active:</span>
              <AnimatePresence>
                {filterChips.map((chip) => (
                  <FilterChip key={chip.label} label={chip.label} onRemove={chip.onRemove} />
                ))}
              </AnimatePresence>
              <button
                onClick={handleClearFilters}
                className="text-xs font-bold text-rose-500 hover:underline hover:text-rose-700 transition"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Cards Grid / Skeletons / Errors / Empty States */}
          {isLoading ? (
            /* LOADING STATE */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CollegeCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            /* ERROR STATE */
            <ErrorState
              title="Unable to load colleges"
              message="Please try again."
              onRetry={handleRetry}
            />
          ) : colleges.length > 0 ? (
            /* SUCCESS STATE */
            <div className="space-y-8">
              <CollegeGrid colleges={colleges} />
              <Pagination
                currentPage={queryPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            /* EMPTY STATE */
            <EmptyState
              title="No colleges found"
              message="Try changing your search or filters."
              actionText="Clear Filters"
              onActionClick={handleClearFilters}
            />
          )}

        </div>
      </div>

      {/* Mobile drawer modal */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs lg:hidden"
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white p-6 shadow-xl flex flex-col justify-between overflow-y-auto lg:hidden"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h2 className="text-base font-black text-slate-800">Choose Filters</h2>
                  <button
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <FilterSidebar
                  filters={currentFilters}
                  onChange={handleFilterChange}
                  onClear={handleClearFilters}
                />
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6">
                <Button
                  variant="primary"
                  className="w-full font-bold"
                  onClick={() => setIsMobileDrawerOpen(false)}
                >
                  Apply Filters ({totalCount})
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight sm:text-3xl">
          Find Your College
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-3xl h-[400px] animate-pulse" />
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CollegeCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    }>
      <CollegesListContent />
    </Suspense>
  );
}
