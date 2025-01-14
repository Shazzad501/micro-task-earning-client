import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaCoins } from 'react-icons/fa';
import logo from '../assets/nav_logo.png'

const Navbar = () => {
  const user = false;

  const handleLogOut = ()=>{

  }

  const links= <>
      <li><NavLink 
      to='/'
      className={({ isActive }) =>
        `hover:bg-transparent hover:border-b-2 bg-transparent font-bold ${
          isActive ? 'text-white' : 'text-[#d3b81c]'
        }`}
      >Home</NavLink></li> 


     <li><NavLink 
        to='/dashboard'
        className={({ isActive }) =>
          `hover:bg-transparent hover:border-b-2 bg-transparent font-bold ${
            isActive ? 'text-white' : 'text-[#d3b81c]'
          }`}
        >Dashboard</NavLink></li>

       {
        user && <li className='lg:hidden'><p className='text-base text-black flex font-bold items-center'><span className=' text-[#d3b81c] text-xl'><FaCoins/></span> 50 Coin</p></li>
       } 

      {
        user && <li><Link onClick={handleLogOut} className="lg:hidden font-bold text-base text-black">Sign Out</Link></li> 
      } 

  </>
  return (
    <>
      <div className="navbar bg-black bg-opacity-55 fixed top-0 left-0 right-0 z-50">
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
          <div 
           title={user?.displayName}
          className='rounded-full h-12 w-12 border-2 overflow-hidden'>
             <img 
            className="w-full h-full object-cover"
            src={user?.photoURL} 
            alt="user img" />
          </div>

          <button className="hidden lg:flex btn font-bold text-base bg-transparent hover:bg-transparent border-gray-300 text-white"><span className='text-xl text-[#d3b81c]'><FaCoins/></span> 50 Coin</button>

          <button onClick={handleLogOut} className="hidden lg:flex btn font-bold text-base bg-transparent hover:bg-transparent border-gray-300 text-white">Sign Out</button>

          <Link to='https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Shazzad501' target='_blank' className={`btn font-bold text-base bg-transparent  text-white hover:bg-transparent`}>Join as Dev</Link>
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
    </>
  );
};

export default Navbar;