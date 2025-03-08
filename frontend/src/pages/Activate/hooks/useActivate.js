import { activate } from '@/api/api';
import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useActivate = () => {
  const [avatar, setAvatar] = useState('');
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();
  const user = getReLoginUser?.data?.data?.userData;
  const { navigate } = useRouteHandlers();

  const activateMutation = useMutation({
    mutationFn: (data) => activate(data),
    onSuccess: () => {
      getReLoginUser.refetch();
      navigate('/rooms');
    },
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
      if (!data.userName) {
        toast('Please set your username');
        return;
      }
    } else {
      if (!data.fullName || !data.userName) {
        toast('Please fill all the details');
        return;
      }
    }
    activateMutation.mutate(data);
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
