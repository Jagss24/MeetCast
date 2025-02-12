import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleAuth, loginUser } from '../../../api/api';
import { setUser } from '../../../slices/userSlice';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const [inputType, setInputType] = useState('password');
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      dispatch(setUser(userData?.data?.userDtos));
      navigate('/rooms');
    });
  };

  const handleGoogleLogin = (cred) => {
    const data = { cred, mode: 'login' };
    googleLoginMutation.mutateAsync(data).then((googleData) => {
      dispatch(setUser(googleData?.data?.userDtos));
      navigate('/rooms');
    });
  };

  return {
    states: { inputType, setInputType },
    functions: { handleLogin, handleGoogleLogin },
    mutations: { loginMutation, googleLoginMutation },
  };
};
