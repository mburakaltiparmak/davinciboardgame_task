import { Post } from "./post.types";

export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserContactInfoProps {
  user: UserType;
  isEditing: boolean;
  editedUser: UserType | null;
  onInputChange: (field: string, value: string, nestedField?: string, subField?: string) => void;
}

export interface UserPostsListProps {
  user: UserType;
  userPosts: Post[];
}

export interface UserProfileHeaderProps {
  user: UserType;
  userPostsCount: number;
  isEditing: boolean;
  editedUser: UserType | null;
  onInputChange: (field: string, value: string, nestedField?: string, subField?: string) => void;
}