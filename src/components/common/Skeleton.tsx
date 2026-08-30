import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={cn("animate-pulse bg-slate-200 rounded-lg", className)} />
  );
};

export const CollegeCardSkeleton: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm p-0 h-full">
      {/* Banner Skeleton */}
      <div className="relative aspect-[16/9] w-full bg-slate-100 animate-pulse shrink-0" />
      
      {/* Body Skeleton */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-4 flex-1">
          {/* Category + Rating row */}
          <div className="flex justify-between items-center gap-2">
            <Skeleton className="h-5 w-20 rounded" />
            <Skeleton className="h-5 w-24 rounded" />
          </div>

          {/* Title */}
          <div className="h-12 flex items-center">
            <Skeleton className="h-6 w-3/4 rounded" />
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-2 w-10" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-2 w-10" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>

          {/* Popular Course */}
          <div className="flex items-center space-x-2 pt-1 min-h-[2.5rem]">
            <Skeleton className="h-4 w-4 rounded-full shrink-0" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-5 w-24 rounded" />
          </div>
        </div>

        {/* Action Triggers */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 mt-auto">
          <Skeleton className="h-9 rounded-lg" />
          <Skeleton className="h-9 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const DetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <Skeleton className="h-4 w-48" />

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6">
        <Skeleton className="h-24 w-24 rounded-2xl shrink-0 mx-auto md:mx-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-5 w-1/4" />
        </div>
        <div className="flex flex-row md:flex-col gap-3 justify-center">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export const CompareTableSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 space-y-6">
      <div className="flex space-x-6">
        <div className="w-1/4" />
        <Skeleton className="h-40 w-1/4 rounded-2xl" />
        <Skeleton className="h-40 w-1/4 rounded-2xl" />
        <Skeleton className="h-40 w-1/4 rounded-2xl" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex space-x-6 items-center">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
};
