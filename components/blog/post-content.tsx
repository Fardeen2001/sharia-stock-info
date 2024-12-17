"use client";
import { formatDate } from "@/lib/utils";
import { useRef, useEffect } from "react";
interface PostContentProps {
  content: string;
  author: string;
  createdAt: Date;
}

export function PostContent({ content, author, createdAt }: PostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const elements = contentRef.current.getElementsByTagName("*");
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        switch (el.tagName.toLowerCase()) {
          case "p":
            el.classList.add("mb-4");
            break;
          case "h1":
            el.classList.add("text-3xl", "font-bold", "mt-8", "mb-4");
            break;
          case "h2":
            el.classList.add("text-2xl", "font-semibold", "mt-6", "mb-3");
            break;
          case "h3":
            el.classList.add("text-xl", "font-medium", "mt-4", "mb-2");
            break;
          case "ul":
            el.classList.add("list-disc", "pl-6", "mb-4");
            break;
          case "ol":
            el.classList.add("list-decimal", "pl-6", "mb-4");
            break;
          case "li":
            el.classList.add("mb-2");
            break;
          case "a":
            el.classList.add(
              "text-blue-600",
              "hover:underline",
              "dark:text-blue-400"
            );
            break;
          case "strong":
            el.classList.add("font-semibold");
            break;
          case "em":
            el.classList.add("italic");
            break;
          case "blockquote":
            el.classList.add(
              "border-l-4",
              "border-gray-300",
              "pl-4",
              "italic",
              "my-4"
            );
            break;
          case "pre":
            el.classList.add(
              "bg-gray-100",
              "dark:bg-gray-800",
              "p-4",
              "rounded-md",
              "overflow-x-auto",
              "my-4"
            );
            break;
          case "code":
            el.classList.add(
              "bg-gray-100",
              "dark:bg-gray-800",
              "px-2",
              "py-1",
              "rounded-md"
            );
            break;
        }
      }
    }
  }, [content]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
        <p>By {author}</p>
        <span>•</span>
        <time dateTime={createdAt.toISOString()}>{formatDate(createdAt)}</time>
      </div>
      <div
        ref={contentRef}
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
