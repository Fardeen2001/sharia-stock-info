import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [postCount, stockCount, recentPosts] = await Promise.all([
      prisma.post.count(),
      prisma.stock.count(),
      prisma.post.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      postCount,
      stockCount,
      recentPosts,
    });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
