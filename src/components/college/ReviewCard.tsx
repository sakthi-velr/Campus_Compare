"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Rating } from "../common/Rating";
import { Review } from "@/types/college";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4,
        staggerChildren: shouldReduceMotion ? 0 : 0.08
      } 
    }
  };

  const avatarVariants = {
    hidden: { 
      scale: shouldReduceMotion ? 1 : 0.9, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.3 } 
    }
  };

  const ratingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      whileHover={shouldReduceMotion ? {} : { y: -2 }}
      viewport={{ once: true, margin: "-40px" }}
      variants={containerVariants}
      className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 shadow-3xs hover:shadow-2xs transition-all duration-200 cursor-default group/review"
    >
      
      {/* Reviewer Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            variants={avatarVariants}
            src={review.avatar}
            alt={review.author}
            className="h-9 w-9 rounded-full object-cover border border-slate-100 shadow-3xs transition-transform duration-200 group-hover/review:scale-103"
          />
          <div>
            <h4 className="text-sm font-bold text-slate-800 leading-tight">
              {review.author}
            </h4>
            <span className="text-3xs font-extrabold uppercase text-slate-400">
              Verified Student
            </span>
          </div>
        </div>
        <span className="text-3xs font-medium text-slate-400">
          {new Date(review.date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric"
          })}
        </span>
      </div>

      {/* Review Rating */}
      <motion.div variants={ratingVariants}>
        <Rating value={review.rating} showText={true} />
      </motion.div>

      {/* Review Description */}
      <motion.p 
        variants={textVariants}
        className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium"
      >
        &ldquo;{review.text}&rdquo;
      </motion.p>

    </motion.div>
  );
};
