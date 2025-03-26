import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';
import { PROFILE_URL_KEYS, ROOM_TYPES } from '../profile.constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getSpeakers,
  getUserbyUserName,
  getUserRoom,
  photoUpdation,
} from '@/api/api';
import queryClient from '@/queryConfig/queryClient.config';

export const useProfile = () => {
  const {
    subRoute: userName,
    navigate,
    navigateTo,
    paramsObject,
  } = useRouteHandlers();
  const activeRoomType =
    paramsObject?.[PROFILE_URL_KEYS.activeRoomType] || 'rooms';
  const {
    services: { getReLoginUser },
  } = useAutoReLogin({});
  const profileData = useQuery({
    queryKey: ['profile-data', userName],
    queryFn: () => getUserbyUserName(userName),
    enabled: !!userName,
  });

  const roomData = useQuery({
    queryKey: ['get-room'],
    queryFn: () => getUserRoom(userName),
    enabled: activeRoomType !== 'speakingRooms',
  });

  const speakersRoomData = useQuery({
    queryKey: ['get-user-speakersRoom', userName],
    queryFn: () => getSpeakers(userName),
    enabled: activeRoomType === 'speakingRooms',
  });

  const userInfoUpdateMutation = useMutation({
    mutationFn: photoUpdation,
    onSuccess: (data) => {
      toast(data?.data?.message);
      profileData?.refetch();
      queryClient.invalidateQueries({ queryKey: ['user-login'] });
    },
  });

  const uploadImage = (e, type) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      userInfoUpdateMutation.mutate({
        userId: getReLoginUser?.data?.data?.userData?.id,
        photo: reader.result,
        type,
      });
    };
    reader.readAsDataURL(file);
  };

  return {
    services: { getReLoginUser, profileData, roomData, speakersRoomData },
    mutations: { userInfoUpdateMutation },
    functions: { uploadImage },
    routing: { navigate, activeRoomType, navigateTo },
  };
};
