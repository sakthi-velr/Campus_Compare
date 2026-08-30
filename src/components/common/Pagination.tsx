import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className={cn("flex justify-center items-center space-x-1 sm:space-x-2 mt-8", className)}
      aria-label="Pagination Navigation"
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3"
      >
        <ChevronLeft className="h-4 w-4 mr-1 shrink-0" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {/* Page Numbers */}
      {pages.map((p) => {
        const isActive = p === currentPage;
        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "h-9 w-9 text-sm font-semibold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isActive
                ? "bg-primary text-white hover:bg-indigo-700 shadow-sm"
                : "border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            {p}
          </button>
        );
      })}

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4 ml-1 shrink-0" />
      </Button>
    </nav>
  );
};
