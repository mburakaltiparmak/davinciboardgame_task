import React, { useState, useEffect } from 'react';
import { FileText, User, Save, X } from 'lucide-react';
import Modal from '../common/Modal';
import { CreatePostModalProps, Post } from '../../types/post.types';
import { UserType } from '../../types/user.types';
import { postData, fetchData } from '../../api/api';

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPostCreated
}) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [formData, setFormData] = useState<Omit<Post, 'id'>>({
    userId: 0,
    title: '',
    body: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      loadUsers();
    }
  }, [isOpen]);

  const loadUsers = async () => {
    try {
      const usersData = await fetchData('users');
      setUsers(usersData as UserType[]);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.userId) newErrors.userId = 'Please select an author';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.title.trim().length < 5) newErrors.title = 'Title must be at least 5 characters';
    if (!formData.body.trim()) newErrors.body = 'Content is required';
    if (formData.body.trim().length < 10) newErrors.body = 'Content must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof Post, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Generate a random ID for demo purposes
      const newPost: Post = {
        ...formData,
        id: Math.floor(Math.random() * 1000) + 100
      };

      const createdPost = await postData('posts', newPost);
      onPostCreated(createdPost);
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      userId: 0,
      title: '',
      body: ''
    });
    setErrors({});
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const getSelectedUser = () => {
    return users.find(user => user.id === formData.userId);
  };

  const selectedUser = getSelectedUser();

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Post"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {/* Author Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Select Author *
            </label>
            <select
              value={formData.userId}
              onChange={(e) => handleInputChange('userId', parseInt(e.target.value))}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.userId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value={0}>Choose an author...</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} (@{user.username})
                </option>
              ))}
            </select>
            {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId}</p>}
            
            {/* Selected Author Preview */}
            {selectedUser && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedUser.name}</p>
                    <p className="text-sm text-gray-600">{selectedUser.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Post Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Post Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter an engaging title for your post..."
              maxLength={200}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
              <p className="text-gray-400 text-xs ml-auto">{formData.title.length}/200</p>
            </div>
          </div>

          {/* Post Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Content *
            </label>
            <textarea
              value={formData.body}
              onChange={(e) => handleInputChange('body', e.target.value)}
              rows={8}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                errors.body ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Write your post content here. Share your thoughts, ideas, or stories..."
              maxLength={2000}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.body && <p className="text-red-500 text-xs">{errors.body}</p>}
              <p className="text-gray-400 text-xs ml-auto">{formData.body.length}/2000</p>
            </div>
          </div>

          {/* Preview Section */}
          {formData.title || formData.body ? (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <div className="bg-gray-50 rounded-lg p-4 border">
                {formData.title && (
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {formData.title}
                  </h4>
                )}
                {selectedUser && (
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {selectedUser.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">by {selectedUser.name}</span>
                  </div>
                )}
                {formData.body && (
                  <p className="text-gray-700 whitespace-pre-line">
                    {formData.body.length > 200 
                      ? formData.body.substring(0, 200) + '...' 
                      : formData.body
                    }
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            disabled={loading}
          >
            <X className="w-4 h-4 inline mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
            disabled={loading}
          >
            <Save className="w-4 h-4 inline mr-2" />
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePostModal;