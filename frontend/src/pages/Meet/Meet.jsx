import { useState } from 'react';
import { useMeet } from './hooks/useMeet';
import DummyImage from '@/components/DummyImage';
import toast from 'react-hot-toast';
import UIPageWrapper from '@/components/ui/UIPageWrapper';
import {
  Airplay,
  Mic,
  MicOff,
  PhoneOff,
  ScreenShare,
  ScreenShareOff,
  Video,
  VideoOff,
} from 'lucide-react';
import UiButton from '@/components/ui/UiButton';
import ChatAndParticipants from '@/components/webRtcComponents/ChatAndParticipants';

const Meet = () => {
  // State's
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [msgContent, setMsgContent] = useState('');
  const [screenIsSharing, setscreenIsSharing] = useState(false);

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
            <span className='text-sm text-subHeading'>
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
    meetServices: {
      clients,
      provideRef,
      screenSharing,
      handleVideo,
      leaveRoom,
      handleAudio,
      sendMessage,
      clientMessages,
      toggleFullScreen,
    },
    states: { user, roomTopic },
    routing: { roomId, navigateTo },
  } = useMeet({ showToastFunc });
  const { startScreenSharing, stopScreenSharing } = screenSharing();

  return (
    <UIPageWrapper classname='!h-screen px-6 py-4 flex flex-col gap-4 w-full overflow-hidden'>
      <div className='flex items-center gap-2 w-full relative h-[4%]'>
        <Airplay className='size-5 text-white' />
        <p className='text-base font-semibold'>{roomTopic}</p>
      </div>
      <section className='relative grid gap-8 max-h-[86%] h-[86%]  grid-cols-4 px-2 overflow-hidden transition-all duration-300'>
        <section className='grid grid-cols-3 max-w-full w-full grid-rows-3 col-span-3 gap-4 rounded-md h-full max-h-full'>
          {clients.map((client) => (
            <div
              className='w-full h-full relative top-0 left-0 bg-border rounded'
              key={client?.id}>
              <video
                data-video={client?.isVideoOn}
                className='absolute inset-0 object-cover !w-full !h-full data-[video="true"]:block hidden my-auto'
                ref={(instance) => provideRef(instance, client?.id)}
                autoPlay
              />
              {!client?.isVideoOn && (
                <div className='flex items-center justify-center h-full'>
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
                </div>
              )}
              <p className='absolute bottom-2 left-2 text-xs text-white bg-primary/30 p-1 rounded'>
                {client?.fullName}
              </p>
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
      <div className=' w-full flex items-center justify-between'>
        <div className='flex gap-4 items-center'>
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
          <UiButton
            onClick={() => {
              setIsVideoOn((prev) => !prev);
              handleVideo(user?.id);
            }}
            icon={
              isVideoOn ? (
                <Video className='size-4' />
              ) : (
                <VideoOff className='size-4' />
              )
            }
            type='secondary'
            className='w-10 h-10 rounded'
          />
        </div>
        <div className='flex gap-4 items-center'>
          <UiButton
            onClick={() => {
              if (screenIsSharing) {
                stopScreenSharing(setscreenIsSharing);
              } else {
                if (clients?.length === 1) {
                  toast(
                    'Cannot share screen when only one participant is present'
                  );
                  return;
                }
                startScreenSharing(setscreenIsSharing);
              }
            }}
            icon={
              screenIsSharing ? (
                <ScreenShareOff className='size-4' />
              ) : (
                <ScreenShare className='size-4' />
              )
            }
            type='secondary'
            className='w-10 h-10 rounded'
          />
        </div>
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

export default Meet;
