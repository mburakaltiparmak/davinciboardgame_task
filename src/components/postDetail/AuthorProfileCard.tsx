import React from 'react';
import { Link } from 'react-router-dom';
import { User, FileText } from 'lucide-react';
import { AuthorProfileCardProps } from '../../types/post.types';



const AuthorProfileCard: React.FC<AuthorProfileCardProps> = ({ author }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">About the Author</h2>
      
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">
            {author.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{author.name}</h3>
          <p className="text-gray-600 mb-2">@{author.username}</p>
          <p className="text-sm text-gray-600 mb-4">
            {author.company.name} • {author.email}
          </p>
          <p className="text-gray-700 text-sm mb-4 italic">
            "{author.company.catchPhrase}"
          </p>
          
          <div className="flex space-x-4">
            <Link
              to={`/users/${author.id}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <User className="w-4 h-4 mr-2" />
              View Profile
            </Link>
            <Link
              to={`/posts?userId=${author.id}`}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <FileText className="w-4 h-4 mr-2" />
              All Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;