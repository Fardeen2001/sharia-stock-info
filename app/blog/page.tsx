import { prisma } from "@/lib/db";
import { BlogList } from "@/components/blog/blog-list";

async function getBlogs() {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc"
    },
    select: {
      title: true,
      slug: true,
      description: true,
      image: true,
      createdAt: true,
      author: {
        select: {
          name: true
        }
      }
    }
  });
}

export default async function BlogPage() {
  const posts = await getBlogs();
  
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <BlogList posts={posts} />
      </div>
    </div>
  );
}