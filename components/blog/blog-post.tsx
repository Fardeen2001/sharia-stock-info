import Image from "next/image";
import { formatDate } from "@/lib/utils";

interface BlogPostProps {
  post: any;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="space-y-6">
      <div className="relative h-[400px] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <p>By {post.author.name}</p>
          <span>•</span>
          <time dateTime={post.createdAt}>
            {formatDate(post.createdAt)}
          </time>
        </div>
      </div>
      
      <div className="prose dark:prose-invert max-w-none" 
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}