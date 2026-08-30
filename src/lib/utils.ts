import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind className merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format fee amounts to standard Indian Rupee format or Lakhs (L)
export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(lakhs % 1 === 0 ? 0 : 1)}L`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

// Format packages to LPA (Lakhs Per Annum)
export function formatPackage(lpa: number): string {
  return `${lpa.toFixed(lpa % 1 === 0 ? 0 : 1)} LPA`;
}

// Debounce helper for search queries
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function (...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
