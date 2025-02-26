import { verifyOtp } from '@/api/api';
import { setUser } from '@/slices/userSlice';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useOTPModal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(['', '', '', '']);
  const [currentFocus, setCurrentFocus] = useState(0);
  const { otp } = useSelector((state) => state.user);
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
      hash: otp.hash,
      emailId: otp.emailId,
      password,
    };
    verifyOtpMutation.mutateAsync(data).then((verifyData) => {
      dispatch(setUser(verifyData?.data?.userData));
      handleClose();
      localStorage.setItem('accessToken', verifyData?.data?.accessToken);
      navigate('/activate');
    });
  };

  return {
    states: { inputs, currentFocus },
    refs: { inputRefs },
    functions: { handleSubmit, handleChange },
    mutations: { verifyOtpMutation },
  };
};
