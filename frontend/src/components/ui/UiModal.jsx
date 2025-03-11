import React, { useEffect } from 'react';

const UiModal = ({ children, headingText, className }) => {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/60'>
      <div
        className={`bg-primary max-w-[450px] w-full p-4 rounded-md ${className}`}>
        <p className='text-white text-md text-center font-semibold'>
          {headingText}
        </p>
        {children}
      </div>
    </div>
  );
};

export default UiModal;
