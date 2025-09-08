import { UserType } from "./user.types";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface AuthorProfileCardProps {
  author: UserType;
}
export interface PostActionsProps {
  post: Post;
}

export interface PostContentProps {
  post: Post;
  isEditing: boolean;
  editedPost: Post | null;
  onInputChange: (field: keyof Post, value: string | number) => void;
}
export interface PostHeaderProps {
  post: Post;
  author: UserType | null;
  isEditing: boolean;
  editedPost: Post | null;
  onInputChange: (field: keyof Post, value: string | number) => void;
}

export interface RelatedPostsProps {
  posts: Post[];
  author: UserType | null;
}