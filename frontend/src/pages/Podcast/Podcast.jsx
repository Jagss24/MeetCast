import { useState } from 'react';
import { usePodCast } from './hooks/usePodCast';
import DummyImage from '../../components/DummyImage';
import toast from 'react-hot-toast';
import UIPageWrapper from '@/components/ui/UIPageWrapper';
import { Mic, MicOff, MicVocal, PhoneOff } from 'lucide-react';
import UiButton from '@/components/ui/UiButton';
import ChatAndParticipants from '@/components/webRtcComponents/ChatAndParticipants';

const Podcast = () => {
  //state's
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [msgContent, setMsgContent] = useState('');

  const showToastFunc = ({ remoteUser }) => {
    toast.custom(
      () => (
        <div className='flex items-center justify-center rounded bg-white gap-2'>
          <div className='flex items-center justify-center p-2'>
            {remoteUser?.avatar ? (
              <img
                src={remoteUser?.avatar}
                alt='user_pic'
                referrerPolicy='no-referrer'
                className='w-8 h-8 object-cover rounded-full'
              />
            ) : (
              <DummyImage
                userName={remoteUser?.fullName?.charAt(0)}
                className='w-8 h-8 object-cover rounded-full !text-xs'
              />
            )}
          </div>
          <div className='border-l border-offWhite p-2'>
            <span className='text-xs text-subHeading'>
              {remoteUser?.fullName} joined the room
            </span>
          </div>
        </div>
      ),
      { position: 'bottom-right' }
    );
  };

  //Hook
  const {
    podCastServices: {
      clients,
      provideRef,
      leaveRoom,
      handleAudio,
      sendMessage,
      clientMessages,
    },
    states: { user, isSpeaker, isOwner, roomTopic },
    routing: { roomId, navigateTo },
  } = usePodCast({ showToastFunc });

  return (
    <UIPageWrapper classname='!h-screen px-6 py-4 flex flex-col gap-4 w-full overflow-hidden'>
      <div className='flex items-center gap-2 w-full relative h-[4%]'>
        <MicVocal className='size-5 text-white' />
        <p className='text-base font-semibold'>{roomTopic}</p>
      </div>
      <section className='relative grid gap-8 max-h-[86%] h-[86%]  grid-cols-4 px-2 overflow-hidden transition-all duration-300'>
        <section className='grid col-span-3 grid-cols-[repeat(auto-fit,_minmax(150px,_0fr))] max-w-full h-full gap-4'>
          {clients.map((client, id) => (
            <div key={id}>
              <audio
                ref={(instance) => provideRef(instance, client?.id)}
                autoPlay
              />
              <div className='flex flex-col items-center justify-center'>
                {client?.avatar ? (
                  <img
                    src={client.avatar}
                    alt={`${client.fullName}'s avatar`}
                    referrerPolicy='no-referrer'
                    className='w-24 h-24 object-cover rounded-full'
                  />
                ) : (
                  <DummyImage
                    userName={client?.fullName?.charAt(0).toUpperCase()}
                    className='w-24 h-24 !text-md  rounded-full'
                  />
                )}
                <p className='text-sm'>
                  {client?.fullName}{' '}
                  <span className='text-xs font-semibold'>
                    {client?.isOwner
                      ? '(Owner)'
                      : client?.isSpeaker
                      ? '(Speaker)'
                      : ''}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </section>

        <ChatAndParticipants
          msgContent={msgContent}
          setMsgContent={setMsgContent}
          onClick={() => {
            sendMessage({
              userId: user?.id,
              userFullName: user?.fullName,
              msgContent,
              userAvatar: user?.avatar,
            });
            setMsgContent('');
          }}
          clientMessages={clientMessages}
          clients={clients}
        />
      </section>
      <div className=' w-full flex items-center justify-center gap-8'>
        {(isSpeaker || isOwner) && (
          <UiButton
            onClick={() => {
              if (clients?.length === 1) {
                toast(
                  'Cannot start audio when only one participant is present'
                );
                return;
              }
              setIsAudioOn((prev) => !prev);
              handleAudio(user?.id);
            }}
            icon={
              isAudioOn ? (
                <Mic className='size-4' />
              ) : (
                <MicOff className='size-4' />
              )
            }
            type='secondary'
            className='w-10 h-10 rounded'
          />
        )}

        <UiButton
          onClick={() => {
            leaveRoom();
            navigateTo({ url: `/room/${roomId}` });
          }}
          icon={<PhoneOff className='size-4 text-error' />}
          type='secondary'
          className='w-10 h-10 rounded'
        />
      </div>
    </UIPageWrapper>
  );
};

export default Podcast;
