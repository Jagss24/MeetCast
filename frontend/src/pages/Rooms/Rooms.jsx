import React, { useState } from 'react';
import {
  RoomComponent,
  RoomCardContainer,
  RoomNav,
  FirstChild,
  Buttons,
  LoadingDiv,
} from './Rooms.styled';
import { MdVoiceChat } from 'react-icons/md';
import RoomCard from './components/RoomCard/RoomCard';
import StartRoom from './components/StartRoom/StartRoom';
import { useQuery } from '@tanstack/react-query';
import { getRooms } from '@/api/api';
import { Grid } from 'react-loading-icons';
import { TopicDiv } from './components/StartRoom/StartRoom.styled';
import Select from 'react-select';
import { TOPIC_OPTIONS } from './room.constants';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';

const Rooms = () => {
  const { navigateTo } = useRouteHandlers();
  const [showModal, setShowModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const getAllRooms = useQuery({
    queryKey: ['get-rooms', selectedFilter?.value],
    queryFn: () => getRooms(selectedFilter?.value || ''),
  });

  return (
    <>
      <RoomComponent>
        <RoomNav>
          <FirstChild>
            <Buttons
              active={!selectedFilter}
              onClick={() => setSelectedFilter(null)}>
              <span>All Voice rooms</span>
            </Buttons>
            <TopicDiv>
              <Select
                onChange={(selected) => {
                  setSelectedFilter({
                    label: selected.label,
                    value: selected.value,
                  });
                }}
                value={selectedFilter}
                options={TOPIC_OPTIONS}
                placeholder='Topics'
                styles={{
                  control: (provided) => ({
                    ...provided,
                    background: 'var(--primary-color)',
                    borderRadius: '22px',
                    border: '1px solid var(--border-color)',
                    outline: 'none',
                    cursor: 'pointer',
                    width: '10rem',
                    '@media (max-width: 768px)': {
                      justifyContent: 'start',
                      width: 'fit-content',
                      flexWrap: 'nowrap',
                    },
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: '#fff',
                    fontWeight: '600',
                  }),
                  valueContainer: (provided, state) => ({
                    ...provided,
                    color: '#fff',
                  }),
                  singleValue: (provided, state) => ({
                    ...provided,
                    color: '#fff',
                  }),
                  menu: (provided) => ({
                    ...provided,
                    cursor: 'pointer',
                    background: 'var(--primary-color)',
                    border: '1px solid var(--border-color)',
                    width: '100%',
                    '@media (max-width: 768px)': {
                      width: '10rem',
                    },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: '#fff',
                    backgroundColor: state.isFocused ? '#353535' : '',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: state.isFocused ? '#353535' : '',
                    },
                  }),
                  indicatorSeparator: (provided) => ({
                    ...provided,
                    display: 'none', // Hide indicator separator
                  }),
                }}
              />
            </TopicDiv>
          </FirstChild>
          <Buttons
            onClick={() => {
              navigateTo({ to: { roomType: 'podcast' } });
              setShowModal(true);
            }}
            active={true}>
            <MdVoiceChat size={18} />
            <span className='hide'>Start a room</span>
          </Buttons>
        </RoomNav>
        {getAllRooms?.isLoading || getAllRooms?.isFetching ? (
          <LoadingDiv>
            <Grid speed={3} />
            <span> Please wait rooms are loading...</span>
          </LoadingDiv>
        ) : (
          <RoomCardContainer>
            {(getAllRooms?.data?.data?.roomDtos || [])?.map((room, index) => (
              <RoomCard key={index} room={room}></RoomCard>
            ))}
          </RoomCardContainer>
        )}
      </RoomComponent>
      {showModal && <StartRoom closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default Rooms;
