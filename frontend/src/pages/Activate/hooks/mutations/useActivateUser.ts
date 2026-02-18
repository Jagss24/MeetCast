import { activateUser } from '@/api/activate/activate.api';
import { handleNetworkErrorToast } from '@/lib/toasts';
import { useMutation } from '@tanstack/react-query';

export const useActivateUser = () => {
  return useMutation({
    mutationFn: activateUser,
    onError: handleNetworkErrorToast,
  });
};
