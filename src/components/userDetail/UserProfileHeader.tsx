import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { UserType } from '../../types/user.types';

interface UserProfileHeaderProps {
  user: UserType;
  userPostsCount: number;
  isEditing: boolean;
  control?: Control<UserType>;
  errors?: FieldErrors<UserType>;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  user,
  userPostsCount,
  isEditing,
  control,
  errors
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
          {isEditing && control ? (
            <div className="space-y-3">
              {/* Name Field */}
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      className={`text-2xl font-bold bg-white bg-opacity-20 rounded-lg px-3 py-2 text-white placeholder-white placeholder-opacity-70 border ${
                        errors?.name ? 'border-red-300' : 'border-white border-opacity-30'
                      }`}
                      placeholder="Full Name"
                    />
                    {errors?.name && (
                      <p className="text-red-200 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                )}
              />

              {/* Username Field */}
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      className={`text-lg bg-white bg-opacity-20 rounded-lg px-3 py-2 text-white placeholder-white placeholder-opacity-70 border ${
                        errors?.username ? 'border-red-300' : 'border-white border-opacity-30'
                      }`}
                      placeholder="Username"
                    />
                    {errors?.username && (
                      <p className="text-red-200 text-sm mt-1">{errors.username.message}</p>
                    )}
                  </div>
                )}
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