import {
  addMemberToRoom,
  getSingleRoom,
  removeMemberFromRoom,
  requestToJoinRoom,
} from '@/api/api';
import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useSingleRoom = () => {
  const { subRoute: roomId, navigateTo, navigate } = useRouteHandlers();
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();
  const loggedInUser = getReLoginUser?.data?.data?.userData;

  // Queries & Mutations
  const getSingleRoomService = useQuery({
    queryKey: ['get-single-room', roomId],
    queryFn: () => getSingleRoom(roomId),
  });
  const roomData = getSingleRoomService?.data?.data?.roomDtos;

  const requestMutation = useMutation({
    mutationFn: requestToJoinRoom,
    onSuccess: (reqJoinData) => {
      toast.success(reqJoinData?.data?.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'Some error occured');
    },
  });

  const addMemberMutation = useMutation({
    mutationFn: addMemberToRoom,
    onSuccess: (addMemData) => {
      toast.success(addMemData?.data?.message);
      getSingleRoomService.refetch();
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'Some error occured');
    },
  });

  const removeMemberMutation = useMutation({
    mutationFn: removeMemberFromRoom,
    onSuccess: (removeMemData) => {
      toast.success(removeMemData?.data?.message);
      getSingleRoomService.refetch();
    },
    onError: (error) => {
      toast.error(error.response.data.message || 'Some error occured');
    },
  });

  //Functions
  const handleJoinRoom = () => {
    if (
      roomData?.accessibility === 'private' &&
      loggedInUser?.id !== roomData?.ownerId?._id
    ) {
      const userisInMemberList = roomData?.memberList?.some(
        (eachId) => eachId?._id === loggedInUser?.id
      );
      if (userisInMemberList) {
        navigateTo({ url: `/meet/${roomData?.id}` });
      } else {
        requestMutation.mutate({
          userId: loggedInUser?.id,
          roomId: roomData?.id,
        });
      }
    } else {
      navigateTo({ url: `/meet/${roomData?.id}` });
    }
  };

  const handleIsSpeaker = (userId) => {
    const isUserSpeaker =
      getSingleRoomService?.data?.data?.roomDtos?.speakers.find(
        (speaker) => speaker?._id === userId
      );

    if (isUserSpeaker) {
      return true;
    }
    return false;
  };

  return {
    services: { getSingleRoomService, getReLoginUser },
    mutations: { addMemberMutation, removeMemberMutation, requestMutation },
    function: { handleIsSpeaker, handleJoinRoom },
    routing: {
      roomId,
      navigate,
      navigateTo,
    },
    states: { loggedInUser, roomData },
  };
};
