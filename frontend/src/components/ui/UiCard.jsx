import React from 'react';

const UiCard = ({
  headingIcon,
  headerTitle,
  titleClassName,
  className,
  children,
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-4 flex-col shadow-card p-8 rounded ${className}`}>
      <div className='flex items-center justify-center gap-2'>
        {headingIcon}
        <span className={`text-base font-semibold ${titleClassName}`}>
          {headerTitle}
        </span>
      </div>
      {children}
    </div>
  );
};

export default UiCard;
