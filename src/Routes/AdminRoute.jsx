import { Navigate, useLocation } from 'react-router-dom';
import useUserByEmail from '../Hooks/useUserByEmail';

const AdminRoute = ({children}) => {
  const [signInUser] = useUserByEmail()
  const {role} = signInUser || {}
  const location = useLocation();

  if(role === 'admin'){
    return children;
  }
  return <Navigate state={{from:location}}></Navigate>;
};

export default AdminRoute;