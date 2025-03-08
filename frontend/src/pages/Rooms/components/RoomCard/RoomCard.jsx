import React, { useState } from 'react';
import {
  RoomCardStyled,
  RoomMain,
  Topic,
  SpeakerContainers,
  SpeakersAvatar,
  HostContainer,
  JoinRoom,
  About,
} from './RoomCard.styled';
import DummyImage from '@/components/DummyImage';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';

const RoomCard = ({ room }) => {
  const borderColors = ['red', 'green', 'blue', 'yellow'];
  const { navigate } = useRouteHandlers();
  const [readMore, setReadMore] = useState(false);
  return (
    <RoomCardStyled>
      <RoomMain>
        <Topic>{room?.topic}</Topic>
        <About>
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
        </About>
        <SpeakerContainers>
          <HostContainer>
            {room?.ownerId?.avatar ? (
              <img
                src={room?.ownerId?.avatar}
                alt='host_pic'
                referrerPolicy='no-referrer'
              />
            ) : (
              <DummyImage
                userName={room?.ownerId?.fullName.charAt(0).toUpperCase()}
              />
            )}
            <span>
              {room?.ownerId?.fullName} <br /> (Host)
            </span>
          </HostContainer>
          <SpeakersAvatar
            randomcolors={borderColors[Math.floor(Math.random() * 4)]}
            speakerLength={room?.speakers.length}>
            {room?.speakers
              .slice(0, 2)
              .map((speaker, index) =>
                speaker?.avatar ? (
                  <img
                    key={index}
                    src={speaker?.avatar}
                    alt='profile'
                    referrerPolicy='no-referrer'
                  />
                ) : (
                  <DummyImage
                    key={index}
                    userName={speaker?.fullName?.charAt(0).toUpperCase()}
                  />
                )
              )}
          </SpeakersAvatar>
        </SpeakerContainers>
        <JoinRoom onClick={() => navigate(`/room/${room?.id}`)}>
          Join the Room
        </JoinRoom>
      </RoomMain>
    </RoomCardStyled>
  );
};

export default RoomCard;
