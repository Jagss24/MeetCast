import React from 'react';

const UIPageWrapper = ({ classname = '', children }) => {
  return (
    <div className={`overflow-x-hidden min-h-[calc(100vh-80px)]  ${classname}`}>
      {children}
    </div>
  );
};

export default UIPageWrapper;
