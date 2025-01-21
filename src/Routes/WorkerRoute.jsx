import { Navigate, useLocation } from 'react-router-dom';
import useUserByEmail from '../Hooks/useUserByEmail';

const WorkerRoute = ({children}) => {
  const [signInUser] = useUserByEmail()
  const {role} = signInUser || {}
  const location = useLocation();

  if(role === 'worker'){
    return children;
  }
  return <Navigate state={{from:location}}></Navigate>;
};

export default WorkerRoute;