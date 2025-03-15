import React, { useState } from 'react';
import DummyImage from '@/components/DummyImage';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';
import UiButton from '@/components/ui/UiButton';

const RoomCard = ({ room }) => {
  const { navigate } = useRouteHandlers();
  const [readMore, setReadMore] = useState(false);
  return (
    <div className='flex flex-col gap-2 justify-start p-4 border border-white/10 rounded-lg relative'>
      <p className='text-white font-semibold text-base'>{room?.topic}</p>
      <p
        data-readmore={!!readMore}
        className='text-extraLightGray text-sm font-normal data-[readmore="true"]:h-auto h-10'>
        {room?.description.length >= 98 ? (
          <>
            {readMore
              ? room?.description
              : `${room?.description.slice(0, 98)}...`}
            <span onClick={() => setReadMore((prev) => !prev)}>
              {readMore ? ' Read Less' : ' Read More'}
            </span>
          </>
        ) : (
          room?.description
        )}
      </p>
      <div className='flex justify-between items-center mb-2 pr-3'>
        <div className='flex justify-center items-center gap-2'>
          {room?.ownerId?.avatar ? (
            <img
              src={room?.ownerId?.avatar}
              alt='host_pic'
              referrerPolicy='no-referrer'
              className='w-12 h-12 rounded-full'
            />
          ) : (
            <DummyImage
              userName={room?.ownerId?.fullName.charAt(0).toUpperCase()}
              className='w-12 h-12 rounded-full'
            />
          )}
          <span>
            {room?.ownerId?.fullName} <br /> (Host)
          </span>
        </div>
        <div className='flex flex-col relative '>
          {room?.speakers
            .slice(0, 2)
            .map((speaker, index) =>
              speaker?.avatar ? (
                <img
                  key={index}
                  src={speaker?.avatar}
                  alt='profile'
                  referrerPolicy='no-referrer'
                  data-index={index}
                  className='w-12 h-12 rounded-full object-cover last:absolute only:relative only:top-0 only:right-0 last:top-4 last:right-4'
                />
              ) : (
                <DummyImage
                  key={index}
                  userName={speaker?.fullName?.charAt(0).toUpperCase()}
                  className='w-12 h-12 rounded-full last:absolute only:relative only:top-0 only:right-0 last:top-4 last:right-4'
                />
              )
            )}
        </div>
      </div>
      <section className='flex justify-center items-center'>
        <UiButton
          text='Join the Room'
          buttonType='primary'
          onClick={() => navigate(`/room/${room?.id}`)}
          className='px-4 focus:brightness-90 focus:scale-95'
        />
      </section>
      {/* </RoomMain> */}
    </div>
  );
};

export default RoomCard;
