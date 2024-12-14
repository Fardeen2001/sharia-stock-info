import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.postId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const post = await prisma.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: json.title,
        slug: json.slug,
        description: json.description,
        content: json.content,
        image: json.image,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.post.delete({
      where: {
        id: params.postId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
