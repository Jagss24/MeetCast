import { autoReLogin } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRouteHandlers } from './useRouteHandlers';
import type { AxiosResponse } from 'axios';
import type { IUserData } from '@/api/auth/autht.types';

export const useAutoReLogin = ({ enableQuery = false } = {}) => {
  const { navigate, route } = useRouteHandlers();
  const getReLoginUser = useQuery({
    queryKey: ['user-login'],
    queryFn: (): Promise<AxiosResponse<{ userData: IUserData }, any>> =>
      autoReLogin(),
    retry: 0,
    enabled: enableQuery,
  });

  useEffect(() => {
    if (getReLoginUser?.isFetching || getReLoginUser?.isLoading) {
      return;
    }
    if (getReLoginUser?.isError) {
      if (route === 'login' || route === 'register' || route === '') {
        navigate({ pathname: `/${route}` }, { replace: true });
        return;
      }
      navigate({ pathname: 'login' });
    } else {
      const isUserActivated = getReLoginUser.data?.data.userData.activated;
      if (route === '') {
        navigate({ pathname: route }, { replace: true });
      } else if (
        route &&
        ['login', 'register', 'activate', 'rooms'].includes(route)
      ) {
        if (isUserActivated) {
          navigate({ pathname: '/rooms' }, { replace: true });
        } else {
          navigate({ pathname: '/activate' }, { replace: true });
        }
      }
    }
    return;
  }, [getReLoginUser?.isFetching || getReLoginUser?.isLoading]);

  return { services: { getReLoginUser } };
};
