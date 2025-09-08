import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar } from 'lucide-react';
import { UserPostsListProps } from '../../types/user.types';



const UserPostsList: React.FC<UserPostsListProps> = ({ user, userPosts }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Posts by {user.name} ({userPosts.length})
        </h2>
        <Link
          to="/posts"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View All Posts →
        </Link>
      </div>

      {userPosts.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Posts Yet</h3>
          <p className="text-gray-600">This user hasn't created any posts.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userPosts.map((post) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                {post.body}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Post #{post.id}</span>
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  View Details
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPostsList;