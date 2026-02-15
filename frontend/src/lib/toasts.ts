import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

function handleSuccessToast(message: string) {
  toast.success(message);
}

function handleErrorToast(message: string) {
  toast.error(message);
}
function handleNetworkErrorToast(error: Error | AxiosError) {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message ?? 'Something went wrong');
  } else {
    toast.error('Something went wrong');
  }
}

export { handleSuccessToast, handleErrorToast, handleNetworkErrorToast };
