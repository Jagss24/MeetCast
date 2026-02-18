import { sendOTP } from '@/api/auth/auth.api';
import { handleNetworkErrorToast } from '@/lib/toasts';
import { useMutation } from '@tanstack/react-query';

export const useSendOTP = () => {
  return useMutation({
    mutationFn: sendOTP,
    onError: handleNetworkErrorToast,
  });
};
