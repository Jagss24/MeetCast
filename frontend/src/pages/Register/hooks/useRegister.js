import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { googleAuth, sendOtp } from '@/api/api';
import { useState } from 'react';
import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';

export const useRegister = () => {
  const { navigate } = useRouteHandlers();
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();

  const [isOTPOpenModal, setIsOTPOpenModal] = useState(false);
  const [password, setPassword] = useState('');
  const sendOtpMutation = useMutation({
    mutationFn: (data) => sendOtp(data),
    onError: (error) => toast.error(error.response.data.message),
  });

  const googleRegisterMutation = useMutation({
    mutationFn: (data) => googleAuth(data),
    onSuccess: (googleData) => {
      localStorage.setItem('accessToken', googleData?.data?.accessToken);
      getReLoginUser.refetch();
      navigate('/activate');
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'Some error occured');
    },
  });

  const handleGoogleRegister = ({ cred }) => {
    const data = { cred, mode: 'register' };
    googleRegisterMutation.mutate(data);
  };

  const handleEmailSubmission = ({ emailId, password }) => {
    if (!emailId || !password) {
      toast('Please enter all details');
      return;
    }
    sendOtpMutation
      .mutateAsync({
        emailId,
      })
      .then((data) => {
        sessionStorage.setItem('emailId', data?.data?.emailId);
        sessionStorage.setItem('hash', data?.data?.hash);
        setPassword(password);
        setIsOTPOpenModal(true);
      });
  };

  return {
    functions: { handleEmailSubmission, handleGoogleRegister },
    mutations: { sendOtpMutation },
    states: {
      isOTPOpenModal,
      setIsOTPOpenModal,
      password,
    },
  };
};
