import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Shared/Loading';
import useUserByEmail from '../Hooks/useUserByEmail';

const BuyerRoute = ({children}) => {
  const [signInUser, signInUserPending] = useUserByEmail()
  const {role} = signInUser || {}
  const location = useLocation();

  // if(signInUserPending){
  //   return <Loading/>
  // }
  if(role === 'buyer'){
    return children;
  }
  return <Navigate state={{from:location}} to='/signIn'></Navigate>;
};

export default BuyerRoute;