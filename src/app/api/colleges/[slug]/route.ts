import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const college = await prisma.college.findUnique({
      where: { slug }
    });

    if (!college) {
      return NextResponse.json(
        { error: "Not Found", message: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error("API Error fetching college by slug:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
