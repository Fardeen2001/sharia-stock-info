import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { BlogPost } from "@/components/blog/blog-post";
import { LatestPosts } from "@/components/blog/latest-posts";

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!post) {
    notFound();
  }

  return {
    ...post,
    author: {
      name: post.author?.name || "Anonymous",
    },
  };
}

async function getLatestPosts(currentSlug: string) {
  return await prisma.post.findMany({
    where: {
      slug: {
        not: currentSlug,
      },
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      slug: true,
      image: true,
      createdAt: true,
    },
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  const latestPosts = await getLatestPosts(slug);

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <BlogPost post={post} />
          </div>
          <div>
            <LatestPosts posts={latestPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}
