import React from 'react';
import { Mail, Phone, Globe, MapPin, Building } from 'lucide-react';
import { UserContactInfoProps } from '../../types/user.types';

const UserContactInfo: React.FC<UserContactInfoProps> = ({
  user,
  isEditing,
  editedUser,
  onInputChange
}) => {
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedUser?.email || ''}
                  onChange={(e) => onInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{user.email}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedUser?.phone || ''}
                  onChange={(e) => onInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{user.phone}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              {isEditing ? (
                <input
                  type="url"
                  value={editedUser?.website || ''}
                  onChange={(e) => onInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editedUser?.address.street || ''}
                    onChange={(e) => onInputChange('address', e.target.value, 'street')}
                    placeholder="Street"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={editedUser?.address.suite || ''}
                    onChange={(e) => onInputChange('address', e.target.value, 'suite')}
                    placeholder="Suite"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editedUser?.address.city || ''}
                      onChange={(e) => onInputChange('address', e.target.value, 'city')}
                      placeholder="City"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={editedUser?.address.zipcode || ''}
                      onChange={(e) => onInputChange('address', e.target.value, 'zipcode')}
                      placeholder="Zipcode"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-gray-900">
                  <p>{user.address.street}, {user.address.suite}</p>
                  <p>{user.address.city}, {user.address.zipcode}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Building className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editedUser?.company.name || ''}
                    onChange={(e) => onInputChange('company', e.target.value, 'name')}
                    placeholder="Company Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={editedUser?.company.catchPhrase || ''}
                    onChange={(e) => onInputChange('company', e.target.value, 'catchPhrase')}
                    placeholder="Catch Phrase"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ) : (
                <div className="text-gray-900">
                  <p className="font-medium">{user.company.name}</p>
                  <p className="text-sm text-gray-600 italic">"{user.company.catchPhrase}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserContactInfo;