"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { PostFormValues, postSchema } from "@/lib/validations/post";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
import "react-quill/dist/quill.snow.css";
interface PostFormProps {
  initialData?: PostFormValues;
  postId?: string;
}
interface User {
  id: string;
  name: string;
}
export function PostForm({ initialData, postId }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      description: "",
      image: "",
      content: "",
      authorId: "",
    },
  });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load authors");
      }
    };

    fetchUsers();
  }, []);
  async function onSubmit(values: PostFormValues) {
    try {
      setIsLoading(true);
      const response = await fetch(
        postId ? `/api/posts/${postId}` : "/api/posts",
        {
          method: postId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save post");
      }

      toast.success(postId ? "Post updated" : "Post created");
      router.push("/admin/posts");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          ["link", "image", "formula", "video"],
          [{ align: [] }],
          [{ color: [] }],
          [{ font: [] }],
          ["code-block"],
          ["clean"],
        ],
      },
    }),
    []
  );
  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "align",
    "color",
    "code-block",
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <div className="bg-background">
                  <ReactQuill
                    id="quill-editor"
                    value={field.value}
                    onChange={field.onChange}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an author" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users?.map((user) => (
                    <SelectItem key={user?.id} value={user?.id}>
                      {user?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {postId ? "Update" : "Create"} Post
        </Button>
      </form>
    </Form>
  );
}
