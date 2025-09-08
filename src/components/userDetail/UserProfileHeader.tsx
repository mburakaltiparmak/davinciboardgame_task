import React from 'react';
import { UserProfileHeaderProps } from '../../types/user.types';

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  user,
  userPostsCount,
  isEditing,
  editedUser,
  onInputChange
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-12">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
          <span className="text-blue-600 font-bold text-2xl">
            {user.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="text-white">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editedUser?.name || ''}
                onChange={(e) => onInputChange('name', e.target.value)}
                className="text-2xl font-bold bg-white bg-opacity-20 rounded-lg px-3 py-2 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30"
                placeholder="Full Name"
              />
              <input
                type="text"
                value={editedUser?.username || ''}
                onChange={(e) => onInputChange('username', e.target.value)}
                className="text-lg bg-white bg-opacity-20 rounded-lg px-3 py-2 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30"
                placeholder="Username"
              />
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-xl opacity-90">@{user.username}</p>
            </>
          )}
          <div className="flex items-center mt-4 space-x-4">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
              {userPostsCount} Posts
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
              ID: {user.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;