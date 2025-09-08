import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, TrendingUp, Activity } from 'lucide-react';
import { fetchData } from '../api/api';
import { UserType } from '../types/user.types';
import { Post } from '../types/post.types';

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, postsData] = await Promise.all([
          fetchData('users'),
          fetchData('posts')
        ]);
        setUsers(usersData as UserType[]);
        setPosts(postsData as Post[]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const recentPosts = posts.slice(0, 6);
  const featuredUsers = users.slice(0, 8);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Welcome to
            <span className="block text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              M.Burak Altiparmak's
            </span>
            <span className="block text-gray-600">
              Web Developer Task
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            I'm applying to Front End Developer position and this is the Phase 1 task.
            Explore users and posts with full CRUD functionality.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/users"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Users className="w-5 h-5 mr-2" />
              Explore Users
            </Link>
            <Link
              to="/posts"
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FileText className="w-5 h-5 mr-2" />
              Browse Posts
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-row justify-center gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {loading ? '...' : users.length}
            </h3>
            <p className="text-gray-600">Total Users</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {loading ? '...' : posts.length}
            </h3>
            <p className="text-gray-600">Total Posts</p>
          </div>
        </div>

        {/* Recent Posts Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
            <Link 
              to="/posts" 
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
            >
              View All Posts →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="h-52 flex flex-col items-start justify-between border-2 border-red-500 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {post.body}
                  </p>
                  <div className="flex flex-row items-center justify-between w-full">
                    <span className="text-xs text-gray-500">Post #{post.id}</span>
                    <span className="text-xs text-blue-600 font-medium">
                      User Id: {post.userId}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Featured Users Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Users</h2>
            <Link 
              to="/users" 
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
            >
              View All Users →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 text-center animate-pulse">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredUsers.map((user) => (
                <Link
                  key={user.id}
                  to={`/users/${user.id}`}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {user.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">@{user.username}</p>
                  <p className="text-xs text-gray-500">{user.company.name}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;