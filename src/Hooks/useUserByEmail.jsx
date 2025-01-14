import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserByEmail = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()

  const {data: sigleUser={}, refetch, isPending: sigleUserPending} = useQuery({
    queryKey: [user?.email, 'sigleUser'],
    queryFn: async()=>{
      const res = await axiosSecure.get(`/users/${user?.email}`)
      return res.data;
    }
  })
  return [sigleUser, refetch, sigleUserPending]
};

export default useUserByEmail;