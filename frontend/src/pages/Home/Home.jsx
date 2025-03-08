import React from 'react';
import UiButton from '@/components/ui/UiButton';
import UIPageWrapper from '@/components/ui/UIPageWrapper';
import { Podcast } from 'lucide-react';
import { useRouteHandlers } from '@/hooks/useRouteHandlers';

const Home = () => {
  const { navigate } = useRouteHandlers();

  return (
    <UIPageWrapper>
      <div className='absolute -top-40 -left-[30rem] right-0 -z-10 overflow-hidden blur-[64px]'>
        <div
          className='relative w-[60.125rem] aspect-[1155/678] opacity-30'
          style={{
            left: 'calc(50% - 11rem)',
            transform: 'translateX(-50%) rotate(30deg)',
            background: 'linear-gradient(to top right, #ff80b5, #9089fc)',
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}></div>
      </div>
      <section className='h-[90dvh] w-full flex flex-col items-center justify-center gap-4'>
        <p className='flex items-center gap-2'>
          <Podcast className='size-12' />
          <span className='text-xl font-semibold'>MeetCast</span>
        </p>
        <p className='text-center text-lg'>
          Combines the idea of meetings and podcasts.
        </p>
        <p className='text-md text-center w-[60%]'>
          Connect, chat, and share in your own meeting or podcast space. Public
          or private, it’s your call!
        </p>
        <UiButton
          text='Get Started'
          className='px-4 py-1'
          onClick={() => navigate('/login')}
          buttonType='primary'
        />
      </section>
      <div className='absolute -bottom-0 right-0 -z-10 overflow-hidden blur-[64px]'>
        <div
          className='relative w-[60.125rem] aspect-[1155/678] opacity-30'
          style={{
            left: 'calc(50% - 11rem)',
            transform: 'translateX(-50%) rotate(30deg)',
            background: 'linear-gradient(to top right, #ff80b5, #9089fc)',
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}></div>
      </div>
    </UIPageWrapper>
  );
};

export default Home;
