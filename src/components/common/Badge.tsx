import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "neutral";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  children,
  className
}) => {
  const baseStyles = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide border";

  const variants = {
    primary: "bg-indigo-50 border-indigo-100 text-indigo-700",
    secondary: "bg-violet-50 border-violet-100 text-violet-700",
    success: "bg-emerald-50 border-emerald-100 text-emerald-700",
    warning: "bg-amber-50 border-amber-100 text-amber-700",
    neutral: "bg-slate-50 border-slate-200 text-slate-600"
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
};
