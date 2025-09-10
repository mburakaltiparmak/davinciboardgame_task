import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, User } from 'lucide-react';
import { RelatedPostsProps } from '../../types/post.types';

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts, author }) => {
  if (posts.length === 0 || !author) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <FileText className="w-5 h-5 mr-2" />
        More posts by {author.name}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((relatedPost) => (
          <Link
            key={relatedPost.id}
            to={`/posts/${relatedPost.id}`}
            className="block border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              {relatedPost.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
              {relatedPost.body}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Post #{relatedPost.id}</span>
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                Read More
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Link
          to={`/users/${author.id}`}
          className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
        >
          <User className="w-4 h-4 mr-2" />
          View {author.name}'s Profile
        </Link>
      </div>
    </div>
  );
};

export default RelatedPosts;