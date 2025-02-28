import { activate } from '@/api/api';
import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { setUser } from '@/slices/userSlice';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useActivate = () => {
  const [avatar, setAvatar] = useState('');
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();
  const user = getReLoginUser?.data?.data?.userData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activateMutation = useMutation({
    mutationFn: (data) => activate(data),
    onError: (error) => {
      toast.error(error.response.data.message || 'Some error occured');
    },
  });

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (
      (file?.type === 'image/png' || file?.type === 'image/jpeg') &&
      file?.size <= 5 * 1024 * 1024
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (file?.size > 5 * 1024 * 1024) {
      setWrongImgType(false);
      toast('File size should not exceed 5MB.');
    }
  };

  const handleSubmit = (data) => {
    if (user?.signedUpwithGoogle) {
      if (!data.name) {
        toast('Please set your username');
        return;
      }
    } else {
      if (!data.fullName || !data.userName) {
        toast('Please fill all the details');
        return;
      }
    }
    activateMutation.mutateAsync(data).then((activatedData) => {
      dispatch(setUser(activatedData?.data?.userData));
      navigate('/rooms');
    });
  };

  return {
    functions: { handleSubmit, uploadImage },
    states: {
      user,
      avatar,
    },
    mutations: { activateMutation },
  };
};
