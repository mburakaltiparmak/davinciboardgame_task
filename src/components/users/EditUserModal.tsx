import React from 'react';
import Modal from '../ui/Modal';
import { FormActions } from '../ui/FormField';
import { EditUserModalProps, UserType } from '../../types/user.types';
import { updateData } from '../../services/api';
import { useUserEditForm } from '../../hooks/useUserForms';
import { AddressSection, CompanySection, PersonalInfoSection } from './UserFormSections';

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onUserUpdated
}) => {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting }, watch } = useUserEditForm(user);
  
  const watchedName = watch('name');

  const onSubmit = async (data: UserType) => {
    try {
      const updatedUser = await updateData('users', user.id, data);
      onUserUpdated(updatedUser);
      handleClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleClose = () => {
    onClose();
    if (user) {
      reset(user);
    }
  };

  const PreviewSection = () => (
    watchedName ? (
      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Preview</h4>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {watchedName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{watchedName}</p>
            <p className="text-sm text-gray-600">@{user.username}</p>
          </div>
        </div>
      </div>
    ) : null
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Edit User - ${user.name}`} size="xl">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PersonalInfoSection control={control} errors={errors} />
          </div>
          
          <div>
            <AddressSection control={control} errors={errors} />
            <div className="mt-8">
              <CompanySection control={control} errors={errors} />
            </div>
            <PreviewSection />
          </div>
        </div>

        <FormActions
          onCancel={handleClose}
          isSubmitting={isSubmitting}
          submitText="Update User"
        />
      </form>
    </Modal>
  );
};

export default EditUserModal;