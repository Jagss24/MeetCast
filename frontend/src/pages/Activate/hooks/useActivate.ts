import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';
import { useState } from 'react';
import { useActivateUser } from './mutations/useActivateUser';
import { handleErrorToast } from '@/lib/toasts';
import type { IActivateSubmitSchema } from '@/api/activate/activate.type';

export const useActivate = () => {
  const [avatar, setAvatar] = useState('');
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();
  const user = getReLoginUser?.data?.data?.userData;
  const { navigate } = useRouteHandlers();

  const activateMutation = useActivateUser();

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (
      ['image/png', 'image/jpeg'].includes(file.type) &&
      file?.size <= 5 * 1024 * 1024
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (file?.size > 5 * 1024 * 1024) {
      handleErrorToast('File size should not exceed 5MB.');
    } else if (!['image/png', 'image/jpeg'].includes(file.type)) {
      handleErrorToast('File type should be png or jpeg');
    }
  };

  const handleSubmit = (data: IActivateSubmitSchema) => {
    activateMutation.mutateAsync(data).then(() => {
      getReLoginUser.refetch();
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
