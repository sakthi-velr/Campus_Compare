import React from "react";
import { Search } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No colleges found",
  message = "Try changing your search or filters.",
  icon = <Search className="h-12 w-12 text-slate-400" />,
  actionText,
  onActionClick
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white border border-dashed border-slate-200 rounded-3xl min-h-[300px]">
      <div className="bg-slate-50 p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{message}</p>
      {actionText && onActionClick && (
        <Button onClick={onActionClick} variant="outline" size="sm">
          {actionText}
        </Button>
      )}
    </div>
  );
};
