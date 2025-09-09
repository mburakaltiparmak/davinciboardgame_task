import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserType } from '../types/user.types';
import { userValidationSchema, createUserValidationSchema } from '../schemas/userValidation';

// Hook for editing existing user
export const useUserEditForm = (initialUser?: UserType) => {
  return useForm<UserType>({
    resolver: yupResolver(userValidationSchema),
    mode: 'onChange',
    defaultValues: initialUser
  });
};

// Hook for creating new user
export const useUserCreateForm = () => {
  const defaultValues: Omit<UserType, 'id'> = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  };

  return useForm<Omit<UserType, 'id'>>({
    resolver: yupResolver(createUserValidationSchema),
    mode: 'onChange',
    defaultValues
  });
};