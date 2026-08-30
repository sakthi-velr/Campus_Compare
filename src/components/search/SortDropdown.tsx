import React from "react";
import { ArrowUpDown } from "lucide-react";
import { SortOption } from "@/types/college";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const options = [
    { value: "relevance", label: "Relevance" },
    { value: "rating-desc", label: "Rating: High to Low" },
    { value: "fees-asc", label: "Fees: Low to High" },
    { value: "fees-desc", label: "Fees: High to Low" },
    { value: "placement-desc", label: "Placement: High to Low" }
  ];

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort-select" className="hidden sm:inline-block text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
        Sort By
      </label>
      <div className="relative">
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none bg-white border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
          <ArrowUpDown className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
};
