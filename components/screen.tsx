import React from 'react';

interface ScreenProps {
  text: string;
}

const Screen: React.FC<ScreenProps> = ({ text }) => {
  return (
    <textarea
      value={text}
      readOnly
      rows={6}
      className='screen mb-5 w-full max-w-[18.75rem] s:max-w-[28.75rem] sm:max-w-[36rem] md:max-w-[42rem] p-2  text-[10px] md:text-xs'
      placeholder='Type here...'
    />
  );
};

export default Screen;
