import RoomCard from './components/RoomCard/RoomCard';
import StartRoom from './components/StartRoom/StartRoom';
import { Grid } from 'react-loading-icons';
import { ROOM_URL_KEYS, TOPIC_OPTIONS } from './room.constants';
import UiButton from '@/components/ui/UiButton';
import { MessageSquareDiff } from 'lucide-react';
import UIPageWrapper from '@/components/ui/UIPageWrapper';
import { useRooms } from './hooks/useRooms';
import UISelector from '@/components/ui/UISelector';

const Rooms = () => {
  const {
    services: { getAllRooms },
    states: { showModal, setShowModal },
    routing: { navigateTo, roomTopic },
  } = useRooms();

  return (
    <section className='w-full p-4'>
      <div className='flex justify-between items-center px-4'>
        <div className='flex items-center gap-4'>
          <UiButton
            text='All rooms'
            data-active={!roomTopic}
            onClick={() => navigateTo({ remove: [ROOM_URL_KEYS.topic] })}
            className='px-4 h-10 rounded-full text-white border border-gray/50 data-[active=true]:bg-white data-[active=true]:text-primary duration-300 text-nowrap'
            buttonType='tertiary'
          />
          <UISelector
            value={TOPIC_OPTIONS.find((eachOpt) => eachOpt.name === roomTopic)}
            onChange={(val) =>
              navigateTo({ to: { [ROOM_URL_KEYS.topic]: val.name } })
            }
            placeholder='Select topic'
            options={TOPIC_OPTIONS}
            className='w-36'
          />
        </div>
        <UiButton
          text='Create room'
          icon={<MessageSquareDiff className='size-4' />}
          data-active={showModal}
          onClick={() => {
            setShowModal(true);
            setTimeout(() => {
              navigateTo({
                to: {
                  [ROOM_URL_KEYS.roomType]: 'podcast',
                  [ROOM_URL_KEYS.visibility]: 'public',
                },
              });
            }, 100);
          }}
          className='px-6 h-10 rounded-full border border-gray/50 bg-white text-primary duration-300 hover:brightness-90'
          buttonType='tertiary'
        />
      </div>
      {getAllRooms?.isLoading || getAllRooms?.isFetching ? (
        <UIPageWrapper classname='flex flex-col items-center justify-center gap-4 min-h-[calc(100vh-150px)]'>
          <Grid speed={3} />
          <span> Please wait rooms are loading...</span>
        </UIPageWrapper>
      ) : (
        <div className='grid grid-cols-3 w-[1300px] mx-auto gap-4 mt-4'>
          {(getAllRooms?.data?.data?.roomDtos || [])?.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
      )}
      {showModal && (
        <StartRoom
          closeModal={() => {
            setShowModal(false);
            setTimeout(() => {
              navigateTo({ remove: Object.values(ROOM_URL_KEYS) });
            }, 100);
          }}
        />
      )}
    </section>
  );
};

export default Rooms;
