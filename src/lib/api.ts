import { College, FilterState, SortOption, Course, Review } from "@/types/college";

// Helper to generate virtual courses based on college type
export function generateVirtualCourses(collegeType: string, baseFee: number): Course[] {
  const type = collegeType.toLowerCase();
  if (type.includes("management")) {
    return [
      { id: "m-1", name: "Master of Business Administration (MBA)", duration: "2 Years", fees: baseFee, eligibility: "Graduation with 50% + CAT/MAT/TANCET score" },
      { id: "m-2", name: "Post Graduate Diploma in Management (PGDM)", duration: "2 Years", fees: Math.round(baseFee * 1.15), eligibility: "Graduation with 50% + CAT/XAT score" }
    ];
  }
  if (type.includes("medical")) {
    return [
      { id: "md-1", name: "Bachelor of Medicine, Bachelor of Surgery (MBBS)", duration: "5.5 Years", fees: baseFee, eligibility: "10+2 with 50% PCB + NEET UG score" },
      { id: "md-2", name: "Doctor of Medicine (MD)", duration: "3 Years", fees: Math.round(baseFee * 1.4), eligibility: "MBBS degree + NEET PG score" }
    ];
  }
  if (type.includes("arts") || type.includes("science")) {
    return [
      { id: "as-1", name: "Bachelor of Science (B.Sc) Computer Science", duration: "3 Years", fees: baseFee, eligibility: "10+2 with Mathematics" },
      { id: "as-2", name: "Bachelor of Commerce (B.Com) Professional", duration: "3 Years", fees: Math.round(baseFee * 1.08), eligibility: "10+2 with Commerce & Accountancy" }
    ];
  }
  // Default to Engineering
  return [
    { id: "eng-1", name: "B.Tech Computer Science and Engineering", duration: "4 Years", fees: baseFee, eligibility: "10+2 with Physics, Chemistry & Math (JEE Main / TNEA)" },
    { id: "eng-2", name: "B.Tech Electronics and Communication", duration: "4 Years", fees: Math.round(baseFee * 0.95), eligibility: "10+2 with Physics, Chemistry & Math" },
    { id: "eng-3", name: "B.Tech Mechanical Engineering", duration: "4 Years", fees: Math.round(baseFee * 0.9), eligibility: "10+2 with Physics, Chemistry & Math" }
  ];
}

// Helper to generate virtual reviews based on rating
export function generateVirtualReviews(collegeName: string, rating: number): Review[] {
  const shortName = collegeName.split("(")[0].trim();
  return [
    {
      id: "rev-1",
      author: "Aravind Swamy",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      rating: Math.min(5, Math.ceil(rating)),
      text: `Outstanding environment at ${shortName}. The campus is very modern and placement cell is extremely supportive for engineering fields.`,
      date: "2026-02-15"
    },
    {
      id: "rev-2",
      author: "Meera Nair",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
      rating: Math.max(1, Math.floor(rating)),
      text: `Excellent learning opportunities and faculty support. Highly competitive peer groups but extremely rewarding overall.`,
      date: "2026-01-20"
    }
  ];
}

// Client-side cache for fetched colleges queries and details
const clientCollegesCache = new Map<string, any>();
const clientDetailsCache = new Map<string, College>();

export async function fetchColleges(options: {
  filters?: Partial<FilterState>;
  sortBy?: SortOption;
  page?: number;
  limit?: number;
} = {}): Promise<{ colleges: College[]; total: number; page: number; totalPages: number }> {
  try {
    const { filters = {}, sortBy = "relevance", page = 1, limit = 12 } = options;

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));

    if (filters.search) params.set("search", filters.search);
    if (filters.location && filters.location.length > 0) params.set("city", filters.location.join(","));
    if (filters.course && filters.course.length > 0) params.set("course", filters.course.join(","));
    if (filters.type && filters.type.length > 0) params.set("collegeType", filters.type.join(","));
    if (filters.ownership && filters.ownership.length > 0) params.set("ownership", filters.ownership.join(","));
    if (filters.feesMax && filters.feesMax < 500000) params.set("maxFees", String(filters.feesMax));
    if (filters.ratingMin && filters.ratingMin > 0) params.set("minRating", String(filters.ratingMin));
    
    // Sort mapping
    params.set("sort", sortBy);

    const cacheKey = params.toString();
    if (clientCollegesCache.has(cacheKey)) {
      return clientCollegesCache.get(cacheKey);
    }

    // Call local API route
    const res = await fetch(`/api/colleges?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch colleges: ${res.statusText}`);
    }

    const result = await res.json();
    const data = {
      colleges: result.data,
      total: result.pagination.total,
      page: result.pagination.page,
      totalPages: result.pagination.totalPages
    };
    
    clientCollegesCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("fetchColleges error:", error);
    throw error;
  }
}

// Client-side details fetcher (fallback or client components usage)
export async function fetchCollegeBySlug(slug: string): Promise<College | undefined> {
  try {
    if (clientDetailsCache.has(slug)) {
      return clientDetailsCache.get(slug);
    }

    const res = await fetch(`/api/colleges/${slug}`);
    if (!res.ok) {
      if (res.status === 404) return undefined;
      throw new Error(`Failed to fetch college: ${res.statusText}`);
    }
    const college: College = await res.json();
    
    // Attach dynamic virtual fields
    college.courses = generateVirtualCourses(college.collegeType, college.annualFees);
    college.reviews = generateVirtualReviews(college.name, college.rating);
    
    clientDetailsCache.set(slug, college);
    return college;
  } catch (error) {
    console.error("fetchCollegeBySlug error:", error);
    throw error;
  }
}

// Helper to find related colleges using API filters
export async function fetchRelatedColleges(college: College, limit = 3): Promise<College[]> {
  try {
    const params = new URLSearchParams();
    params.set("limit", String(limit + 1));
    params.set("city", college.city);
    params.set("collegeType", college.collegeType);

    const res = await fetch(`/api/colleges?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch related colleges: ${res.statusText}`);
    }
    const result = await res.json();
    const list: College[] = result.data;
    
    // Exclude current college and limit output
    return list.filter((c) => c.id !== college.id).slice(0, limit);
  } catch (error) {
    console.error("fetchRelatedColleges error:", error);
    return [];
  }
}
