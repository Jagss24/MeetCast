import DummyImage from '../../components/DummyImage';
import { ThreeDots } from 'react-loading-icons';
import toast from 'react-hot-toast';
import UIPageWrapper from '@/components/ui/UIPageWrapper';
import { useSingleRoom } from './hooks/useSingleRoom';
import UiButton from '@/components/ui/UiButton';
import { Share2 } from 'lucide-react';

const SingleRoom = () => {
  const {
    services: { getSingleRoomService },
    function: { handleJoinRoom },
    mutations: { addMemberMutation, removeMemberMutation },
    routing: { roomId, navigate },
    states: { loggedInUser, roomData: room },
  } = useSingleRoom();

  return getSingleRoomService?.isLoading ? (
    <UIPageWrapper classname='flex flex-col gap-4 items-center justify-center'>
      <ThreeDots />
      <h3>Setting you up please wait</h3>
    </UIPageWrapper>
  ) : (
    <div className='flex flex-col justify-center items-center gap-4 w-[1200px] mx-auto py-8'>
      <h3 className='text-white text-lg font-semibold'>{room?.topic}</h3>
      <span className='text-gray text-sm'>{room?.description}</span>
      <section
        data-center={
          room?.accessibility === 'public' ||
          loggedInUser?.id !== room?.ownerId?._id
        }
        className='flex justify-between items-start w-full data-[center="true"]:justify-center'>
        <div className='w-[45%]  border border-gray rounded-md p-4'>
          <h3 className='mb-2 text-center text-md'>Speakers</h3>
          <div className='flex flex-col justify-center items-center gap-2'>
            {room?.speakers.map((speaker) => (
              <div
                className='flex justify-between items-center w-full border border-gray p-2 rounded-md'
                key={speaker?._id}>
                <div
                  className='flex gap-2 items-center cursor-pointer'
                  onClick={() => navigate(`/profile/${speaker?.userName}`)}>
                  {speaker?.avatar ? (
                    <img
                      src={speaker.avatar}
                      alt={`${speaker.fullName}'s avatar`}
                      referrerPolicy='no-referrer'
                      className='w-12 h-12 object-cover rounded-full'
                    />
                  ) : (
                    <DummyImage
                      userName={speaker?.fullName?.charAt(0).toUpperCase()}
                      className='w-12 h-12'
                    />
                  )}

                  <p>{speaker?.fullName}</p>
                </div>
                <p className='text-gray font-semibold'>
                  {speaker?._id === room?.ownerId?._id ? 'Host' : 'Speaker'}
                </p>
              </div>
            ))}
          </div>
        </div>
        {loggedInUser?.id === room?.ownerId?._id &&
          room?.accessibility !== 'public' && (
            <div className='w-[45%] border border-gray rounded-md p-4'>
              <h3 className='mb-2 text-center text-md'>Waiting List</h3>
              <div className='flex flex-col justify-center items-center gap-2 max-h-[350px] h-full overflow-auto'>
                {room?.waitingList?.length ? (
                  room?.waitingList.map((eachUser) => (
                    <div
                      className='flex justify-between items-center w-full border border-gray p-2 rounded-md'
                      key={eachUser?._id}>
                      <div className='flex items-center gap-2'>
                        {eachUser?.avatar ? (
                          <img
                            src={eachUser.avatar}
                            alt={`${eachUser.fullName}'s avatar`}
                            referrerPolicy='no-referrer'
                            className='w-12 h-12 object-cover rounded-full'
                          />
                        ) : (
                          <DummyImage
                            userName={eachUser?.fullName
                              ?.charAt(0)
                              .toUpperCase()}
                            className='w-12 h-12'
                          />
                        )}

                        <p>{eachUser?.fullName}</p>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <UiButton
                          isLoading={addMemberMutation?.isPending}
                          buttonType='tertiary'
                          className='bg-success/10 text-success rounded-md px-4 h-8 hover:brightness-90'
                          text='Accept'
                          onClick={() =>
                            addMemberMutation.mutate({
                              userId: eachUser?._id,
                              roomId,
                            })
                          }
                        />
                        <UiButton
                          isLoading={addMemberMutation?.isPending}
                          buttonType='tertiary'
                          className='bg-error/10 text-error rounded-md px-4 h-8 hover:brightness-90'
                          text='Decline'
                          onClick={() =>
                            removeMemberMutation.mutate({
                              userId: eachUser?._id,
                              roomId,
                            })
                          }
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-gray text-sm'>
                    No user is present in the waiting list
                  </p>
                )}
              </div>
            </div>
          )}
      </section>
      <section className='flex items-center gap-4 my-4 '>
        <UiButton
          text='Join Room'
          buttonType='primary'
          className='px-6'
          onClick={handleJoinRoom}
        />
        <UiButton
          text='Return to Rooms'
          buttonType='secondary'
          className='px-6'
          onClick={() => navigate('/rooms')}
        />
      </section>
      <UiButton
        icon={<Share2 className='size-5 text-white ' />}
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success('Link copied to your Clipboard', {
            position: 'bottom-center',
          });
        }}
        buttonType='tertiary'
        className='w-12 h-12 fixed bottom-4 right-4 bg-border p-2 rounded-full cursor-pointer focus:border focus:border-white'
      />
    </div>
  );
};

export default SingleRoom;
