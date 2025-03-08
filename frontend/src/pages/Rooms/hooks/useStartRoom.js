import { useState } from 'react';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';
import {
  ACCESSIBILITY_TYPES,
  ROOM_TYPES,
  TOPIC_OPTIONS,
} from '../room.constants';
import { useAutoReLogin } from '@/hooks/useAutoReLogin';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createRoom } from '@/api/api';
import { searchUser } from '@/api/api';

export const useStartRoom = () => {
  const { navigate, navigateTo, paramsObject } = useRouteHandlers();

  const activeRoom = paramsObject.roomType || '';
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();

  const createRoomMutation = useMutation({
    mutationFn: (data) => createRoom(data),
    onError: (error) => {
      toast.error(error.response.data.message || 'Some error occured');
    },
  });
  const [accessibility, setAccessibility] = useState(ACCESSIBILITY_TYPES[0]);
  const [selectedOption, setSelectedOption] = useState({
    label: '',
    value: '',
  });
  const [selectedUser, setSelectedUser] = useState([]);

  const user = getReLoginUser?.data?.data?.userData;

  const handleCreateRoom = ({
    topic,
    description,
    activeRoom,
    selectedOption,
  }) => {
    if (topic.split(' ').length < 2) {
      toast.error('Topic should be atleast of 2 words');
      return;
    }
    if (description.length < 50) {
      toast.error('Description should be of minimum 50 words');
      return;
    }
    if (activeRoom === 'podcast' && !selectedOption?.value) {
      toast.error('Select any option that you want to speak about');
      return;
    }
    createRoomMutation
      .mutateAsync({
        topic,
        description,
        roomType: activeRoom,
        accessibility: activeRoom === 'meet' ? 'private' : accessibility,
        aboutWhat: activeRoom === 'podcast' && selectedOption.value,
        speakers: selectedUser,
      })
      .then((roomData) => {
        const roomId = roomData?.data?.roomDtos?.id;
        navigate(`/room/${roomId}`);
      });
  };

  const handleActiveRoom = ({ roomType }) => {
    navigateTo({ to: { roomType: roomType.name } });
  };

  const loadOptions = async (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      try {
        const result = await searchUser(inputValue);
        const fetchedUsers = result.data.users
          .filter((eachUser) => eachUser._id !== user.id)
          .map((user) => ({
            value: user._id,
            label: user.fullName,
            avatar: user.avatar,
            userName: user.userName,
          }));
        callback(fetchedUsers);
      } catch (error) {
        callback([]);
      }
    }
  };

  const handleChange = (selected) => {
    if (selected.length > 3) {
      toast.error('You can only select up to 3 options.');
      return; // Prevent updating state with more than 3 options
    }
    setSelectedUser(selected);
  };

  return {
    functions: {
      handleCreateRoom,
      handleChange,
      loadOptions,
      handleActiveRoom,
    },
    states: {
      TOPIC_OPTIONS,
      ROOM_TYPES,
      activeRoom,
      selectedOption,
      accessibility,
      selectedUser,
    },
    setStates: { setAccessibility, setSelectedOption, setSelectedUser },
    routing: { activeRoom },
  };
};
