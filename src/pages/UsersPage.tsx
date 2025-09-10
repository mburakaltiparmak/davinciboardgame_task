/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import { fetchData, deleteData } from '../services/api';
import { UserType } from '../types/user.types';
import { Post } from '../types/post.types';
import UsersHeader from '../components/users/UsersHeader';
import UsersFilters from '../components/users/UsersFilter';
import UsersGrid from '../components/users/UsersGrid';
import Pagination from '../components/ui/Pagination';
import DeleteConfirmModal from '../components/ui/DeleteConfirmModal';
import CreateUserModal from '../components/users/CreateUserModal';
import EditUserModal from '../components/users/EditUserModal';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserType | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const usersPerPage = 6;

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

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteUser = async (userId: number) => {
    setActionLoading(true);
    try {
      await deleteData('users', userId);
      setUsers(users.filter(user => user.id !== userId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUserCreated = (newUser: UserType) => {
    setUsers([...users, newUser]);
  };

  const handleEditUser = (user: UserType) => {
    setUserToEdit(user);
    setShowEditModal(true);
  };

  const handleUserUpdated = (updatedUser: UserType) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setShowEditModal(false);
    setUserToEdit(null);
  };

  const userToDelete = deleteConfirm ? users.find(u => u.id === deleteConfirm) : null;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <UsersHeader 
          totalUsers={filteredUsers.length} 
          onCreateUser={() => setShowCreateModal(true)} 
        />

        {/* Search */}
        <UsersFilters
          searchTerm={searchTerm}
          filteredUsersCount={filteredUsers.length}
          onSearchChange={handleSearchChange}
        />

        {/* Users Grid */}
        <UsersGrid
          users={currentUsers}
          posts={posts}
          loading={loading}
          searchTerm={searchTerm}
          onDeleteUser={setDeleteConfirm}
          onEditUser={handleEditUser}
        />

        {/* Pagination */}
        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredUsers.length}
            itemsPerPage={usersPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteConfirm}
        title="Delete User"
        message={`Are you sure you want to delete <strong>${userToDelete?.name || 'this user'}</strong>? This action cannot be undone.`}
        onConfirm={() => deleteConfirm && handleDeleteUser(deleteConfirm)}
        onCancel={() => setDeleteConfirm(null)}
        confirmText={actionLoading ? "Deleting..." : "Delete User"}
      />

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onUserCreated={handleUserCreated}
      />

      {/* Edit User Modal */}
      {userToEdit && (
        <EditUserModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setUserToEdit(null);
          }}
          user={userToEdit}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </div>
  );
};

export default UsersPage;