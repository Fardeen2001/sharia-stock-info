import { formatDate } from "@/lib/utils";

interface PostContentProps {
  content: string;
  author: string;
  createdAt: Date;
}

export function PostContent({ content, author, createdAt }: PostContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
        <p>By {author}</p>
        <span>•</span>
        <time dateTime={createdAt.toISOString()}>{formatDate(createdAt)}</time>
      </div>
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
