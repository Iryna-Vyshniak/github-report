import React from 'react';

interface ScreenProps {
  text: string;
  onInput: (text: string) => void;
}

const Screen: React.FC<ScreenProps> = ({ text, onInput }) => {
  return (
    <textarea
      value={text}
      name='username'
      onChange={(e) => onInput(e.target.value.trim())}
      rows={6}
      className='screen mb-5 w-full h-[8rem] max-w-[18.75rem] s:max-w-[28.75rem] sm:max-w-[36rem] md:max-w-[42rem] p-2 text-[10px] md:text-xs dark:text-slate-800 placeholder:text-slate-700 resize-none'
      placeholder='Type a GitHub username here...'
    />
  );
};

export default Screen;
