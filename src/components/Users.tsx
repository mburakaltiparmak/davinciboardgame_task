import React, { useEffect,useState } from 'react';
import { fetchData } from '../api/api.js';
const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            const users = await fetchData('users');
            setUsers(users);
        };
        getUsers();
    }, []);

  return (
    <div className="flex flex-col items-center justify-between">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <ul>
          <li className="border-b border-gray-200 py-2">User 1</li>
          <li className="border-b border-gray-200 py-2">User 2</li>
          <li className="border-b border-gray-200 py-2">User 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Users;
