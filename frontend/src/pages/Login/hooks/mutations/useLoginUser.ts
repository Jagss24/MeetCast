import { loginUser } from '@/api/auth/auth.api';
import { handleNetworkErrorToast } from '@/lib/toasts';
import { useMutation } from '@tanstack/react-query';

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onError: handleNetworkErrorToast,
  });
};
