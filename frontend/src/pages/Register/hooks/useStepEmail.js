import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setOtp, setUser } from '@/slices/userSlice';
import { googleAuth, sendOtp } from '@/api/api';

export const useStepEmail = ({ setStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sendOtpMutation = useMutation({
    mutationFn: (data) => sendOtp(data),
    onError: (error) => toast.error(error.response.data.message),
  });

  const googleRegisterMutation = useMutation({
    mutationFn: (data) => googleAuth(data),
    onError: (error) => {
      toast.error(error.response.data.message || 'Some error occured');
    },
  });

  const handleGoogleRegister = ({ cred }) => {
    const data = { cred, mode: 'register' };
    googleRegisterMutation.mutateAsync(data).then((googleData) => {
      dispatch(setUser(googleData?.data?.userDtos));
      navigate('/activate');
    });
  };

  const handleEmailSubmission = ({ emailId }) => {
    if (!emailId) {
      toast('Please enter Email Id');
      return;
    }
    sendOtpMutation
      .mutateAsync({
        emailId,
      })
      .then((data) => {
        console.log('executed');
        dispatch(
          setOtp({ emailId: data?.data?.emailId, hash: data?.data?.hash })
        );
        setStep(2);
      });
  };

  return {
    functions: { handleEmailSubmission, handleGoogleRegister },
    mutations: { sendOtpMutation },
  };
};
