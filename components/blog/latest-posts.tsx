import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@prisma/client";

interface LatestPostsProps {
  posts: Pick<Post, "title" | "slug" | "image" | "createdAt">[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <div className="space-y-6">
      <CardHeader>
        <CardTitle>Latest Posts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post) => (
          <Card key={post.slug} className="overflow-hidden">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative h-32">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold line-clamp-2 hover:text-primary">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </Link>
          </Card>
        ))}
      </CardContent>
    </div>
  );
}
