import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData, deleteData } from '../api/api';
import { Post } from '../types/post.types';
import { UserType } from '../types/user.types';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Calendar,
  MessageCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import CreatePostModal from '../components/postDetail/CreatePostModal';

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [expandedPosts, setExpandedPosts] = useState<{ [key: number]: boolean }>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const postsPerPage = 12;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postsData, usersData] = await Promise.all([
          fetchData('posts'),
          fetchData('users')
        ]);
        setPosts(postsData as Post[]);
        setUsers(usersData as UserType[]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter posts based on search term and selected user
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = selectedUserId === '' || post.userId.toString() === selectedUserId;
    
    return matchesSearch && matchesUser;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Get user name by ID
  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  // Get user by ID
  const getUser = (userId: number) => {
    return users.find(u => u.id === userId);
  };

  // Handle delete post
  const handleDeletePost = async (postId: number) => {
    try {
      await deleteData('posts', postId);
      setPosts(posts.filter(post => post.id !== postId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Toggle post expansion
  const togglePostExpansion = (postId: number) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedUserId('');
    setCurrentPage(1);
  };

  const handlePostCreated = (post: Post) => {
    setPosts(prevPosts => [...prevPosts, post]);
    setShowCreateModal(false);
    setCurrentPage(Math.ceil((posts.length + 1) / postsPerPage));
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Posts Management</h1>
              <p className="text-gray-600">
                Manage and view all posts in the system ({filteredPosts.length} posts)
              </p>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              Create New Post
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts by title or content..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedUserId}
                onChange={(e) => {
                  setSelectedUserId(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">All Authors</option>
                {users.map(user => (
                  <option key={user.id} value={user.id.toString()}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {(searchTerm || selectedUserId) && (
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {filteredPosts.length} posts found
              </span>
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : currentPosts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedUserId ? 'Try adjusting your search criteria.' : 'No posts available at the moment.'}
            </p>
            {(searchTerm || selectedUserId) && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => {
              const user = getUser(post.userId);
              const isExpanded = expandedPosts[post.id];
              const shouldTruncate = post.body.length > 150;
              const displayBody = isExpanded || !shouldTruncate 
                ? post.body 
                : post.body.substring(0, 150) + '...';

              return (
                <div key={post.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden">
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
                          {getUserName(post.userId)}
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
                        onClick={() => togglePostExpansion(post.id)}
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
                        <button className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(post.id)}
                          className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredPosts.length > postsPerPage && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {(() => {
              const pages = [];
              const maxVisiblePages = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
              const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
              
              if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
              }

              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      currentPage === i
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {i}
                  </button>
                );
              }
              return pages;
            })()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Page Info */}
        {!loading && filteredPosts.length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} posts
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Post</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePost(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default PostsPage;