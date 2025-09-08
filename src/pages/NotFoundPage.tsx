import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
          <div className="text-6xl font-bold text-gray-900 mb-2">404</div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved, 
          deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/users"
              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Browse Users
            </Link>
            <Link
              to="/posts"
              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Browse Posts
            </Link>
          </div>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Looking for something specific?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Try navigating through our main sections or check the URL for any typos.
          </p>
          
          <div className="grid grid-cols-1 gap-2 text-sm">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              → Homepage with latest updates
            </Link>
            <Link
              to="/users"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              → Users management section
            </Link>
            <Link
              to="/posts"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              → Posts and articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;