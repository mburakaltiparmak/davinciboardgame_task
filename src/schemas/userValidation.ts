import * as yup from 'yup';

// Reusable validation patterns
const PATTERNS = {
  username: /^[a-zA-Z0-9_]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  zipcode: /^\d{5}(-\d{4})?$/,
  latitude: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/,
  longitude: /^-?([1]?[0-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}$/
};

// Reusable field schemas
const commonFields = {
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
    
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(PATTERNS.username, 'Username can only contain letters, numbers, and underscores'),
    
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
    
  phone: yup
    .string()
    .required('Phone is required')
    .matches(PATTERNS.phone, 'Please enter a valid phone number'),
    
  website: yup
    .string()
    .url('Please enter a valid website URL')
    .nullable()
    .transform(value => value === '' ? null : value),
    
  address: yup.object({
    street: yup
      .string()
      .required('Street address is required')
      .min(5, 'Street address must be at least 5 characters'),
    suite: yup
      .string()
      .nullable()
      .transform(value => value === '' ? null : value),
    city: yup
      .string()
      .required('City is required')
      .min(2, 'City must be at least 2 characters'),
    zipcode: yup
      .string()
      .required('Zipcode is required')
      .matches(PATTERNS.zipcode, 'Please enter a valid zipcode (e.g., 12345 or 12345-6789)'),
    geo: yup.object({
      lat: yup
        .string()
        .matches(PATTERNS.latitude, 'Please enter a valid latitude')
        .nullable()
        .transform(value => value === '' ? null : value),
      lng: yup
        .string()
        .matches(PATTERNS.longitude, 'Please enter a valid longitude')
        .nullable()
        .transform(value => value === '' ? null : value)
    })
  }),
  
  company: yup.object({
    name: yup
      .string()
      .required('Company name is required')
      .min(2, 'Company name must be at least 2 characters'),
    catchPhrase: yup
      .string()
      .nullable()
      .max(100, 'Catch phrase must be less than 100 characters')
      .transform(value => value === '' ? null : value),
    bs: yup
      .string()
      .nullable()
      .max(100, 'Business description must be less than 100 characters')
      .transform(value => value === '' ? null : value)
  })
};

// User validation schema for editing
export const userValidationSchema = yup.object({
  ...commonFields
});

// Create user validation schema (without id)
export const createUserValidationSchema = yup.object({
  ...commonFields
});