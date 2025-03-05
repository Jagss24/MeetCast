import { autoReLogin } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRouteHandlers } from './useRouteHandlers';

export const useAutoReLogin = ({ enableQuery = false } = {}) => {
  const { navigate, route } = useRouteHandlers();
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
      if (route === 'login' || route === 'register' || route === '') {
        navigate({ pathname: `/${route}` }, { replace: true });
        return;
      }
      navigate({ pathname: 'login' });
    } else {
      const isUserActivated = getReLoginUser.data.data.userData.activated;
      if (route === '') {
        navigate({ pathname: route }, { replace: true });
      } else if (['login', 'register', 'activate', 'rooms'].includes(route)) {
        if (isUserActivated) {
          navigate({ pathname: '/rooms' }, { replace: true });
        } else {
          navigate({ pathname: '/activate' }, { replace: true });
        }
      }
    }
  }, [getReLoginUser?.isFetching || getReLoginUser?.isLoading]);

  return { services: { getReLoginUser } };
};
