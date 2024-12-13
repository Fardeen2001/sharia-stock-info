import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogListProps {
  posts: any[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Card key={post.slug} className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-muted-foreground mb-2">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {post.description}
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/blog/${post.slug}`}>Read More</Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}