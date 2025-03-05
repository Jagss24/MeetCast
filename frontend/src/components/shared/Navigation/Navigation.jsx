import { Link } from 'react-router-dom';
import { NavigationContainer, UserComponent } from './Navigation.styled.js';
import { HeadingLogo } from '../commonStyles/Card.styled';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../../../api/api.js';
import DummyImage from '../../DummyImage';
import { ImPodcast } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import queryClient from '@/queryConfig/queryClient.config.js';
import { useAutoReLogin } from '@/hooks/useAutoReLogin.js';
import { useRouteHandlers } from '@/hooks/useRouteHandlers.ts';

const Navigation = () => {
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();
  const user = getReLoginUser?.data?.data?.userData;
  const { paramsObject, navigate, route } = useRouteHandlers();

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
    <NavigationContainer>
      <Link to='/' className='logo_wrapper'>
        <HeadingLogo>
          <ImPodcast style={{ color: 'var(--button-color)' }} />
        </HeadingLogo>
        <span>MeetCast</span>
      </Link>

      {user?.userName && (
        <UserComponent
          onClick={() => {
            const userModal = document.querySelector('.user-modal');
            if (userModal.classList.contains('open'))
              userModal.classList.remove('open');
            else {
              userModal.classList.add('open');
            }
          }}>
          <div>
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt='user_pic'
                referrerPolicy='no-referrer'
              />
            ) : (
              <DummyImage
                width={40}
                height={40}
                userName={user?.userName?.charAt(0).toUpperCase()}
              />
            )}
          </div>
          <div className='user-modal'>
            {route !== 'profile' && (
              <p onClick={() => navigate(`/profile/${user?.userName}`)}>
                View Profile
                <span>
                  <FaUserCircle />
                </span>
              </p>
            )}
            <p onClick={logoutMutation.mutate}>
              Logout
              <span>
                <IoLogOutOutline />
              </span>
            </p>
          </div>
        </UserComponent>
      )}
    </NavigationContainer>
  ) : (
    <></>
  );
};

export default Navigation;
