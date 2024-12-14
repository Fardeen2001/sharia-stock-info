import { Post, User } from "@prisma/client";

export interface PostWithAuthor extends Post {
  author: Pick<User, "name">;
}

export interface PostFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  authorId: string;
}
