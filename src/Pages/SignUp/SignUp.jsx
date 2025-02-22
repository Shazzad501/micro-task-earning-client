import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import signUpLotti  from '../../assets/signUp.json'
import Lottie from 'react-lottie-player';
import { Link, useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useUserByEmail from '../../Hooks/useUserByEmail';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {upDateProfile, newUserSet, setUser} = useAuth();
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signInUser, refetch] = useUserByEmail();
  const { role } = signInUser || {};

  // Navigate based on role
  useEffect(() => {
    if (role) {
      switch (role) {
        case 'admin':
          navigate('/dashboard/admin-home');
          break;
        case 'buyer':
          navigate('/dashboard/buyer-home');
          break;
        case 'worker':
          navigate('/dashboard/worker-home');
          break;
        default:
          navigate('/');
      }
    }
  }, [role, navigate]);

  // user registration with email pass
  const onSubmit = (data) => {
    newUserSet(data.email, data.password)
    .then(res=>{
      upDateProfile({displayName: data.name, photoURL: data.photoUrl})
      .then(()=>{
      })
      .catch(err=>{
        toast.error(`${err.message}`)
      })
      const userData = {
        name: data.name,
        userEmail: res.user?.email,
        userPhoto: data.photoUrl,
        role: data.role,
        totalCoin: data.role === 'worker' ? 10 : 50
      }

      // save user info into the db
      axiosPublic.post('/users', userData)
      .then(res=>{
        if(res.data.insertedId){
          toast.success('Sign Up success!')
          refetch()
        }
      })
      .catch(err=>{
        toast.error(`${err.message}`)
      })
      setUser(res.user)
    })
    .catch(err=>{
      toast.error(`${err.message}`)
    })
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center min-h-screen bg-black">
      <Helmet>
        <title>Sign Up|| Micro Task & Earning</title>
      </Helmet>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        <Typewriter
                words={[
                  "Create a new account",
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
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              placeholder="Type your name:"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              placeholder="Type your Email:"
              type="email"
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

          {/* Profile Picture URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input
              placeholder="demo-https://i.ibb.co.com/bK71QxV/me.jpg"
              type="url"
              {...register('photoUrl')}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                placeholder="demo-pass:-123Aa@"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      'Password must be at least 6 characters long, include one letter, one number, and one special character',
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

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              {...register('role', { required: 'Role is required' })}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select your role</option>
              <option value="worker">Worker</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 text-white font-semibold rounded-md shadow bg-[#072129] hover:bg-[#0a2d38] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
        <p className='text-center text-sm mt-4'>Already Have an account? <Link to='/signIn' className='underline text-red-500'>Sign In</Link></p>
      </div>
      <div>
      <Lottie
            loop
            animationData={signUpLotti}
            play
            className=""
            />
      </div>
    </div>
  );
};

export default SignUp;
