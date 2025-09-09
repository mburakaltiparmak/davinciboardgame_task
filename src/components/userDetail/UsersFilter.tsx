import React from 'react';
import { Search } from 'lucide-react';
import { UsersFiltersProps } from '../../types/user.types';

const UsersFilters: React.FC<UsersFiltersProps> = ({
  searchTerm,
  filteredUsersCount,
  onSearchChange
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users by name, username, email, or company..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {searchTerm && (
        <div className="mt-4 flex items-center">
          <span className="text-sm text-gray-600">
            {filteredUsersCount} users found
          </span>
        </div>
      )}
    </div>
  );
};

export default UsersFilters;