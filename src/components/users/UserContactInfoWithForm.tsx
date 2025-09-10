import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Mail, Phone, Globe, MapPin, Building } from 'lucide-react';
import { UserType } from '../../types/user.types';

interface UserContactInfoWithFormProps {
  user: UserType;
  isEditing: boolean;
  control: Control<UserType>;
  errors: FieldErrors<UserType>;
}

const UserContactInfoWithForm: React.FC<UserContactInfoWithFormProps> = ({
  user,
  isEditing,
  control,
  errors
}) => {
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {isEditing ? (
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="email"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter email address"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  )}
                />
              ) : (
                <p className="text-gray-900">{user.email}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              {isEditing ? (
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="tel"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  )}
                />
              ) : (
                <p className="text-gray-900">{user.phone}</p>
              )}
            </div>
          </div>

          {/* Website */}
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              {isEditing ? (
                <Controller
                  name="website"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="url"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.website ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter website URL"
                      />
                      {errors.website && (
                        <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>
                      )}
                    </div>
                  )}
                />
              ) : (
                <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {user.website}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              {isEditing ? (
                <div className="space-y-2">
                  {/* Street */}
                  <Controller
                    name="address.street"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="text"
                          placeholder="Street"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.address?.street ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.address?.street && (
                          <p className="text-red-500 text-xs mt-1">{errors.address.street.message}</p>
                        )}
                      </div>
                    )}
                  />

                  {/* Suite */}
                  <Controller
                    name="address.suite"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Suite"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    {/* City */}
                    <Controller
                      name="address.city"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <input
                            {...field}
                            type="text"
                            placeholder="City"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.address?.city ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.address?.city && (
                            <p className="text-red-500 text-xs mt-1">{errors.address.city.message}</p>
                          )}
                        </div>
                      )}
                    />

                    {/* Zipcode */}
                    <Controller
                      name="address.zipcode"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <input
                            {...field}
                            type="text"
                            placeholder="Zipcode"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.address?.zipcode ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.address?.zipcode && (
                            <p className="text-red-500 text-xs mt-1">{errors.address.zipcode.message}</p>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Geo coordinates (optional) */}
                  <div className="grid grid-cols-2 gap-2">
                    <Controller
                      name="address.geo.lat"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <input
                            {...field}
                            type="text"
                            placeholder="Latitude"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.address?.geo?.lat ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.address?.geo?.lat && (
                            <p className="text-red-500 text-xs mt-1">{errors.address.geo.lat.message}</p>
                          )}
                        </div>
                      )}
                    />

                    <Controller
                      name="address.geo.lng"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <input
                            {...field}
                            type="text"
                            placeholder="Longitude"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.address?.geo?.lng ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.address?.geo?.lng && (
                            <p className="text-red-500 text-xs mt-1">{errors.address.geo.lng.message}</p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-gray-900">
                  <p>{user.address.street}, {user.address.suite}</p>
                  <p>{user.address.city}, {user.address.zipcode}</p>
                  {user.address.geo.lat && user.address.geo.lng && (
                    <p className="text-sm text-gray-500">
                      Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Company */}
          <div className="flex items-center space-x-3">
            <Building className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              {isEditing ? (
                <div className="space-y-2">
                  {/* Company Name */}
                  <Controller
                    name="company.name"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="text"
                          placeholder="Company Name"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.company?.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.company?.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.company.name.message}</p>
                        )}
                      </div>
                    )}
                  />

                  {/* Catch Phrase */}
                  <Controller
                    name="company.catchPhrase"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="text"
                          placeholder="Catch Phrase"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.company?.catchPhrase ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.company?.catchPhrase && (
                          <p className="text-red-500 text-xs mt-1">{errors.company.catchPhrase.message}</p>
                        )}
                      </div>
                    )}
                  />

                  {/* Business Description */}
                  <Controller
                    name="company.bs"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="text"
                          placeholder="Business Description"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.company?.bs ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.company?.bs && (
                          <p className="text-red-500 text-xs mt-1">{errors.company.bs.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
              ) : (
                <div className="text-gray-900">
                  <p className="font-medium">{user.company.name}</p>
                  <p className="text-sm text-gray-600 italic">"{user.company.catchPhrase}"</p>
                  {user.company.bs && (
                    <p className="text-sm text-gray-500">{user.company.bs}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserContactInfoWithForm;