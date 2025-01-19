import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useUserByEmail from '../../../Hooks/useUserByEmail';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [signInUser] = useUserByEmail();
  const {_id} = signInUser || {};
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const handleDeleteUser = (userId) => {
    if(userId === _id){
      toast.error(`You don't have removed yourself!`)
      return;
    };
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be remove this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${userId}`)
        .then(res=>{
          if(res.data.deletedCount){
            refetch();
            toast.success('User Remove successfully!');
            Swal.fire({
              title: "Deleted!",
              text: "User has been remove.",
              icon: "success"
            });
          }
        })
        .catch(err=>{
          toast.error(`Somthing wrong ${err.message}`)
        })
      }
    });
  };

  const handleUserRoleChange = async (userId, newRole) => {
    try {
      await axiosSecure.put(`/users/${userId}`, { role: newRole });
      setSelectedUser(null);
      refetch();
      toast.success('User role updated successfully!');
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Error updating user role!');
    }
  };

  return (
    <div>
      <Helmet>
        <title>Manage Users || Multi Task & Earning</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="w-full text-left text-gray-500">
          <thead>
            <tr className="text-xs font-medium text-gray-700 bg-gray-100">
              <th className="p-4">Display Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Photo</th>
              <th className="p-4">Role</th>
              <th className="p-4">Coins</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.userEmail}</td>
                <td className="p-4">
                  <img src={user.userPhoto} alt={user.name} className="rounded-full w-8 h-8 object-cover" />
                </td>
                <td className="p-4">
                  {selectedUser === user._id ? (
                    <select
                      className="text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full px-3 py-2"
                      value={user.role}
                      onChange={(e) => handleUserRoleChange(user._id, e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="buyer">Buyer</option>
                      <option value="worker">Worker</option>
                    </select>
                  ) : (
                    <span className="text-blue-500">{user.role}</span>
                  )}
                </td>
                <td className="p-4">{user.totalCoin}</td>
                <td className="p-4 flex space-x-2">
                  <button
                    className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded disabled:opacity-50"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Remove
                  </button>
                  {selectedUser !== user._id && (
                    <button
                      className="btn btn-sm text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
                      onClick={() => setSelectedUser(user._id)}
                    >
                      Edit Role
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;