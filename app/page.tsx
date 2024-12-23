'use client';

import Keyboard from '@/components/keyboard';
import Report from '@/components/report';
import Screen from '@/components/screen';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [text, setText] = useState<string>('');
  const [isPrint, setIsPrint] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);

  useEffect(() => {
    if (isPrint) {
      setShowReport(true);
    }
  }, [isPrint]);

  const handleInput = (newText: string) => {
    setText(newText);
  };

  const handlePrint = () => {
    setIsPrint(!isPrint);
  };

  const handleAnimationEnd = () => {
    if (!isPrint) {
      setShowReport(false);
    }
  };

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center'>
        <div className='container mx-auto mt-0 w-full max-w-[320px] s:max-w-full'>
          <Screen text={text} />
          <Keyboard text={text} onInput={handleInput} onPrint={handlePrint} />
          <div className='mt-2 w-full printer relative'>
            <div className='w-full bg-gray-600 dark:bg-gray-950 h-[2px]'></div>
            {showReport && <Report isVisible={isPrint} onAnimationEnd={handleAnimationEnd} />}
          </div>
        </div>
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://github.com/Iryna-Vyshniak/github-report'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image aria-hidden src='/globe.svg' alt='Globe icon' width={16} height={16} />
          Go to GitHub →
        </a>
      </footer>
    </div>
  );
}
