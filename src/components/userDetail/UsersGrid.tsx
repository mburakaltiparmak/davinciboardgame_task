import React from 'react';
import { User } from 'lucide-react';
import UserCard from './UserCard';
import { UsersGridProps } from '../../types/user.types';

const UsersGrid: React.FC<UsersGridProps> = ({
  users,
  posts,
  loading,
  searchTerm,
  onDeleteUser
}) => {
  // Get posts count for user
  const getUserPostsCount = (userId: number) => {
    return posts.filter(post => post.userId === userId).length;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Users Found</h3>
        <p className="text-gray-600 mb-6">
          {searchTerm ? 'Try adjusting your search criteria.' : 'No users available at the moment.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          postsCount={getUserPostsCount(user.id)}
          onDelete={onDeleteUser}
        />
      ))}
    </div>
  );
};

export default UsersGrid;