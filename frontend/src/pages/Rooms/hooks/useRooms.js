import { getRooms } from '@/api/api';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ROOM_URL_KEYS } from '../room.constants';

export const useRooms = () => {
  const { navigateTo, paramsObject } = useRouteHandlers();
  const roomTopic = paramsObject?.[ROOM_URL_KEYS.topic];
  const [showModal, setShowModal] = useState(false);
  const getAllRooms = useQuery({
    queryKey: ['get-rooms', roomTopic],
    queryFn: () => getRooms(roomTopic || ''),
  });

  return {
    services: { getAllRooms },
    states: { showModal, setShowModal },
    routing: { navigateTo, roomTopic },
  };
};
