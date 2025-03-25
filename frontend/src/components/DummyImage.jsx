import { useState, useEffect, memo } from 'react';

const DummyImage = ({ userName, className = '' }) => {
  const colors = [
    '#ef4444',
    '#84cc16',
    '#06b6d4',
    '#ef4444',
    '#ec4899',
    '#8b5cf6',
  ];
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, []);
  return (
    <div
      style={{ background: backgroundColor }}
      className={`text-xs w-10 h-10 flex items-center justify-center rounded-full ${className}`}>
      <span>{userName}</span>
    </div>
  );
};
export default memo(DummyImage);
