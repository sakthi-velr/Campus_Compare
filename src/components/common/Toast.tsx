"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto w-full bg-white rounded-xl shadow-lg border border-slate-100 p-4 flex items-start space-x-3 overflow-hidden"
          >
            {toast.type === "success" && (
              <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            )}
            {toast.type === "error" && (
              <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            )}
            {toast.type === "info" && (
              <Info className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
            )}
            
            <div className="flex-1 text-sm font-medium text-slate-800 break-words pr-2">
              {toast.message}
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition shrink-0 p-0.5 rounded-full hover:bg-slate-50 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
