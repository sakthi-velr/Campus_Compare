import React from "react";
import { BookOpen, Calendar, IndianRupee, ClipboardCheck } from "lucide-react";
import { Course } from "@/types/college";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "../common/Badge";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 p-5 space-y-4 hover:border-indigo-200 transition-all duration-200 shadow-2xs motion-safe:hover:-translate-y-0.75 hover:shadow-xs cursor-default">
      {/* Course Name Header */}
      <div className="flex items-start space-x-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-primary shrink-0 mt-0.5">
          <BookOpen className="h-4.5 w-4.5" />
        </div>
        <h4 className="text-sm sm:text-base font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors duration-200">
          {course.name}
        </h4>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-50 text-xs text-slate-600 font-medium transition-opacity duration-200 group-hover:opacity-85">
        {/* Duration */}
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
          <div>
            <p className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider">Duration</p>
            <p className="text-xs font-bold text-slate-700">{course.duration}</p>
          </div>
        </div>

        {/* Fees */}
        <div className="flex items-center space-x-2">
          <IndianRupee className="h-4 w-4 text-slate-400 shrink-0" />
          <div>
            <p className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider">Annual Fees</p>
            <p className="text-xs font-bold text-slate-700">{formatCurrency(course.fees)}</p>
          </div>
        </div>
      </div>

      {/* Eligibility */}
      <div className="bg-slate-50 rounded-xl p-3 flex items-start space-x-2.5 text-xs text-slate-600 font-medium">
        <ClipboardCheck className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider">Eligibility criteria</p>
          <p className="text-xs font-semibold text-slate-700 mt-0.5">{course.eligibility}</p>
        </div>
      </div>

    </div>
  );
};
