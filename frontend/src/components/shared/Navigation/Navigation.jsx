import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationContainer, UserComponent } from './Navigation.styled.js';
import { HeadingLogo } from '../commonStyles/Card.styled';
import { useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../api/api.js';
import DummyImage from '../../DummyImage';
import { useLocation } from 'react-router-dom';
import { setIsNavbarVisible } from '../../../slices/utilitySlice.js';
import { ImPodcast } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import queryClient from '@/queryConfig/queryClient.config.js';
import { useAutoReLogin } from '@/hooks/useAutoReLogin.js';

const Navigation = () => {
  const {
    services: { getReLoginUser },
  } = useAutoReLogin();
  const user = getReLoginUser?.data?.data?.userData;
  const { isNavBarVisible } = useSelector((state) => state.utility);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      queryClient.setQueryData(['user-login'], null);
      getReLoginUser.refetch();
      navigate('/');
    },
  });

  useEffect(() => {
    const pathName = location.pathname.split('/')[1];
    if (pathName !== 'room') {
      dispatch(setIsNavbarVisible(true));
      return;
    }
  }, [location.pathname]);

  return isNavBarVisible ? (
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
            {!window.location.pathname.includes('profile') && (
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
