import React, { useState } from 'react';
import logo from '../assets/nav_logo.png'
import useUserByEmail from '../Hooks/useUserByEmail';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaAdn, FaBook, FaFacebook, FaGithub, FaHistory, FaHome, FaLinkedin, FaList, FaSignOutAlt, FaTasks, FaTwitter } from 'react-icons/fa';
import { MdAddCard } from 'react-icons/md';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { FaPeopleGroup } from 'react-icons/fa6';


const DashboardLayout = () => {
  const [signInUser] = useUserByEmail();
  const {name, totalCoin, role, userPhoto} = signInUser || {};
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center bg-black text-white p-4">
        <Link to='/' className="text-lg font-bold">
          <img src={logo} alt="logo"  className='w-36 h-16'/>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-base">
            Available Coins: <strong>{totalCoin}</strong>
          </span>
          <img
            src={userPhoto}
            alt="User"
            className="rounded-full w-10 h-10"
          />
          <div className="text-sm">
            <p className='uppercase'>{role}</p>
            <p className='text-base'>{name}</p>
          </div>
          <button className="text-xl">
            <span role="img" aria-label="Notification">
              🔔
            </span>
          </button>
          {/* Mobile Navigation Toggle */}
          <button
            className="sm:hidden text-xl"
            onClick={toggleSidebar}
            aria-label="Toggle Navigation"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full bg-black text-white p-4 z-10 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:relative sm:translate-x-0 sm:w-1/4`}
        >
          <ul className="space-y-4 px-4">
            {/* worker navigation */}
            {
              role === 'worker' && <>
              <li><NavLink to='/dashboard/worker-home' className='font-bold text-base flex items-center gap-3'><span className='font-bold text-lg'><FaHome/></span>Home</NavLink></li>

              <li><NavLink to='/dashboard/task-list' className='font-bold text-base flex items-center gap-3'><span className='font-bold text-lg'><FaList/></span>Task List</NavLink></li>

              <li><NavLink to='/dashboard/worker-submission' className='font-bold text-base flex items-center gap-3'><span className='font-bold text-lg'><IoCheckmarkDoneCircle/></span>My Submissions</NavLink></li>

              <li><NavLink to='/dashboard/withdraw' className='font-bold text-base flex items-center gap-3'><span className='font-bold text-lg'><FaSignOutAlt/></span>Withdraw</NavLink></li>
              </>
            }

            {/* Buyer navigation */}

            {
            role === 'buyer' && <>
            <li><NavLink to='/dashboard/buyer-home' className='font-bold text-base flex items-center gap-3'><span className='font-bold text-lg'><FaHome/></span>Home</NavLink></li>

            <li><NavLink to='/dashboard/add-task' className='font-bold text-base flex items-center gap-3'><span className='font-bold text-lg'><MdAddCard/></span>Add New Task</NavLink></li>

            <li><NavLink to='/dashboard/buyer-task' className='font-bold text-base flex items-center gap-3'><span className='font-bold text-lg'><FaTasks/></span>My Task’s</NavLink></li>

            <li><NavLink to='/dashboard/purchase-coin' className='font-bold text-base flex items-center gap-3'><span className='font-bold text-lg'><BiSolidPurchaseTag/></span>Purchase Coin</NavLink></li>

            <li><NavLink to='/dashboard/payment-history' className='font-bold text-base flex items-center gap-3'><span className='font-bold text-lg'><FaHistory/></span>Payment History</NavLink></li>
            </>
            }

              {/* admin navigation */}
            {
              role === 'admin' && <>
              <li><NavLink to='/dashboard/admin-home' className='font-bold text-base flex items-center gap-3'><span className='font-bold text-lg'><FaHome/></span>Home</NavLink></li>

              <li><NavLink to='/dashboard/manage-users' className='font-bold text-base flex items-center gap-3'><span className='font-bold text-lg'><FaPeopleGroup/></span>Manage  Users</NavLink></li>

              <li><NavLink to='/dashboard/manage-task' className='font-bold text-base flex items-center gap-3'><span className='font-bold text-lg'><FaTasks/></span>My Task’s</NavLink></li>

              </>
            }
          </ul>
          {/* Close Button for Mobile */}
          <button
            className="sm:hidden mt-4 text-red-500 ml-4"
            onClick={toggleSidebar}
          >
            Close
          </button>
        </aside>

        {/* Overlay for Sidebar on Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Section */}
        <main className="flex-grow p-6 bg-gray-50 ml-0 sm:ml-auto">
          <Outlet/>
        </main>
      </div>

      {/* Footer */}
      <div>
      <footer className="footer bg-black text-white p-10  border-white border-t-2">
          <aside>
            <img className='w-44 h-24' src={logo} alt="logo" />
            <p className='text-base font-bold'>
              Pepole Finace Grower Ltd.
              <br />
              Providing reliable tech since 2000
            </p>
            <p>Copyright © {new Date().getFullYear()} - All right reserved by Shazzad Maruf</p>
          </aside>
          <nav>
            <h6 className="footer-title">Social</h6>
            <div className="grid grid-flow-col gap-4">
              <Link to='https://www.linkedin.com/in/md-maruf-162799255/' target='_blank' className='font-bold text-3xl'>
              <FaLinkedin/>
              </Link>

              <Link to='https://x.com/SMaruf3950' target='_blank' className='font-bold text-3xl'>
              <FaTwitter/>
              </Link>

              <Link to='https://github.com/Shazzad501' target='_blank' className='font-bold text-3xl'>
              <FaGithub/>
              </Link>

              <Link to='https://www.facebook.com/profile.php?id=100033528620333' target='_blank' className='font-bold text-3xl'>
              <FaFacebook/>
              </Link>
              
            </div>
          </nav>     
      </footer>
    </div>
    </div>
  );
};

export default DashboardLayout;