import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Post } from "@prisma/client";

interface LatestPostsProps {
  posts: Pick<Post, "title" | "slug" | "description" | "image" | "createdAt">[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Latest Insights</h2>
          <p className="text-muted-foreground mt-2">
            Stay updated with our latest articles and analysis
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.description}
                </p>
                <Button variant="ghost" className="group" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    Read More
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}