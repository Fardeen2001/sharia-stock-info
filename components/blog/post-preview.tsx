import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Post } from "@prisma/client";

interface PostPreviewProps {
  post: Pick<Post, "title" | "slug" | "description" | "image" | "createdAt">;
}

export function PostPreview({ post }: PostPreviewProps) {
  return (
    <Card className="overflow-hidden">
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
          {formatDate(post.createdAt)}
        </p>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {post.description}
        </p>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/blog/${post.slug}`}>Read More</Link>
        </Button>
      </div>
    </Card>
  );
}
