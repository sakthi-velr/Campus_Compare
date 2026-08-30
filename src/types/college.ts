export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: number;
  eligibility: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface College {
  id: string;
  name: string;
  slug: string;
  city: string;
  district: string;
  state: string;
  address: string;
  collegeType: string; // e.g. "Engineering", "Arts & Science", "Medical", "Management"
  ownership: string;   // e.g. "Government", "Government Aided", "Private"
  university: string;
  rating: number;
  reviewCount: number;
  annualFees: number;
  averagePackage: number;
  highestPackage: number;
  placementRate: number;
  popularCourse: string;
  description: string;
  logo: string;
  coverImage: string;
  officialWebsite: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  
  // Dynamically attached virtual fields for display
  courses?: Course[];
  reviews?: Review[];
}

export interface FilterState {
  location: string[];      // will match city
  feesMax: number;
  ratingMin: number;
  course: string[];        // will match popularCourse/collegeType
  type: string[];          // will match collegeType
  ownership: string[];     // will match ownership
  search: string;
}

export type SortOption = "relevance" | "rating-desc" | "fees-asc" | "fees-desc" | "placement-desc" | "name-asc";
