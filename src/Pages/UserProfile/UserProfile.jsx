import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import useUserByEmail from "../../Hooks/useUserByEmail";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const [signInUser, refetch] = useUserByEmail();
  const { _id, name, userEmail, userPhoto, role, totalCoin } = signInUser || {};

  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(name || "");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image selection
  const handleFileChange = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  // Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newPhotoURL = userPhoto || "";

    if (selectedPhoto) {
      const formData = new FormData();
      formData.append("image", selectedPhoto);

      try {
        const imgResponse = await axios.post(img_hosting_api, formData);
        if (imgResponse.data.success) {
          newPhotoURL = imgResponse.data.data.url;
        } else {
          toast.error("Image upload failed!");
          setLoading(false);
          return;
        }
      } catch (error) {
        toast.error(`Image upload failed: ${error.message}`);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axiosSecure.put(`/profileUpdate/${_id}`, {
        name: updatedName,
        userPhoto: newPhotoURL,
      });

      if (response.data.modifiedCount > 0) {
        toast.success("Profile updated successfully!");
        setIsModalOpen(false);
        refetch();
      } else {
        toast.error("No changes detected!");
      }
    } catch (error) {
      toast.error(`Error updating profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-white p-4">
      <Helmet>
        <title>Profile || Micro Task & Earning</title>
      </Helmet>

      <div className="bg-gradient-to-r from-[#0a2027] to-[#072129] shadow-lg rounded-lg p-6 max-w-2xl w-full flex flex-col md:flex-row items-center md:items-start gap-6 border border-gray-700">
        {/* Left Side: User Photo */}
        <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
          <img
            src={userPhoto || "https://via.placeholder.com/150"}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: User Details */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-semibold text-white">{name || "User Name"}</h2>
          <p className="text-gray-400">{userEmail || "user@example.com"}</p>
          <span className="bg-gray-700 text-white px-3 py-1 text-sm rounded-full mt-2 inline-block uppercase">
            {role || "User"}
          </span>

          {/* Stats */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-300">Total Coins</h3>
            <p className="text-xl font-bold text-white">{totalCoin || 0} 🪙</p>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-4 py-2 bg-white text-black rounded-lg flex items-center gap-2 hover:bg-gray-200 transition font-semibold"
          >
            <FaUserEdit /> Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Edit Profile</h2>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-gray-300">Name:</label>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="w-full bg-gray-800 text-white p-2 rounded border border-gray-600 focus:outline-none"
                  required
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-gray-300">Profile Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full bg-gray-800 text-white p-2 rounded border border-gray-600 focus:outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
