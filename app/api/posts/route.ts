import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { postSchema } from "@/lib/validations/post";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = postSchema.parse(json);

    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        content: body.content,
        image: body.image,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
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
    });

    return NextResponse.json(posts);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}