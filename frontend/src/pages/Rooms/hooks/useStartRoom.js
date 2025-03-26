import { useState } from 'react';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';
import { ROOM_URL_KEYS } from '../room.constants';
import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createRoom } from '@/api/api';
import { searchUser } from '@/api/api';

export const useStartRoom = () => {
  const { navigateTo } = useRouteHandlers();

  const [visibility, setVisibility] = useState('public');
  const [allCanSpeak, setAllCanSpeak] = useState(false);
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
        accessibility: visibility,
        aboutWhat: selectedOption.name,
        allCanSpeak,
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
      selectedOption,
      selectedUser,
      userQuery,
      listOfUsers,
      visibility,
      allCanSpeak,
    },
    setStates: {
      setVisibility,
      setSelectedOption,
      setSelectedUser,
      setUserQuery,
      setAllCanSpeak,
    },
  };
};
