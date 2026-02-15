import { googleAuth } from '@/api/auth/auth.api';
import { handleNetworkErrorToast } from '@/lib/toasts';
import { useMutation } from '@tanstack/react-query';

export const useGoogleAuth = () => {
  return useMutation({
    mutationFn: googleAuth,
    onSuccess: (googleData) => {
      localStorage.setItem('accessToken', googleData.accessToken);
    },
    onError: handleNetworkErrorToast,
  });
};
