import { useQuery } from '@tanstack/react-query';
import api from '@/app/api';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export function useAuth() {
  const { data: user } = useQuery<User>({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const response = await api.get('/user/me');
      return response.data;
    },
  });

  return {
    user,
    isAuthenticated: !!user,
  };
} 