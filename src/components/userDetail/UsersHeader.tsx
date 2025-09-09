import React from 'react';
import { Plus } from 'lucide-react';
import { UsersHeaderProps } from '../../types/user.types';

const UsersHeader: React.FC<UsersHeaderProps> = ({
  totalUsers,
  onCreateUser
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Users Management</h1>
          <p className="text-gray-600">
            Manage and view all users in the system ({totalUsers} users)
          </p>
        </div>
        <button 
          onClick={onCreateUser}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New User
        </button>
      </div>
    </div>
  );
};

export default UsersHeader;