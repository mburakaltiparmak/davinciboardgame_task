import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Save, X, User } from 'lucide-react';
import { fetchData, deleteData, updateData } from '../services/api';
import { UserType } from '../types/user.types';
import { Post } from '../types/post.types';
import UserProfileHeader from '../components/users/UserProfileHeader';
import UserPostsList from '../components/users/UserPostsList';
import DeleteConfirmModal from '../components/ui/DeleteConfirmModal';
import { useUserEditForm } from '../hooks/useUserForms';
import { AddressSection, CompanySection, PersonalInfoSection } from '../components/users/UserFormSections';

const UsersDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { control, handleSubmit, reset, formState: { errors, isSubmitting, isDirty } } = useUserEditForm();

  useEffect(() => {
    const loadUserData = async () => {
      if (!id) return;
      
      try {
        const [usersData, postsData] = await Promise.all([
          fetchData('users'),
          fetchData('posts')
        ]);
        
        const userData = (usersData as UserType[]).find(u => u.id === parseInt(id));
        const userPostsData = (postsData as Post[]).filter(p => p.userId === parseInt(id));
        
        if (userData) {
          setUser(userData);
          reset(userData);
          setUserPosts(userPostsData);
        } else {
          navigate('/users');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        navigate('/users');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [id, navigate, reset]);

  const onSubmit = async (data: UserType) => {
    if (!id) return;

    try {
      const updatedUser = await updateData('users', parseInt(id), data);
      setUser(updatedUser);
      setIsEditing(false);
      reset(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (user) reset(user);
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteData('users', parseInt(id));
      navigate('/users');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const LoadingState = () => (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NotFoundState = () => (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">User Not Found</h2>
        <p className="text-gray-600 mb-6">The user you're looking for doesn't exist.</p>
        <Link to="/users" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Link>
      </div>
    </div>
  );

  const ActionButtons = () => (
    <div className="flex space-x-3">
      {!isEditing ? (
        <>
          <button
            onClick={handleEdit}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit User
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
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isDirty}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={handleCancelEdit}
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
        </>
      )}
    </div>
  );

  if (loading) return <LoadingState />;
  if (!user) return <NotFoundState />;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/users" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Users
          </Link>
          <ActionButtons />
        </div>

        {/* User Profile Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <UserProfileHeader
              user={user}
              userPostsCount={userPosts.length}
              isEditing={isEditing}
              control={control}
              errors={errors}
            />
            
            {isEditing && (
              <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <PersonalInfoSection control={control} errors={errors} />
                </div>
                <div>
                  <AddressSection control={control} errors={errors} />
                  <div className="mt-8">
                    <CompanySection control={control} errors={errors} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* User Posts */}
        <UserPostsList user={user} userPosts={userPosts} />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteConfirm}
        title="Delete User"
        message={`Are you sure you want to delete <strong>${user.name}</strong>? This action cannot be undone and will also delete all their posts.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(false)}
        confirmText="Delete User"
      />
    </div>
  );
};

export default UsersDetailPage;