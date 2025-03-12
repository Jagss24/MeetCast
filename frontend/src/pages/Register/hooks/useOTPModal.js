import { verifyOtp } from '@/api/api';
import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export const useOTPModal = ({ handleClose }) => {
  const { navigate } = useRouteHandlers();
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();
  const [inputs, setInputs] = useState(['', '', '', '']);
  const [currentFocus, setCurrentFocus] = useState(0);
  const emailId = sessionStorage.getItem('emailId');
  const hash = sessionStorage.getItem('hash');
  const inputRefs = useRef([
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]);

  const verifyOtpMutation = useMutation({
    mutationFn: (data) => verifyOtp(data),
    onError: (error) => {
      toast.error(error.response.data.message || 'Some error occured');
    },
  });

  const handleChange = (value, idx) => {
    if (Number.isInteger(+value) && +value < 10) {
      // If there is empty str like "" it will still be true.
      const newInputs = [...inputs];
      newInputs[idx] = value;
      setInputs(newInputs);
      if (value !== '' && idx + 1 < inputs.length) setCurrentFocus(idx + 1);
    }
  };

  const handleSubmit = ({ password }) => {
    const data = {
      otp: inputs.join(''),
      hash,
      emailId,
      password,
    };
    verifyOtpMutation.mutateAsync(data).then((verifyData) => {
      handleClose();
      getReLoginUser.refetch();
      localStorage.setItem('accessToken', verifyData?.data?.accessToken);
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
