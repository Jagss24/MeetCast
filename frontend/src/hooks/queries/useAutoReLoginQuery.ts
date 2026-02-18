import { autoReLogin } from '@/api/auth/auth.api';
import { useQuery } from '@tanstack/react-query';

export const useAutoReLoginQuery = (
  { enableQuery = false }: { enableQuery: boolean } = { enableQuery: false }
) => {
  return useQuery({
    queryKey: ['user-login'],
    queryFn: autoReLogin,
    enabled: enableQuery,
  });
};
