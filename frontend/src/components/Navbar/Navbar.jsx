import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/api/api.js';
import DummyImage from '../DummyImage.jsx';
import { FaUserCircle } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import queryClient from '@/queryConfig/queryClient.config.js';
import { useAutoReLogin } from '@/hooks/useAutoReLogin.js';
import { useRouteHandlers } from '@/hooks/useRouteHandlers.ts';
import { Podcast } from 'lucide-react';
import { useState } from 'react';
import {
  PROFILE_URL_KEYS,
  ROOM_TYPES,
} from '@/pages/Profile/profile.constants.js';

const Navbar = () => {
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();
  const user = getReLoginUser?.data?.data?.userData;
  const { paramsObject, navigate, navigateTo, subRoute } = useRouteHandlers();
  const [showUserModal, setShowUserModal] = useState(false);

  const isOnMeetorPodCast = ['podcast', 'meet'].some((key) =>
    paramsObject.hasOwnProperty(key)
  );

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      queryClient.setQueryData(['user-login'], null);
      getReLoginUser.refetch();
      navigate('/');
    },
  });

  return !isOnMeetorPodCast ? (
    <nav className='w-full flex justify-between items-center px-4 py-2 bg-secondary '>
      <Link to='/' className='flex items-center gap-2 '>
        <Podcast className='size-6' />
        <span className='text-base'>MeetCast</span>
      </Link>
      {user?.userName && (
        <div
          className='relative cursor-pointer'
          onClick={() => setShowUserModal((prev) => !prev)}>
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt='user_pic'
              referrerPolicy='no-referrer'
              className='size-12 rounded-full object-cover'
            />
          ) : (
            <DummyImage
              width={40}
              height={40}
              userName={user?.userName?.charAt(0).toUpperCase()}
            />
          )}
          {showUserModal && (
            <div className='absolute top-full right-0 bg-secondary w-[150px] border border-gray rounded z-10'>
              <p
                className='flex items-center gap-2 p-2 border-b border-gray'
                onClick={() => {
                  {
                    if (subRoute === user?.userName) {
                      return;
                    }
                    navigateTo({
                      to: { [PROFILE_URL_KEYS?.activeRoomType]: ROOM_TYPES[0] },
                      url: `/profile/${user?.userName}`,
                    });
                  }
                }}>
                <span>
                  <FaUserCircle />
                </span>
                View Profile
              </p>
              <p
                className='flex items-center gap-2 p-2'
                onClick={logoutMutation.mutate}>
                <span>
                  <IoLogOutOutline />
                </span>
                Logout
              </p>
            </div>
          )}
        </div>
      )}
    </nav>
  ) : (
    <></>
  );
};

export default Navbar;
