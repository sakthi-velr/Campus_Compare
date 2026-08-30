import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { generateVirtualCourses, generateVirtualReviews } from "@/lib/api";
import { formatCurrency, formatPackage } from "@/lib/utils";
import { CollegeHeader } from "@/components/college/CollegeHeader";
import { CollegeStats } from "@/components/college/CollegeStats";
import { CollegeDetailsGrid } from "@/components/college/CollegeDetailsGrid";
import { ErrorState } from "@/components/common/ErrorState";
import { Button } from "@/components/common/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate dynamic SEO metadata matching the requested college slug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const college = await prisma.college.findUnique({
    where: { slug }
  });
  
  if (!college) {
    return {
      title: "College Not Found - CampusCompare",
      description: "We couldn't load the college information."
    };
  }

  return {
    title: `${college.name} - Placements, Fees, Courses & Reviews | CampusCompare`,
    description: `Explore detailed information about ${college.name} located in ${college.city}, ${college.state}. Check average salary packages, annual fees, eligibility criteria, and reviews.`
  };
}

export default async function CollegeDetailsPage({ params }: Props) {
  const { slug } = await params;
  
  const college = await prisma.college.findUnique({
    where: { slug }
  });

  if (!college) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <ErrorState
          title="College details unavailable"
          message="We couldn't load the college information. The college slug may be incorrect or missing."
          onRetry={undefined}
        />
        <div className="text-center mt-6">
          <Link href="/colleges">
            <Button variant="outline">Back to College Finder</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Inject virtual courses and reviews
  const courses = generateVirtualCourses(college.collegeType, college.annualFees);
  const reviews = generateVirtualReviews(college.name, college.rating);

  const collegeWithVirtuals = {
    ...college,
    courses,
    reviews
  };

  // Fetch related colleges using city and type matching
  const relatedColleges = await prisma.college.findMany({
    where: {
      id: { not: college.id },
      OR: [
        { city: { equals: college.city } },
        { collegeType: { equals: college.collegeType } }
      ]
    },
    take: 3
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* 1. Header with Breadcrumbs, Logo, Title & client Save/Compare buttons */}
      <CollegeHeader college={collegeWithVirtuals} />

      {/* 2. Key Stats Matrix (4 columns) */}
      <CollegeStats college={collegeWithVirtuals} />

      {/* 3. Main Grid layout: Content (2/3 width) vs Recommendations Sidebar (1/3 width) with viewport animations */}
      <CollegeDetailsGrid college={collegeWithVirtuals} relatedColleges={relatedColleges} />

    </div>
  );
}
