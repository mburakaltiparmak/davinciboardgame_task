import React from 'react';
import { Search, Filter } from 'lucide-react';
import { PostsFiltersProps } from '../../types/post.types';

const PostsFilters: React.FC<PostsFiltersProps> = ({
  searchTerm,
  selectedUserId,
  users,
  filteredPostsCount,
  onSearchChange,
  onUserFilterChange,
  onResetFilters
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts by title or content..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedUserId}
            onChange={(e) => onUserFilterChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            <option value="">All Authors</option>
            {users.map(user => (
              <option key={user.id} value={user.id.toString()}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {(searchTerm || selectedUserId) && (
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {filteredPostsCount} posts found
          </span>
          <button
            onClick={onResetFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PostsFilters;