import { useRouteHandlers } from './useRouteHandlers';
import { useAutoReLogin } from './useAutoReLogin';
import { useQuery } from '@tanstack/react-query';
import { getSingleRoom } from '@/api/api';

export const useWebRTC = () => {
  const { subRoute: roomId, navigateTo } = useRouteHandlers();

  const {
    services: { getReLoginUser },
  } = useAutoReLogin({});
  const user = getReLoginUser?.data?.data?.userData;
  const getSingleRoomService = useQuery({
    queryKey: ['get-single-room', roomId],
    queryFn: () => getSingleRoom(roomId),
    enabled: !!roomId,
  });
  const roomData = getSingleRoomService?.data?.data?.roomDtos;

  return { states: { user, roomData }, routing: { navigateTo, roomId } };
};
