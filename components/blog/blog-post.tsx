import { Post } from "@prisma/client";
import { PostHeader } from "./post-header";
import { PostContent } from "./post-content";

interface BlogPostProps {
  post: Post & {
    author: {
      name: string;
    };
  };
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="space-y-6 text-black dark:text-white">
      <PostHeader title={post.title} image={post.image} />
      <PostContent
        content={post.content}
        author={post.author.name}
        createdAt={post.createdAt}
      />
    </article>
  );
}
