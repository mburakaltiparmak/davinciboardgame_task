import React from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: FieldError;
  required?: boolean;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  type = 'text',
  placeholder,
  icon,
  error,
  required = false,
  className = ''
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {icon && <span className="inline-block mr-1">{icon}</span>}
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon,
  children,
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </h3>
      </div>
      {children}
    </div>
  );
};

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  submitText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  isSubmitting,
  submitText = 'Save',
  cancelText = 'Cancel',
  showCancel = true
}) => {
  return (
    <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
      {showCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          disabled={isSubmitting}
        >
          {cancelText}
        </button>
      )}
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : submitText}
      </button>
    </div>
  );
};