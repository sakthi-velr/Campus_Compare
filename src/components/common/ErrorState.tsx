import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "We couldn't load the college information.",
  onRetry,
  retryText = "Try Again"
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-rose-50/50 border border-rose-100 rounded-3xl min-h-[300px]">
      <div className="bg-rose-100 p-3 rounded-full mb-4">
        <AlertCircle className="h-8 w-8 text-rose-600" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary" className="bg-rose-600 hover:bg-rose-700 shadow-rose-200">
          {retryText}
        </Button>
      )}
    </div>
  );
};
