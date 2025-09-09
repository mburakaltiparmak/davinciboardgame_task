import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { User, Mail, Phone, Globe, MapPin, Building } from 'lucide-react';
import { FormField, FormSection } from '../common/FormField';
import { UserType } from '../../types/user.types';

interface UserFormSectionsProps {
  control: Control<UserType> | Control<Omit<UserType, 'id'>>;
  errors: FieldErrors<UserType> | FieldErrors<Omit<UserType, 'id'>>;
}

export const PersonalInfoSection: React.FC<UserFormSectionsProps> = ({
  control,
  errors
}) => (
  <FormSection title="Personal Information" icon={<User className="w-5 h-5" />}>
    <FormField
      name="name"
      control={control}
      label="Full Name"
      placeholder="John Doe"
      error={errors.name}
      required
    />
    
    <FormField
      name="username"
      control={control}
      label="Username"
      placeholder="johndoe"
      error={errors.username}
      required
    />
    
    <FormField
      name="email"
      control={control}
      label="Email"
      type="email"
      placeholder="john@example.com"
      icon={<Mail className="w-4 h-4" />}
      error={errors.email}
      required
    />
    
    <FormField
      name="phone"
      control={control}
      label="Phone"
      type="tel"
      placeholder="+1-234-567-8900"
      icon={<Phone className="w-4 h-4" />}
      error={errors.phone}
      required
    />
    
    <FormField
      name="website"
      control={control}
      label="Website"
      type="url"
      placeholder="https://www.example.com"
      icon={<Globe className="w-4 h-4" />}
      error={errors.website}
    />
  </FormSection>
);

export const AddressSection: React.FC<UserFormSectionsProps> = ({
  control,
  errors
}) => (
  <FormSection title="Address" icon={<MapPin className="w-5 h-5" />}>
    <FormField
      name="address.street"
      control={control}
      label="Street Address"
      placeholder="123 Main Street"
      error={errors.address?.street}
      required
    />
    
    <FormField
      name="address.suite"
      control={control}
      label="Suite/Apartment"
      placeholder="Apt 4B"
      error={errors.address?.suite}
    />
    
    <div className="grid grid-cols-2 gap-4">
      <FormField
        name="address.city"
        control={control}
        label="City"
        placeholder="New York"
        error={errors.address?.city}
        required
      />
      
      <FormField
        name="address.zipcode"
        control={control}
        label="Zipcode"
        placeholder="10001"
        error={errors.address?.zipcode}
        required
      />
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <FormField
        name="address.geo.lat"
        control={control}
        label="Latitude"
        placeholder="40.7128"
        error={errors.address?.geo?.lat}
      />
      
      <FormField
        name="address.geo.lng"
        control={control}
        label="Longitude"
        placeholder="-74.0060"
        error={errors.address?.geo?.lng}
      />
    </div>
  </FormSection>
);

export const CompanySection: React.FC<UserFormSectionsProps> = ({
  control,
  errors
}) => (
  <FormSection title="Company Information" icon={<Building className="w-5 h-5" />}>
    <FormField
      name="company.name"
      control={control}
      label="Company Name"
      placeholder="Acme Corp"
      error={errors.company?.name}
      required
    />
    
    <FormField
      name="company.catchPhrase"
      control={control}
      label="Company Slogan"
      placeholder="Making the world better"
      error={errors.company?.catchPhrase}
    />
    
    <FormField
      name="company.bs"
      control={control}
      label="Business Description"
      placeholder="Technology solutions"
      error={errors.company?.bs}
    />
  </FormSection>
);