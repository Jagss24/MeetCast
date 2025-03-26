import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/api/api.js';
import DummyImage from '../DummyImage.jsx';
import queryClient from '@/queryConfig/queryClient.config.js';
import { useAutoReLogin } from '@/hooks/useAutoReLogin.js';
import { useRouteHandlers } from '@/hooks/useRouteHandlers.ts';
import { LogOut, Podcast, UserRound } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();
  const user = getReLoginUser?.data?.data?.userData;
  const { navigate, navigateTo, subRoute } = useRouteHandlers();
  const [showUserModal, setShowUserModal] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      queryClient.setQueryData(['user-login'], null);
      getReLoginUser.refetch();
      navigate('/');
    },
  });

  return (
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
              userName={user?.userName?.charAt(0).toUpperCase()}
              className='w-10 h-10'
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
                      url: `/profile/${user?.userName}`,
                    });
                  }
                }}>
                <span>
                  <UserRound className='size-4' />
                </span>
                View Profile
              </p>
              <p
                className='flex items-center gap-2 p-2'
                onClick={logoutMutation.mutate}>
                <span>
                  <LogOut className='size-4' />
                </span>
                Logout
              </p>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
