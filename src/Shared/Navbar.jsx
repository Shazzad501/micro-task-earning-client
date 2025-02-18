import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaCoins } from 'react-icons/fa';
import logo from '../assets/nav_logo.png'
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';
import useUserByEmail from '../Hooks/useUserByEmail';

const Navbar = () => {
  const {user, logoutUser} = useAuth();
  const navigate = useNavigate()
  const [signInUser] = useUserByEmail()
  const {totalCoin, role} = signInUser || {};
  const handleLogOut = ()=>{
    logoutUser()
    .then(()=>{
      toast.success('Sign out success!')
      navigate('/')
    })
    .catch(err=>{
      toast.error(`${err.message}`)
    })
  }

  const links= <>
      
     {user && <li>
      {role === 'admin' && <NavLink 
        to='/dashboard/admin-home'
        className={({ isActive }) =>
          `hover:bg-transparent hover:border-b-2 bg-transparent font-bold md:hidden ${
            isActive ? 'text-white' : 'text-[#d3b81c]'
          }`}
        >Dashboard</NavLink>}

        {role === 'buyer' && <NavLink 
        to='/dashboard/buyer-home'
        className={({ isActive }) =>
          `hover:bg-transparent hover:border-b-2 bg-transparent font-bold md:hidden ${
            isActive ? 'text-white' : 'text-[#d3b81c]'
          }`}
        >Dashboard</NavLink>}

        {role === 'worker' && <NavLink 
        to='/dashboard/worker-home'
        className={({ isActive }) =>
          `hover:bg-transparent hover:border-b-2 bg-transparent font-bold md:hidden ${
            isActive ? 'text-white' : 'text-[#d3b81c]'
          }`}
        >Dashboard</NavLink>}
        </li>}

       {
        user && <li className='lg:hidden'><p className='text-base text-black flex font-bold items-center'><span className=' text-[#d3b81c] text-xl'><FaCoins/></span> {totalCoin} Coin</p></li>
       } 

      {
        user && <li><Link onClick={handleLogOut} className="lg:hidden font-bold text-base text-black">Sign Out</Link></li> 
      }
      
      <li><Link to='https://github.com/Shazzad501/micro-task-earning-client' target='_blank' className={`font-bold text-base bg-transparent  text-black hover:bg-transparent lg:hidden`}>Join as Dev</Link></li> 

  </>

  const profileNavigation = ()=>{
    navigate('/dashboard/profile')
  }
  return (
    <>
    <div className='bg-black bg-opacity-75 fixed top-0 left-0 right-0 z-50'>
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <Link to='/'><img className='w-28 h-16' src={logo} alt="logo" /></Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex items-center">
            {links}
          </ul>
        </div>
        <div className="navbar-end flex gap-3">
       
        {
          user?<>
          
          <div>
          {
            role === 'admin' && <Link to={'/dashboard/admin-home'}><button className="hidden lg:flex btn font-bold text-base bg-transparent hover:bg-transparent border-gray-300 text-white">Dashboard</button></Link>
          }

          {
            role === 'buyer' && <Link to={'/dashboard/buyer-home'}><button className="hidden lg:flex btn font-bold text-base bg-transparent hover:bg-transparent border-gray-300 text-white">Dashboard</button></Link>
          }

          {
            role === 'worker' && <Link to={'/dashboard/worker-home'}><button className="hidden lg:flex btn font-bold text-base bg-transparent hover:bg-transparent border-gray-300 text-white">Dashboard</button></Link>
          }
          </div>
          
          <button className="hidden lg:flex btn font-bold text-base bg-transparent hover:bg-transparent border-gray-300 text-white"><span className='text-xl text-[#d3b81c]'><FaCoins/></span> {totalCoin} Coin</button>

          <button onClick={handleLogOut} className="hidden lg:flex btn font-bold text-base bg-transparent hover:bg-transparent border-gray-300 text-white">Sign Out</button>

          <Link to='https://github.com/Shazzad501/micro-task-earning-client' target='_blank' className={`btn font-bold text-base bg-transparent  text-white hover:bg-transparent hidden lg:flex`}>Join as Dev</Link>
          
          <div 
          onClick={profileNavigation}
           title={user?.displayName}
          className='rounded-full h-12 w-12 border-2 overflow-hidden'>
             <img 
            className="w-full h-full object-cover"
            src={user?.photoURL} 
            alt="user img" />
          </div>
          </>:<>
          <Link to='/signIn' className={`btn font-bold text-base bg-transparent  text-white hover:bg-transparent`}>Sign In</Link>

          <Link to='/signUp' className={`btn font-bold text-base bg-transparent  text-white hover:bg-transparent`}>Sign Up</Link>

          <Link to='/' className={`btn font-bold text-base bg-transparent  text-white hover:bg-transparent`}>Join as Dev</Link>
          </>
        }
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="lg:hidden">
              <p className='font-thin text-3xl text-white'><FaBars></FaBars></p>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Navbar;