import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleAuth, loginUser } from '../../../api/api';
import toast from 'react-hot-toast';
import { useAutoReLogin } from '@/hooks/useAutoReLogin';

export const useLogin = () => {
  const [inputType, setInputType] = useState('password');
  const navigate = useNavigate();
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
    states: { inputType, setInputType },
    functions: { handleLogin, handleGoogleLogin },
    mutations: { loginMutation, googleLoginMutation },
  };
};
