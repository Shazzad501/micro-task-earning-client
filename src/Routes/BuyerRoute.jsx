import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Shared/Loading';
import useUserByEmail from '../Hooks/useUserByEmail';

const BuyerRoute = ({children}) => {
  const [signInUser] = useUserByEmail()
  const {role} = signInUser || {}
  const location = useLocation();

  if(role === 'buyer'){
    return children;
  }
  return <Navigate state={{from:location}}></Navigate>;
};

export default BuyerRoute;