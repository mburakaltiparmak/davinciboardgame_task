import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Globe, 
  Edit, 
  Trash2,
  Eye 
} from 'lucide-react';
import { UserCardProps } from '../../types/user.types';


const UserCard: React.FC<UserCardProps> = ({
  user,
  postsCount,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden">
      {/* User Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-gray-600 text-sm">@{user.username}</p>
            <div className="flex items-center mt-1">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {postsCount} posts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="p-6 space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-3 text-gray-400" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-3 text-gray-400" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-3 text-gray-400" />
          <span className="truncate">{user.address.city}, {user.address.street}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Building className="w-4 h-4 mr-3 text-gray-400" />
          <span className="truncate">{user.company.name}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Globe className="w-4 h-4 mr-3 text-gray-400" />
          <span className="truncate">{user.website}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6">
        <div className="flex space-x-2">
          <Link
            to={`/users/${user.id}`}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Link>
          <button className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200">
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="inline-flex items-center px-3 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;