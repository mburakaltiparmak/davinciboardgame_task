import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Edit, 
  Trash2 
} from 'lucide-react';
import { Post } from '../../types/post.types';
import { UserType } from '../../types/user.types';

interface PostCardProps {
  post: Post;
  user: UserType | undefined;
  isExpanded: boolean;
  onToggleExpansion: (postId: number) => void;
  onDelete: (postId: number) => void;
  onEdit: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  user,
  isExpanded,
  onToggleExpansion,
  onDelete,
  onEdit
}) => {
  const shouldTruncate = post.body.length > 150;
  const displayBody = isExpanded || !shouldTruncate 
    ? post.body 
    : post.body.substring(0, 150) + '...';

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden">
      {/* Post Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {user ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
            </span>
          </div>
          <div className="flex-1">
            <Link
              to={`/users/${post.userId}`}
              className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              {user ? user.name : 'Unknown User'}
            </Link>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              <span>Post #{post.id}</span>
            </div>
          </div>
        </div>

        <Link to={`/posts/${post.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
        </Link>
      </div>

      {/* Post Content */}
      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-4">
          {displayBody}
        </p>

        {shouldTruncate && (
          <button
            onClick={() => onToggleExpansion(post.id)}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium mb-4"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Read More
              </>
            )}
          </button>
        )}

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-3">
            <button className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
              <MessageCircle className="w-4 h-4 mr-1" />
              Comments
            </button>
          </div>
          
          <div className="flex space-x-2">
            <Link
              to={`/posts/${post.id}`}
              className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200"
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Link>
            <button 
              onClick={() => onEdit(post)}
              className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;