import { Link } from 'react-router-dom';
import logo from '../assets/nav_logo.png'
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';


const Footer = () => {
  return (
    <div>
      <footer className="footer bg-black text-white p-10">
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
              <Link to='https://www.linkedin.com/in/shazzad-maruf/' target='_blank' className='font-bold text-3xl'>
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
  );
};

export default Footer;