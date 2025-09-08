import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Save, X, MessageCircle } from 'lucide-react';
import { fetchData, deleteData, updateData } from '../api/api';
import { Post } from '../types/post.types';
import { UserType } from '../types/user.types';
import PostHeader from '../components/postDetail/PostHeader';
import PostContent from '../components/postDetail/PostContent';
import PostActions from '../components/postDetail/PostActions';
import RelatedPosts from '../components/postDetail/RelatedPosts';
import AuthorProfileCard from '../components/postDetail/AuthorProfileCard';
import DeleteConfirmModal from '../components/common/DeleteConfirmModal';

const PostsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<UserType | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    const loadPostData = async () => {
      if (!id) return;
      
      try {
        const [postsData, usersData] = await Promise.all([
          fetchData('posts'),
          fetchData('users')
        ]);
        
        const postData = (postsData as Post[]).find(p => p.id === parseInt(id));
        const allPostsData = postsData as Post[];
        
        if (postData) {
          setPost(postData);
          setEditedPost(postData);
          setAllPosts(allPostsData);
          
          const authorData = (usersData as UserType[]).find(u => u.id === postData.userId);
          setAuthor(authorData || null);
        } else {
          navigate('/posts');
        }
      } catch (error) {
        console.error('Error loading post data:', error);
        navigate('/posts');
      } finally {
        setLoading(false);
      }
    };

    loadPostData();
  }, [id, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedPost(post);
  };

  const handleSaveEdit = async () => {
    if (!editedPost || !id) return;

    try {
      const updatedPost = await updateData('posts', parseInt(id), editedPost);
      setPost(updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteData('posts', parseInt(id));
      navigate('/posts');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleInputChange = (field: keyof Post, value: string | number) => {
    if (!editedPost) return;

    setEditedPost(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value
      };
    });
  };

  // Get related posts by the same author
  const getRelatedPosts = () => {
    if (!post || !author) return [];
    return allPosts
      .filter(p => p.userId === author.id && p.id !== post.id)
      .slice(0, 3);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Post Not Found</h2>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
          <Link to="/posts" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts();

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/posts" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Posts
          </Link>
          
          <div className="flex space-x-3">
            {!isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Post
                </button>
                <button
                  onClick={() => setDeleteConfirm(true)}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Post Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <PostHeader
            post={post}
            author={author}
            isEditing={isEditing}
            editedPost={editedPost}
            onInputChange={handleInputChange}
          />
          
          <PostContent
            post={post}
            isEditing={isEditing}
            editedPost={editedPost}
            onInputChange={handleInputChange}
          />

          {!isEditing && <PostActions post={post} />}
        </div>

        {/* Related Posts Section */}
        <RelatedPosts posts={relatedPosts} author={author} />

        {/* Author Profile Card */}
        {author && <AuthorProfileCard author={author} />}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteConfirm}
        title="Delete Post"
        message={`Are you sure you want to delete <strong>"${post.title}"</strong>? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(false)}
        confirmText="Delete Post"
      />
    </div>
  );
};

export default PostsDetailPage;