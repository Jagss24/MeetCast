import React, { memo } from 'react';
import {
  StartRoomContainer,
  StartRoomBody,
  StartRoomHeader,
  StartRoomFooter,
  RoomTypes,
  RoomType,
  RoomTitle,
  AccessiBility,
  AssignSpeakerConatiner,
  AccessibilityType,
  StartRoomBase,
  TopicDiv,
  selectOptionsStyle,
  asyncSelectOptionsStyle,
} from './StartRoom.styled';
import { HiXMark } from 'react-icons/hi2';
import AsyncSelect from 'react-select/async';
import { Option, NoOptionsMessage } from './components/StartRoomOptions';
import Select from 'react-select';
import { useStartRoom } from '../../hooks/useStartRoom';

const StartRoom = ({ closeModal }) => {
  const {
    functions: {
      handleCreateRoom,
      handleChange,
      loadOptions,
      handleActiveRoom,
    },
    states: {
      TOPIC_OPTIONS,
      ROOM_TYPES,
      accessibility,
      selectedOption,
      selectedUser,
    },
    setStates: { setSelectedOption, setAccessibility, setSelectedUser },
    routing: { activeRoom },
  } = useStartRoom();

  return (
    <StartRoomContainer>
      <StartRoomBody>
        <StartRoomHeader>
          <span>Room Type</span>
          <RoomTypes>
            {ROOM_TYPES.map((eachRoomType) => {
              const ICON = eachRoomType.icon;
              return (
                <RoomType
                  isActive={activeRoom === eachRoomType.name}
                  onClick={() => handleActiveRoom({ roomType: eachRoomType })}>
                  <ICON />
                  <RoomTitle>{eachRoomType.name}</RoomTitle>
                </RoomType>
              );
            })}
          </RoomTypes>
          <AccessiBility>
            {activeRoom === 'meet' && (
              <AccessibilityType>
                If room type is Meet then it will always be private
              </AccessibilityType>
            )}
            {activeRoom === 'podcast' && (
              <div>
                <AccessibilityType
                  accessibility={accessibility === 'public'}
                  onClick={() => setAccessibility('public')}>
                  Public
                </AccessibilityType>
                <AccessibilityType
                  accessibility={accessibility === 'private'}
                  onClick={() => setAccessibility('private')}>
                  Private
                </AccessibilityType>
              </div>
            )}
            <span>
              {activeRoom === 'podcast'
                ? `Start a podcast, ${
                    accessibility === 'public'
                      ? 'open to everyone'
                      : 'private with your people'
                  } `
                : 'Start a Meet, with your people'}
            </span>
            {activeRoom === 'podcast' && (
              <TopicDiv>
                <h4>About What? </h4>
                <Select
                  onChange={(selected) => {
                    return setSelectedOption({
                      label: selected.label,
                      value: selected.value,
                    });
                  }}
                  value={
                    selectedOption.label && selectedOption.value
                      ? selectedOption
                      : null
                  }
                  options={TOPIC_OPTIONS}
                  styles={selectOptionsStyle}
                />
              </TopicDiv>
            )}
          </AccessiBility>
        </StartRoomHeader>
        <StartRoomBase>
          <h3>Title of the room</h3>
          <input placeholder='Enter your room title...' />
          <div className='desc_div'>
            <h3>Description of the room</h3>
            <input
              onChange={(e) => {
                if (e.target.value.length > 200) return;
              }}
              placeholder='Say something about your room...'
            />
          </div>
          {activeRoom === 'podcast' && accessibility === 'public' && (
            <AssignSpeakerConatiner>
              <h6>Assign speakers to your podcast :</h6>
              <AsyncSelect
                isSearchable={true}
                isMulti={true}
                onChange={handleChange}
                value={selectedUser}
                menuPlacement='top'
                placeholder={'Search users'}
                components={{ Option, NoOptionsMessage }}
                loadOptions={loadOptions}
                styles={asyncSelectOptionsStyle}
              />
            </AssignSpeakerConatiner>
          )}
          {activeRoom === 'meet' && (
            <AccessibilityType>
              If room type is meet those users who can join the room will be
              allowed to speak
            </AccessibilityType>
          )}
          {activeRoom === 'podcast' && accessibility === 'private' && (
            <AccessibilityType>
              If you will create private room eveyone will be allowed to speak
            </AccessibilityType>
          )}
        </StartRoomBase>
        <StartRoomFooter>
          <button onClick={handleCreateRoom}>
            <span>Create Room</span>
          </button>
        </StartRoomFooter>

        <span onClick={closeModal}>
          <HiXMark color={'#fff'} size={20} />
        </span>
      </StartRoomBody>
    </StartRoomContainer>
  );
};

export default memo(StartRoom);
