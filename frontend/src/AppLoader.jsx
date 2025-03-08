import React from 'react';
import UIPageWrapper from './components/ui/UIPageWrapper';
import { Podcast } from 'lucide-react';

const AppLoader = () => {
  return (
    <UIPageWrapper
      aria-label='loading'
      classname='flex flex-col gap-4 items-center justify-center'>
      <h4 className='flex items-center gap-2 text-lg'>
        <Podcast className='size-6' />
        <p>MeetCast</p>
      </h4>
      <div
        className='w-24 h-1 bg-white rounded-md'
        style={{
          animation: '.5s linear infinite alternate slideIn',
        }}
      />
    </UIPageWrapper>
  );
};

export default AppLoader;
