import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import Lottie from 'react-lottie-player';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import loginLotti from '../../assets/signIn.json'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log('Email/Password Login:', data);
    // Handle login logic here (e.g., API call to authenticate the user)
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In');
    // Implement Google Sign-In logic here (e.g., Firebase or OAuth)
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        <Typewriter
                words={[
                  "Sign In Your Account",
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 text-center text-gray-500">OR</div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 px-4 bg-purple-950 text-white font-semibold rounded-md shadow hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
         <p className='flex items-center justify-center gap-3'> <FaGoogle/> Sign In with Google</p>
        </button>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/signUp" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      <div>
      <Lottie
            loop
            animationData={loginLotti}
            play
            className=""
            />
      </div>
    </div>
  );
};

export default SignIn;
