import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Loading from '../Shared/Loading';



const PrivateRoute = ({children}) => {
  const {user, loading}= useAuth()
  const location = useLocation();
  if(loading){
    return <Loading/>
  }
  if(user && user?.email){
    return children;
  }
  return <Navigate state={{from:location}} to='/signIn'></Navigate>;
};

export default PrivateRoute;