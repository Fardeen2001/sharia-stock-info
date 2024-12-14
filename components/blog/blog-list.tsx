import { Post } from "@prisma/client";
import { PostPreview } from "./post-preview";

interface BlogListProps {
  posts: Array<
    Pick<Post, "title" | "slug" | "description" | "image" | "createdAt">
  >;
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostPreview key={post.slug} post={post} />
      ))}
    </div>
  );
}
