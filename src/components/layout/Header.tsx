import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, User, Mail, X } from 'lucide-react';
import logo from '../../assets/logo.webp';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Da Vinci Board Game Logo" className="h-8" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-900 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
              <Link
                to="/users"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/users') || location.pathname.startsWith('/users/') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Users
              </Link>
              <Link
                to="/posts"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/posts') || location.pathname.startsWith('/posts/') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Mail className="w-4 h-4 mr-2" />
                Posts
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mb-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-100' 
                    : 'text-gray-900 hover:text-blue-600 hover:bg-white'
                }`}
              >
                <Home className="w-5 h-5 mr-3" />
                Home
              </Link>
              <Link
                to="/users"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/users') || location.pathname.startsWith('/users/') 
                    ? 'text-blue-600 bg-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                }`}
              >
                <User className="w-5 h-5 mr-3" />
                Users
              </Link>
              <Link
                to="/posts"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/posts') || location.pathname.startsWith('/posts/') 
                    ? 'text-blue-600 bg-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                }`}
              >
                <Mail className="w-5 h-5 mr-3" />
                Posts
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;