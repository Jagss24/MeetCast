import React from 'react';
import RoomCard from '../Rooms/components/RoomCard/RoomCard';
import DummyImage from '@/components/DummyImage';
import { ThreeDots } from 'react-loading-icons';
import UIPageWrapper from '@/components/ui/UIPageWrapper';
import { Camera, ChevronLeft } from 'lucide-react';
import { useProfile } from './hooks/useProfile';
import { PROFILE_URL_KEYS, ROOM_TYPES } from './profile.constants';
import AboutModal from './components/AboutModal';
import UiButton from '@/components/ui/UiButton';

const Profile = () => {
  const {
    services: { getReLoginUser, profileData, roomData, speakersRoomData },
    functions: { uploadImage },
    routing: { navigate, activeRoomType, navigateTo },
  } = useProfile();

  const loggedInUser = getReLoginUser?.data?.data?.userData;
  const profileUserData = profileData?.data?.data?.userData;
  const rooms =
    roomData?.data?.data?.roomDtos ||
    speakersRoomData?.data?.data?.roomDtos ||
    [];
  return profileData?.isLoading || getReLoginUser?.isLoading ? (
    <UIPageWrapper classname='flex flex-col gap-4 items-center justify-center'>
      <ThreeDots />
      <h3>Getting user info</h3>
    </UIPageWrapper>
  ) : (
    <UIPageWrapper>
      <section className='relative'>
        <img
          src={profileUserData?.coverPhoto || '/images/bgm.jpg'}
          alt='cover_img'
          className='h-[200px] w-full'
        />
        <UiButton
          icon={<ChevronLeft className='size-5 text-white' />}
          className='w-10 h-10 absolute left-4 top-4 bg-black/40 p-2 rounded-full cursor-pointer focus:border focus:border-white'
          onClick={() => navigate('/rooms')}
        />

        {loggedInUser?.id === profileUserData?.id && (
          <>
            <label
              className='absolute right-4 top-4 bg-black/40 p-2 rounded-full cursor-pointer'
              htmlFor='cover_picker'>
              <Camera className='size-5' />
            </label>
            <input
              type='file'
              id='cover_picker'
              onChange={(e) => uploadImage(e, 'Cover Photo')}
              accept='image/png, image/jpeg'
              className='hidden'
            />
          </>
        )}
      </section>
      <section className='relative flex items-start gap-8 px-8'>
        <div className='flex items-center justify-center relative'>
          {profileUserData?.avatar ? (
            <img
              src={profileUserData?.avatar}
              alt='user-pic'
              referrerPolicy='no-referrer'
              className='w-40 h-40 rounded-md -translate-y-[50%] object-cover'
            />
          ) : (
            <DummyImage
              userName={profileUserData?.fullName?.charAt(0)}
              width={160}
              height={160}
              fontSize={2.5}
            />
          )}
          {loggedInUser?.id === profileUserData?.id && (
            <>
              <label
                htmlFor='avatar_picker'
                className='absolute top-1/2 -translate-y-1/2 -right-2 bg-black/60 p-1 rounded-full cursor-pointer'>
                <Camera className='size-5' />
              </label>
              <input
                type='file'
                id='avatar_picker'
                onChange={(e) => uploadImage(e, 'Profile Photo')}
                className='hidden'
                accept='image/png, image/jpeg'
              />
            </>
          )}
        </div>
        <div className='mt-4'>
          <h3 className='text-lg font-semibold'>{profileUserData?.fullName}</h3>
          <p className='text-base text-gray'>@{profileUserData?.userName}</p>
        </div>
      </section>
      <section className='flex gap-4 px-8'>
        <AboutModal />
        <div className='flex flex-col w-[80%]'>
          <div className='flex items-center gap-2'>
            {ROOM_TYPES.map((eachRoomType) => (
              <UiButton
                key={eachRoomType}
                data-active={activeRoomType === eachRoomType}
                text={`My ${eachRoomType}`}
                onClick={() =>
                  navigateTo({
                    to: { [PROFILE_URL_KEYS.activeRoomType]: eachRoomType },
                  })
                }
                buttonType='tertiary'
                className='px-6 h-10 rounded-full bg-secondary text-gray data-[active="true"]:bg-white data-[active=true]:text-primary duration-300 hover:brightness-90 focus:ring-2 focus:ring-gray'
              />
            ))}
          </div>

          {roomData?.isFetching || speakersRoomData?.isFetching ? (
            <div className='flex justify-center items-start mt-4'>
              Loading...
            </div>
          ) : rooms.length ? (
            <div className='grid grid-cols-3 gap-4 mt-4'>
              {rooms.map((room, index) => (
                <RoomCard key={index} room={room} />
              ))}
            </div>
          ) : (
            <div className='flex justify-start items-start mt-4'>
              <p className='flex flex-col gap-2'>
                <span className='font-semibold'>No rooms available</span>
                {activeRoomType === 'speakingRooms' && (
                  <span className='text-gray '>
                    In this only that rooms will be shown in which you are only
                    a speaker and not the host of the room
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </section>
    </UIPageWrapper>
  );
};

export default Profile;
