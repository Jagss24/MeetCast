import { useState } from 'react';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';
import { ROOM_TYPES, ROOM_URL_KEYS, TOPIC_OPTIONS } from '../room.constants';
import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createRoom } from '@/api/api';
import { searchUser } from '@/api/api';

export const useStartRoom = () => {
  const { navigateTo, paramsObject } = useRouteHandlers();

  const activeRoom = paramsObject?.[ROOM_URL_KEYS.roomType] || '';
  const visibility = paramsObject?.[ROOM_URL_KEYS.visibility] || '';
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();
  const user = getReLoginUser?.data?.data?.userData;

  const createRoomMutation = useMutation({
    mutationFn: (data) => createRoom(data),
    onError: (error) => {
      toast.error(error.response.data.message || 'Some error occured');
    },
  });
  const [selectedOption, setSelectedOption] = useState({
    id: '',
    name: '',
  });
  const [selectedUser, setSelectedUser] = useState([]);
  const [userQuery, setUserQuery] = useState('');

  const usersServices = useQuery({
    queryKey: ['users', userQuery],
    queryFn: () => searchUser(userQuery),
    enabled: !!userQuery,
  });

  const listOfUsers =
    usersServices.data?.data?.users
      .filter((eachUser) => eachUser._id !== user.id)
      .map((user) => ({
        id: user._id,
        name: user.fullName,
      })) || [];

  const handleCreateRoom = ({ topic, description }) => {
    createRoomMutation
      .mutateAsync({
        topic,
        description,
        roomType: activeRoom,
        accessibility: activeRoom === 'meet' ? 'private' : visibility,
        aboutWhat: activeRoom === 'podcast' && selectedOption.name,
        speakers: selectedUser,
      })
      .then((roomData) => {
        const roomId = roomData?.data?.roomDtos?.id;
        navigateTo({
          url: `/room/${roomId}`,
          remove: Object.values(ROOM_URL_KEYS),
        });
      });
  };

  return {
    functions: {
      handleCreateRoom,
    },
    states: {
      TOPIC_OPTIONS,
      ROOM_TYPES,
      activeRoom,
      selectedOption,
      selectedUser,
      userQuery,
      listOfUsers,
    },
    setStates: {
      setSelectedOption,
      setSelectedUser,
      setUserQuery,
    },
    routing: { navigateTo, activeRoom, visibility },
  };
};
