import { formatDate } from "@/lib/utils";
import ReactHtmlParser from "react-html-parser";

interface PostContentProps {
  content: string;
  author: string;
  createdAt: Date;
}

export function PostContent({ content, author, createdAt }: PostContentProps) {
  const transformContent = (node: any, index: number) => {
    if (node.type === "tag") {
      switch (node.name) {
        case "p":
          return (
            <p key={index} className="mb-4">
              {node.children.map((child: any, i: number) =>
                transformContent(child, i)
              )}
            </p>
          );
        case "h1":
          return (
            <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
              {node.children.map((child: any, i: number) =>
                transformContent(child, i)
              )}
            </h1>
          );
        case "h2":
          return (
            <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
              {node.children.map((child: any, i: number) =>
                transformContent(child, i)
              )}
            </h2>
          );
        case "h3":
          return (
            <h3 key={index} className="text-xl font-medium mt-4 mb-2">
              {node.children.map((child: any, i: number) =>
                transformContent(child, i)
              )}
            </h3>
          );
        case "ul":
          return (
            <ul key={index} className="list-disc pl-6 mb-4">
              {node.children.map((child: any, i: number) =>
                transformContent(child, i)
              )}
            </ul>
          );
        case "ol":
          return (
            <ol key={index} className="list-decimal pl-6 mb-4">
              {node.children.map((child: any, i: number) =>
                transformContent(child, i)
              )}
            </ol>
          );
        case "li":
          return (
            <li key={index} className="mb-2">
              {node.children.map((child: any, i: number) =>
                transformContent(child, i)
              )}
            </li>
          );
        case "a":
          return (
            <a
              key={index}
              href={node.attribs.href}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {node.children.map((child: any, i: number) =>
                transformContent(child, i)
              )}
            </a>
          );
        case "strong":
          return (
            <strong key={index} className="font-semibold">
              {node.children.map((child: any, i: number) =>
                transformContent(child, i)
              )}
            </strong>
          );
        case "em":
          return (
            <em key={index} className="italic">
              {node.children.map((child: any, i: number) =>
                transformContent(child, i)
              )}
            </em>
          );
        case "blockquote":
          return (
            <blockquote
              key={index}
              className="border-l-4 border-gray-300 pl-4 italic my-4"
            >
              {node.children.map((child: any, i: number) =>
                transformContent(child, i)
              )}
            </blockquote>
          );
        case "pre":
          return (
            <pre
              key={index}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4"
            >
              {node.children.map((child: any, i: number) =>
                transformContent(child, i)
              )}
            </pre>
          );
        case "code":
          return (
            <code
              key={index}
              className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md"
            >
              {node.children.map((child: any, i: number) =>
                transformContent(child, i)
              )}
            </code>
          );
        default:
          return null;
      }
    }
    return node.data;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
        <p>By {author}</p>
        <span>•</span>
        <time dateTime={createdAt.toISOString()}>{formatDate(createdAt)}</time>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        {ReactHtmlParser(content, { transform: transformContent })}
      </div>
    </div>
  );
}
