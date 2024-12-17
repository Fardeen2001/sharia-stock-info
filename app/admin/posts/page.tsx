"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AdminPostCard } from "@/components/admin/posts/post-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Plus } from "lucide-react";
import { usePosts } from "@/hooks/use-posts";

export default function AdminPostsPage() {
  const router = useRouter();
  const { posts, isLoading, deletePost } = usePosts();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Posts</h1>
          <Button asChild>
            <Link href="/admin/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <AdminPostCard
              key={post?.id}
              post={post}
              onDelete={() => deletePost(post?.id)}
              onEdit={() => router.push(`/admin/posts/${post?.id}/edit`)}
            />
          ))}
        </div>

        {posts?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
