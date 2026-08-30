import React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  count?: number;
  className?: string;
  showText?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  count,
  className,
  showText = true
}) => {
  const stars = [];
  const floorValue = Math.floor(value);
  const hasHalf = value - floorValue >= 0.25 && value - floorValue < 0.75;
  const roundValue = value - floorValue >= 0.75 ? floorValue + 1 : floorValue;

  for (let i = 1; i <= max; i++) {
    if (i <= roundValue) {
      stars.push(
        <Star
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400"
          aria-hidden="true"
        />
      );
    } else if (i === floorValue + 1 && hasHalf) {
      stars.push(
        <StarHalf
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400"
          aria-hidden="true"
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className="h-4 w-4 text-slate-200"
          aria-hidden="true"
        />
      );
    }
  }

  return (
    <div className={cn("flex items-center space-x-1.5", className)}>
      <div className="flex items-center space-x-0.5">{stars}</div>
      {showText && (
        <span className="text-sm font-semibold text-slate-800">
          {value.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-xs text-slate-500">
          ({count} reviews)
        </span>
      )}
    </div>
  );
};
