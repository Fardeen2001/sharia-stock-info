"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";
import { PostForm } from "@/components/admin/posts/post-form";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";

export default function EditPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${params.postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load post");
        setIsLoading(false);
      });
  }, [params.postId]);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Post not found</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
          <PostForm
            initialData={{
              title: post.title,
              slug: post.slug,
              description: post.description,
              content: post.content,
              image: post.image,
              authorId: post.authorId,
            }}
            postId={post.id}
          />
        </Card>
      </div>
    </div>
  );
}
