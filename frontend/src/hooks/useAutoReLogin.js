import { autoReLogin } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAutoReLogin = ({ enableQuery = false } = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const getReLoginUser = useQuery({
    queryKey: ['user-login'],
    queryFn: () => autoReLogin(),
    retry: 0,
    enabled: enableQuery,
  });

  useEffect(() => {
    if (getReLoginUser?.isFetching || getReLoginUser?.isLoading) {
      return () => {};
    }
    if (getReLoginUser?.isError) {
      if (
        location.pathname === '/login' ||
        location.pathname === '/register' ||
        location.pathname === '/'
      ) {
        console.log('hello');
        navigate({ pathname: location.pathname }, { replace: true });
        return;
      }
      navigate({ pathname: '/login' });
    } else {
      navigate({ pathname: location.pathname }, { replace: true });
    }
  }, [getReLoginUser?.isFetching || getReLoginUser?.isLoading]);

  return { services: { getReLoginUser } };
};
