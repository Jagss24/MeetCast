import { useState } from 'react';
import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';
import { useGoogleAuth } from '@/hooks/mutations/useGoogleAuth';
import type { IGoogleAuthSubmitSchema } from '@/api/auth/autht.types';
import { useSendOTP } from './mutations/useSendOTP';

export const useRegister = () => {
  const { navigate } = useRouteHandlers();
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();

  const [isOTPOpenModal, setIsOTPOpenModal] = useState(false);
  const [password, setPassword] = useState('');

  const sendOtpMutation = useSendOTP();
  const googleMutation = useGoogleAuth();

  const handleGoogleRegister = (cred: string) => {
    const data: IGoogleAuthSubmitSchema = { cred, mode: 'register' };
    googleMutation.mutateAsync(data).then(() => {
      getReLoginUser.refetch();
      navigate('/activate');
    });
  };

  const handleEmailSubmission = ({
    emailId,
    password,
  }: {
    emailId: string;
    password: string;
  }) => {
    sendOtpMutation
      .mutateAsync({
        emailId,
      })
      .then((data) => {
        sessionStorage.setItem('emailId', data.emailId);
        sessionStorage.setItem('hash', data.hash);
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
