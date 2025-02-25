'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { PiSunLight, PiMoon } from 'react-icons/pi';
import { LuVolume2, LuVolumeX } from 'react-icons/lu';

import { keys, Key } from '@/shared/data/data';
import ShareButton from './share-button';
const SOUND = '/sounds/press-key.mp3';

interface KeyboardProps {
  text: string;
  onInput: (newText: string) => void;
  onPrint: () => void;
  isPrint: boolean;
  reportRef: React.RefObject<HTMLDivElement>;
}

const Keyboard: React.FC<KeyboardProps> = ({ text, onInput, onPrint, isPrint, reportRef }) => {
  const [capslock, setCapslock] = useState<boolean>(false);
  const [numlock, setNumlock] = useState<boolean>(false);
  const [soundlock, setSoundlock] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize the audio
  const initializeAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(SOUND);
    }
  };

  const playSoundKey = () => {
    if (soundlock && audioRef.current instanceof HTMLAudioElement) {
      audioRef.current.currentTime = 0; // Reset to the beginning
      audioRef.current.play().catch((error) => console.error('Error playing sound:', error));
    }
  };

  const turnSoundOn = () => {
    setSoundlock(true);
  };

  const turnSoundOff = () => {
    setSoundlock(false);
  };

  const printButtonClass = isPrint ? 'bg-slate-20 opacity-50' : 'hover:scale-110';

  const getDynamicWidth = (key: Key): string => {
    if (key.classes.includes('delete')) return 'w-[5rem]';
    if (key.classes.includes('cancel')) return 'w-[5rem]';
    if (key.classes.includes('capslock')) return 'w-[5.2rem]';
    if (key.classes.includes('enter')) return 'w-[7.35rem]';
    if (key.classes.includes('numlock')) return 'w-[5.9375rem]';
    if (key.classes.includes('print')) return 'w-[5.2rem]';
    if (key.classes.includes('space')) return 'w-full md:w-[42rem] max-w-[42rem]';
    return 'w-[1.5rem] sm:w-[2.5rem]'; // Default key width
  };

  const handleKeyClick = (key: Key) => {
    initializeAudio();
    playSoundKey();

    let character = key.off || '';

    // If numlock is activated, we take the top character (on), but only for characters
    if (numlock && key.on) {
      character = key.on;
    }

    // If it's a letter, we consider capslock and numlock
    if (key.classes.includes('letter')) {
      character = capslock ? character.toUpperCase() : character;
    }

    // Special keys
    if (key.classes.includes('space')) character = ' ';
    if (key.classes.includes('enter')) character = '\n';

    if (key.classes.includes('cancel')) {
      onInput('');
      return;
    }

    if (key.classes.includes('delete')) {
      onInput(text.slice(0, -1));
      return;
    }

    if (key.classes.includes('numlock')) {
      setNumlock(!numlock);
      return;
    }

    if (key.classes.includes('capslock')) {
      setCapslock(!capslock);
      return;
    }
    if (key.classes.includes('print')) {
      onPrint();
      return;
    }

    onInput(text + character);
  };

  const getDisplayValue = (key: Key): string => {
    if (key.classes.includes('letter')) {
      return capslock ? key.off!.toUpperCase() : key.off!;
    }
    if (key.classes.includes('symbol') && numlock) {
      return key.on || key.off || '';
    }
    if (key.classes.includes('print')) {
      return key.label?.toUpperCase() ?? '';
    }
    return key.label || key.off || '';
  };

  return (
    <div className='flex flex-col gap-2 w-full max-w-[18.75rem] s:max-w-[28.75rem] sm:max-w-[36rem] md:max-w-[42rem]'>
      <div className='flex items-center justify-between gap-2'>
        <ul className='info-lights'>
          <li
            className={capslock ? 'info-light capslock-light active' : 'info-light capslock-light'}
          >
            <span className='dark:text-white text-slate-800'>CAPS LOCK</span>
          </li>
          <li className={numlock ? 'info-light numlock-light active' : 'info-light numlock-light'}>
            <span className='dark:text-white text-slate-800'>NUM LOCK</span>
          </li>
        </ul>
        <ul className='flex items-center justify-between gap-2'>
          <li>
            {' '}
            <button
              className='key p-[2px] w-[1.5rem] sm:w-[2.5rem] rounded-md flex items-center justify-center cursor-pointer'
              onClick={turnSoundOn}
            >
              <div
                className={`text-[.5rem] s:text-[.6rem] sm:text-[.7rem] md:text-xs ${
                  soundlock
                    ? 'text-accent dark:text-accent drop-shadow-sm'
                    : 'dark:text-white text-slate-800'
                }`}
              >
                <LuVolume2 />
              </div>
            </button>
          </li>
          <li>
            {' '}
            <button
              className='key p-[2px] w-[1.5rem] sm:w-[2.5rem] rounded-md flex items-center justify-center cursor-pointer'
              onClick={turnSoundOff}
            >
              <div
                className={`text-[.5rem] s:text-[.6rem] sm:text-[.7rem] md:text-xs ${
                  !soundlock
                    ? 'text-accent dark:text-accent drop-shadow-sm'
                    : 'dark:text-white text-slate-800'
                }`}
              >
                <LuVolumeX />
              </div>
            </button>
          </li>
          <li>
            {' '}
            <button
              className='key p-[2px] w-[1.5rem] sm:w-[2.5rem] rounded-md flex items-center justify-center cursor-pointer dark:text-white text-slate-800 text-[.5rem] s:text-[.6rem] sm:text-[.7rem] md:text-xs'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted ? theme === 'dark' ? <PiSunLight /> : <PiMoon /> : <PiSunLight />}
            </button>
          </li>
        </ul>
        <nav aria-label='Report actions'>
          <ShareButton reportRef={reportRef} username={text} isPrint={isPrint} />
        </nav>
      </div>

      {keys.map((row, rowIndex) => (
        <ul key={rowIndex} className='flex gap-1 items-center justify-between'>
          {row.length > 0
            ? row.map((key, keyIndex) => (
                <li
                  key={keyIndex}
                  className={`key h-[1.5rem] sm:h-[2.5rem] rounded-md flex items-center justify-center cursor-pointer text-[.5rem] s:text-[.6rem] sm:text-[.7rem] md:text-xs ${getDynamicWidth(
                    key
                  )} ${key.classes.includes('print') ? 'drop-shadow-accent' : ''}`}
                >
                  <button
                    className={`w-full h-full border-none ${
                      key.classes.includes('print') ? printButtonClass : ''
                    }`}
                    type={key.classes.includes('print') ? 'submit' : 'button'}
                    onClick={() => {
                      if (key.classes.includes('print')) {
                        onPrint();
                      } else {
                        handleKeyClick(key);
                      }
                    }}
                  >
                    <kbd>{getDisplayValue(key)}</kbd>
                  </button>
                </li>
              ))
            : null}
        </ul>
      ))}
    </div>
  );
};

export default Keyboard;
