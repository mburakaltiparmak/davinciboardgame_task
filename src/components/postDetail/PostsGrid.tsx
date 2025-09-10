import React from 'react';
import { FileText } from 'lucide-react';
import PostCard from './PostCard';
import { Post } from '../../types/post.types';
import { UserType } from '../../types/user.types';

interface PostsGridProps {
  posts: Post[];
  users: UserType[];
  loading: boolean;
  expandedPosts: { [key: number]: boolean };
  searchTerm: string;
  selectedUserId: string;
  onToggleExpansion: (postId: number) => void;
  onDeletePost: (postId: number) => void;
  onEditPost: (post: Post) => void;
  onResetFilters: () => void;
}

const PostsGrid: React.FC<PostsGridProps> = ({
  posts,
  users,
  loading,
  expandedPosts,
  searchTerm,
  selectedUserId,
  onToggleExpansion,
  onDeletePost,
  onEditPost,
  onResetFilters
}) => {
  const getUser = (userId: number) => {
    return users.find(u => u.id === userId);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Found</h3>
        <p className="text-gray-600 mb-6">
          {searchTerm || selectedUserId ? 'Try adjusting your search criteria.' : 'No posts available at the moment.'}
        </p>
        {(searchTerm || selectedUserId) && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          user={getUser(post.userId)}
          isExpanded={expandedPosts[post.id]}
          onToggleExpansion={onToggleExpansion}
          onDelete={onDeletePost}
          onEdit={onEditPost}
        />
      ))}
    </div>
  );
};

export default PostsGrid;