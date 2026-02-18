import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';
import { useGoogleAuth } from '@/hooks/mutations/useGoogleAuth';
import type { IGoogleAuthSubmitSchema } from '@/api/auth/autht.types';
import { useLoginUser } from './mutations/useLoginUser';

export const useLogin = () => {
  const { navigate } = useRouteHandlers();
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();
  const loginMutation = useLoginUser();

  const googleLoginMutation = useGoogleAuth();

  const handleLogin = ({
    emailId,
    password,
  }: {
    emailId: string;
    password: string;
  }) => {
    loginMutation.mutateAsync({ emailId, password }).then((userData) => {
      if (userData.userDtos) {
        getReLoginUser.refetch();
        localStorage.setItem('accessToken', userData.accessToken);
        navigate('/rooms');
        return;
      }
    });
  };

  const handleGoogleLogin = (cred: string) => {
    const data = { cred, mode: 'login' } as IGoogleAuthSubmitSchema;
    googleLoginMutation.mutateAsync(data).then((googleData) => {
      localStorage.setItem('accessToken', googleData.accessToken);
      getReLoginUser.refetch();
      navigate('/rooms');
    });
  };

  return {
    functions: { handleLogin, handleGoogleLogin },
    mutations: { loginMutation, googleLoginMutation },
  };
};
