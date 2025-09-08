import React from 'react';
import { PostContentProps } from '../../types/post.types';



const PostContent: React.FC<PostContentProps> = ({
  post,
  isEditing,
  editedPost,
  onInputChange
}) => {
  return (
    <div className="p-8">
      {isEditing ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Post Content</label>
          <textarea
            value={editedPost?.body || ''}
            onChange={(e) => onInputChange('body', e.target.value)}
            rows={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Write your post content here..."
          />
        </div>
      ) : (
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {post.body}
          </p>
        </div>
      )}
    </div>
  );
};

export default PostContent;