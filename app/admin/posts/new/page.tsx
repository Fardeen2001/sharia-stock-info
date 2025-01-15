"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
import "react-quill-new/dist/quill.snow.css";
// import Editor from "react-simple-wysiwyg";
import { firebaseConfig } from "@/lib/utils";
const formSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  content: z.string().min(1),
  authorId: z.string().min(1),
});
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, `gs://sharia-stock-info.appspot.com`);
const createUniqueFileName = (fileName: string) => {
  const timestame = Date.now();
  const randomString = Math.random().toString(36).substring(2, 12);
  return `${fileName}-${timestame}-${randomString}`;
};
interface User {
  id: string;
  name: string;
}
export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
  const imageSaveToFirebaseHandler = async (file: any) => {
    const extractUniqueFileName = createUniqueFileName(file?.name);
    const storageRef = ref(storage, `blog/${extractUniqueFileName}`);
    const uploadImage = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) =>
      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => reject(error),
        () => {
          getDownloadURL(uploadImage.snapshot.ref)
            .then((url) => resolve(url))
            .catch((error) => reject(error));
        }
      )
    );
  };
  const blogImageChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // console.log(event.target.files);
    if (!event.target.files) return;
    const saveImageTofireBase: any = await imageSaveToFirebaseHandler(
      event.target.files[0]
    );

    if (saveImageTofireBase !== "") {
      form.setValue("image", saveImageTofireBase);
    }
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      toast.success("Post created successfully");
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
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

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
                    <FormLabel>Meta Description</FormLabel>
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
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        name="image"
                        accept="image/**"
                        max={1000000}
                        onChange={blogImageChangeHandler}
                      />
                    </FormControl>
                    {field.value && (
                      <p className="text-sm text-green-600">
                        Image uploaded successfully
                      </p>
                    )}
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
                      <div>
                        {
                          <ReactQuill
                            id="quill-editor"
                            value={field.value}
                            onChange={field.onChange}
                            modules={quillModules}
                            formats={quillFormats}
                          />
                          // <Editor
                          //   id="wysiwyg-editor"
                          //   value={field.value}
                          //   onChange={field.onChange}
                          // />
                        }
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                Create Post
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
