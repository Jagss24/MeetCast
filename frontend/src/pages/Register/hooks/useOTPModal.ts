import { verifyOtp } from '@/api/auth/auth.api';
import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';
import { handleNetworkErrorToast } from '@/lib/toasts';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';

export const useOTPModal = () => {
  const { navigate } = useRouteHandlers();
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();
  const [inputs, setInputs] = useState(['', '', '', '']);
  const [currentFocus, setCurrentFocus] = useState(0);
  const emailId = sessionStorage.getItem('emailId') || '';
  const hash = sessionStorage.getItem('hash') || '';

  const inputRefs = useRef<React.MutableRefObject<null | HTMLInputElement>[]>([
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]);

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onError: handleNetworkErrorToast,
  });

  const handleChange = (value: string, idx: number) => {
    if (Number.isInteger(+value) && +value < 10) {
      // If there is empty str like "" it will still be true.
      const newInputs = [...inputs];
      newInputs[idx] = value;
      setInputs(newInputs);
      if (value !== '' && idx + 1 < inputs.length) setCurrentFocus(idx + 1);
    }
  };

  const handleSubmit = async ({ password }: { password: string }) => {
    const data = {
      otp: inputs.join(''),
      hash,
      emailId,
      password,
    };
    return verifyOtpMutation.mutateAsync(data).then((verifyData) => {
      getReLoginUser.refetch();
      localStorage.setItem('accessToken', verifyData?.accessToken);
      navigate('/activate');
    });
  };

  return {
    states: { inputs, currentFocus, setCurrentFocus },
    refs: { inputRefs },
    functions: { handleSubmit, handleChange },
    mutations: { verifyOtpMutation },
  };
};
