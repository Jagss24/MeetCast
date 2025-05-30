import { useMutation } from '@tanstack/react-query';
import { googleAuth, loginUser } from '../../../api/api';
import toast from 'react-hot-toast';
import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';

export const useLogin = () => {
  const { navigate } = useRouteHandlers();
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();
  const loginMutation = useMutation({
    mutationFn: (data) => loginUser(data),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: (data) => googleAuth(data),
    onError: (error) => {
      toast.error(error.response.data.message || 'Some error occured');
    },
  });

  const handleLogin = ({ emailId, password }) => {
    if (!emailId || !password) {
      toast('Fill all the details');
      return;
    }
    loginMutation.mutateAsync({ emailId, password }).then((userData) => {
      if (userData?.data?.userDtos) {
        getReLoginUser.refetch();
        localStorage.setItem('accessToken', userData?.data?.accessToken);
        navigate('/rooms');
        return;
      }
    });
  };

  const handleGoogleLogin = (cred) => {
    const data = { cred, mode: 'login' };
    googleLoginMutation.mutateAsync(data).then((googleData) => {
      localStorage.setItem('accessToken', googleData?.data?.accessToken);
      getReLoginUser.refetch();
      navigate('/rooms');
    });
  };

  return {
    functions: { handleLogin, handleGoogleLogin },
    mutations: { loginMutation, googleLoginMutation },
  };
};
