import { UserType } from './user.types';

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
export interface PostCardProps {
  post: Post;
  user: UserType | undefined;
  isExpanded: boolean;
  onToggleExpansion: (postId: number) => void;
  onDelete: (postId: number) => void;
  onEdit: (post: Post) => void;  // Bu satır eklenecek
}

export interface PostsGridProps {
  posts: Post[];
  users: UserType[];
  loading: boolean;
  expandedPosts: { [key: number]: boolean };
  searchTerm: string;
  selectedUserId: string;
  onToggleExpansion: (postId: number) => void;
  onDeletePost: (postId: number) => void;
  onResetFilters: () => void;
}

export interface PostsFiltersProps {
  searchTerm: string;
  selectedUserId: string;
  users: UserType[];
  filteredPostsCount: number;
  onSearchChange: (value: string) => void;
  onUserFilterChange: (value: string) => void;
  onResetFilters: () => void;
}

export interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (post: Post) => void;
}

export interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  onPostUpdated: (post: Post) => void;
}