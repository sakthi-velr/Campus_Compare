"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" as const }}
      className="flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}
