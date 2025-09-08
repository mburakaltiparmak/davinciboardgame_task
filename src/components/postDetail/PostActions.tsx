import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { PostActionsProps } from '../../types/post.types';



const PostActions: React.FC<PostActionsProps> = ({ post }) => {
  return (
    <div className="px-8 pb-8">
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <div className="flex space-x-6">
          <button className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200">
            <Heart className="w-5 h-5 mr-2" />
            <span>Like</span>
          </button>
          <button className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
            <MessageCircle className="w-5 h-5 mr-2" />
            <span>Comment</span>
          </button>
          <button className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200">
            <Share2 className="w-5 h-5 mr-2" />
            <span>Share</span>
          </button>
        </div>
        
        <div className="text-sm text-gray-500">
          <span>User ID: {post.userId}</span>
        </div>
      </div>
    </div>
  );
};

export default PostActions;