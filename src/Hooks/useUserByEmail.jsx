import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserByEmail = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()

  const {data: loginUser={}, refetch, isPending: loginUserPending} = useQuery({
    queryKey: [user?.email, 'loginUser'],
    queryFn: async()=>{
      const res = await axiosSecure.get(`/users/${user?.email}`)
      return res.data;
    }
  })
  return [loginUser, refetch, loginUserPending]
};

export default useUserByEmail;