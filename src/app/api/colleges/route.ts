import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // 1. Pagination Parameters
    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const limit = Math.max(1, Number(searchParams.get("limit") || "12"));
    const skip = (page - 1) * limit;

    // 2. Query Parameters
    const search = searchParams.get("search") || "";
    const state = searchParams.get("state") || "";
    const city = searchParams.get("city") || "";
    const course = searchParams.get("course") || "";
    const collegeType = searchParams.get("collegeType") || "";
    const ownership = searchParams.get("ownership") || "";
    const maxFees = searchParams.get("maxFees") ? Number(searchParams.get("maxFees")) : null;
    const minRating = searchParams.get("minRating") ? Number(searchParams.get("minRating")) : null;
    const sort = searchParams.get("sort") || "relevance";

    // 3. Build Prisma Where Inputs
    const whereClause: Prisma.CollegeWhereInput = {};
    const conditions: Prisma.CollegeWhereInput[] = [];

    // Search matches: name, popularCourse, city, state
    if (search.trim()) {
      const q = search.trim();
      conditions.push({
        OR: [
          { name: { contains: q } },
          { popularCourse: { contains: q } },
          { city: { contains: q } },
          { state: { contains: q } }
        ]
      });
    }

    if (state.trim()) {
      conditions.push({ state: { equals: state.trim() } });
    }

    if (city.trim()) {
      // Support comma-separated cities
      const cities = city.split(",").map((c) => c.trim()).filter(Boolean);
      if (cities.length > 0) {
        conditions.push({ city: { in: cities } });
      }
    }

    if (course.trim()) {
      // Support comma-separated courses
      const courses = course.split(",").map((c) => c.trim()).filter(Boolean);
      if (courses.length > 0) {
        conditions.push({
          OR: courses.map((c) => ({
            popularCourse: { contains: c }
          }))
        });
      }
    }

    if (collegeType.trim()) {
      const types = collegeType.split(",").map((t) => t.trim()).filter(Boolean);
      if (types.length > 0) {
        conditions.push({ collegeType: { in: types } });
      }
    }

    if (ownership.trim()) {
      const ownerships = ownership.split(",").map((o) => o.trim()).filter(Boolean);
      if (ownerships.length > 0) {
        conditions.push({ ownership: { in: ownerships } });
      }
    }

    if (maxFees !== null) {
      conditions.push({ annualFees: { lte: maxFees } });
    }

    if (minRating !== null) {
      conditions.push({ rating: { gte: minRating } });
    }

    if (conditions.length > 0) {
      whereClause.AND = conditions;
    }

    // 4. Build Prisma OrderBy Inputs
    let orderByClause: Prisma.CollegeOrderByWithRelationInput = { rating: "desc" };

    if (sort === "rating-desc") {
      orderByClause = { rating: "desc" };
    } else if (sort === "fees-asc") {
      orderByClause = { annualFees: "asc" };
    } else if (sort === "fees-desc") {
      orderByClause = { annualFees: "desc" };
    } else if (sort === "placement-desc") {
      orderByClause = { averagePackage: "desc" };
    } else if (sort === "name-asc") {
      orderByClause = { name: "asc" };
    } else {
      // relevance (rating desc, then reviewCount desc)
      orderByClause = { rating: "desc" };
    }

    // Relevance secondary ordering
    const orderByList: Prisma.CollegeOrderByWithRelationInput[] = [orderByClause];
    if (sort === "relevance" || sort === "rating-desc") {
      orderByList.push({ reviewCount: "desc" });
    }

    // 5. Query DB in Parallel
    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where: whereClause,
        orderBy: orderByList,
        skip,
        take: limit
      }),
      prisma.college.count({
        where: whereClause
      })
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: colleges,
      pagination: {
        page,
        limit,
        total,
        totalPages: totalPages === 0 ? 1 : totalPages
      }
    });
  } catch (error) {
    console.error("API Error fetching colleges:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
