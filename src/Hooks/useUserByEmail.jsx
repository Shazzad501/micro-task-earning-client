import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserByEmail = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()

  const {data: signInUser={}, refetch, isPending: signInUserPending} = useQuery({
    queryKey: [user?.email, 'signInUser'],
    queryFn: async()=>{
      const res = await axiosSecure.get(`/users/${user?.email}`)
      return res.data;
    },
    enabled: !! user?.email,
  })
  return [signInUser, refetch, signInUserPending]
};

export default useUserByEmail;