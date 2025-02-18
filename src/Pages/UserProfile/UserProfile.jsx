import React from "react";
import { FaUserEdit } from "react-icons/fa";
import useUserByEmail from "../../Hooks/useUserByEmail";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
  const [signInUser] = useUserByEmail();
  const { _id, name, userEmail, userPhoto, role, totalCoin } = signInUser || {};

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white p-4">
      <Helmet>
        <title>Profile || Micro Task & Earning</title>
      </Helmet>
      
      <div className="bg-gray-900 shadow-lg rounded-lg p-6 max-w-2xl w-full flex flex-col md:flex-row items-center md:items-start gap-6 border border-gray-700">
        
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
          <button className="mt-4 px-4 py-2 bg-white text-black rounded-lg flex items-center gap-2 hover:bg-gray-200 transition font-semibold">
            <FaUserEdit /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
