import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { fetchData, deleteData } from '../api/api';
import { Post } from '../types/post.types';
import { UserType } from '../types/user.types';
import PostsFilters from '../components/postDetail/PostsFilters';
import PostsGrid from '../components/postDetail/PostsGrid';
import Pagination from '../components/common/Pagination';
import DeleteConfirmModal from '../components/common/DeleteConfirmModal';
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
  const [actionLoading, setActionLoading] = useState(false);
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

  // Handle post creation
  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
    setCurrentPage(1);
    setShowCreateModal(false);
  };

  // Handle delete post
  const handleDeletePost = async (postId: number) => {
    setActionLoading(true);
    try {
      await deleteData('posts', postId);
      setPosts(prev => prev.filter(post => post.id !== postId));
      setDeleteConfirm(null);
      
      // Adjust current page if needed
      const newFilteredPosts = posts.filter(post => post.id !== postId);
      const newTotalPages = Math.ceil(newFilteredPosts.length / postsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setActionLoading(false);
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

  // Handle search change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Handle user filter change
  const handleUserFilterChange = (value: string) => {
    setSelectedUserId(value);
    setCurrentPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedUserId('');
    setCurrentPage(1);
  };

  // Get post to delete
  const postToDelete = deleteConfirm ? posts.find(p => p.id === deleteConfirm) : null;

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
            <button 
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Post
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <PostsFilters
          searchTerm={searchTerm}
          selectedUserId={selectedUserId}
          users={users}
          filteredPostsCount={filteredPosts.length}
          onSearchChange={handleSearchChange}
          onUserFilterChange={handleUserFilterChange}
          onResetFilters={resetFilters}
        />

        {/* Posts Grid */}
        <PostsGrid
          posts={currentPosts}
          users={users}
          loading={loading}
          expandedPosts={expandedPosts}
          searchTerm={searchTerm}
          selectedUserId={selectedUserId}
          onToggleExpansion={togglePostExpansion}
          onDeletePost={setDeleteConfirm}
          onResetFilters={resetFilters}
        />

        {/* Pagination */}
        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredPosts.length}
            itemsPerPage={postsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteConfirm}
        title="Delete Post"
        message={`Are you sure you want to delete <strong>"${postToDelete?.title || 'this post'}"</strong>? This action cannot be undone.`}
        onConfirm={() => deleteConfirm && handleDeletePost(deleteConfirm)}
        onCancel={() => setDeleteConfirm(null)}
        confirmText={actionLoading ? "Deleting..." : "Delete Post"}
      />

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