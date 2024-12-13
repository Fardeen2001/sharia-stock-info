import Link from "next/link";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button className="w-full" asChild>
          <Link href="/admin/posts/new">Create New Post</Link>
        </Button>
        <Button className="w-full" variant="outline" asChild>
          <Link href="/admin/posts">Manage Posts</Link>
        </Button>
      </div>
    </div>
  );
}
