'use client';

import Keyboard from '@/components/keyboard';
import Report from '@/components/report';
import Screen from '@/components/screen';
import { defaultUser } from '@/shared/mock/mock';
import { LocalGithubUser } from '@/shared/types/user';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import { fetchUser } from '@/lib/actions/user.actions';

export default function Home() {
  const [username, setUsername] = useState<string>('');
  const [user, setUser] = useState<LocalGithubUser | null>(defaultUser);
  const [isPrint, setIsPrint] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isPrint) {
      setShowReport(true);
    }
  }, [isPrint]);

  const handleInput = (newText: string) => {
    setUsername(newText);
  };

  const handlePrint = async () => {
    if (showReport) {
      // If the report is already active, hide it
      setIsPrint(false);
      return;
    }

    if (!username) {
      // If the name is not entered, we show the default user
      setUser(defaultUser);
      setIsPrint(true);
      return;
    }

    // If the name is entered, let's fetch the data
    try {
      setIsLoading(true);
      setError(null);

      const fetchedUser = await fetchUser(username);
      console.log('fetchedUser: ', fetchedUser);
      setUser(fetchedUser);
      setIsPrint(true);
    } catch (error) {
      setError('Failed to fetch user. Please try again.');
      console.error('Fetch error:', error);
      setUser(defaultUser);
      setIsPrint(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnimationEnd = () => {
    if (!isPrint) {
      setShowReport(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const githubUsername = form.username.value.trim();

    handleInput(githubUsername);
    form.reset();
  };

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center'>
        <form
          onSubmit={handleSubmit}
          autoComplete='off'
          className='container mx-auto mt-0 w-full max-w-[320px] s:max-w-full'
        >
          <Screen text={username} onInput={setUsername} />
          <Keyboard text={username} onInput={handleInput} onPrint={handlePrint} />
          <div className='mt-2 w-full printer relative'>
            <div className='w-full bg-gray-600 dark:bg-gray-950 h-[2px]'></div>
            {isLoading && <p>Loading...</p>}
            {error && <p className='text-red-500'>{error}</p>}
            {showReport && (
              <Report
                isVisible={isPrint}
                onAnimationEnd={handleAnimationEnd}
                user={user?.name || username}
              />
            )}
          </div>
        </form>
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
