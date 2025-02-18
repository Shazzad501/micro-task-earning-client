import { useEffect, useState } from 'react';
import earnMore from '../../assets/Earnmore.jpg'
import useUserByEmail from '../../Hooks/useUserByEmail';
import { Link } from 'react-router-dom';
const EarnMore = () => {
  const [signInUser] = useUserByEmail();
  const [navigation, setNavigation] = useState('')
  const {  role } = signInUser || {};

    // get started btn navigation mathod
    useEffect(()=>{
      if(role === 'admin'){
        setNavigation('/dashboard/admin-home')
      }
      else if(role === 'buyer'){
        setNavigation('/dashboard/buyer-home')
      }
      else if(role === 'worker'){
        setNavigation('/dashboard/worker-home')
      }
      else{
        setNavigation('/signIn')
      }
    }, [role])
  return (
    <section className="bg-gradient-to-r from-[#0a2027] to-[#072129] py-12 text-white">
      <div className="max-w-7xl gap-5 mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Earn More with Our Platform</h2>
          <p className="mb-6">
            Join thousands of users who are making extra income by completing simple tasks. It’s easy, flexible, and rewarding.
          </p>
          <Link to={navigation} className="btn bg-transparent hover:bg-transparent text-white px-6 py-3 rounded-md hover:bg-white hover:text-black border border-white">
            Get Started
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src={earnMore}
            alt="Earn More"
            className="rounded-md shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default EarnMore;
