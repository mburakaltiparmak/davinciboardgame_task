import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye } from 'lucide-react';
import { PostHeaderProps } from '../../types/post.types';

const PostHeader: React.FC<PostHeaderProps> = ({
  post,
  author,
  isEditing,
  editedPost,
  onInputChange
}) => {
  return (
    <div className="p-8 border-b border-gray-100">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
            <input
              type="text"
              value={editedPost?.title || ''}
              onChange={(e) => onInputChange('title', e.target.value)}
              className="w-full px-4 py-3 text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter post title"
            />
          </div>
        </div>
      ) : (
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
      )}

      {/* Author Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {author && (
            <Link
              to={`/users/${author.id}`}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {author.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{author.name}</p>
                <p className="text-sm text-gray-600">@{author.username}</p>
              </div>
            </Link>
          )}
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Post #{post.id}</span>
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            <span>View Details</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;