'use client';

import { useRef, useState } from 'react';

import Report from '@/components/report';
import { defaultUser } from '@/shared/mock/mock';
import { LocalGithubUser } from '@/shared/types/user';
import { getGitHubStats } from '@/lib/actions/user.actions';
import { GitHubAggregateStats } from '@/shared/types/repo';
import GitHubFormContent from './github-form-content';
import GitHubLoader from './github-loader';
import GitHubError from './github-error';

export default function GitHubForm() {
  const [username, setUsername] = useState<string>('');
  const [user, setUser] = useState<LocalGithubUser | null>(null);
  const [stats, setStats] = useState<GitHubAggregateStats | null>(null);
  const [isPrint, setIsPrint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = async (username: string) => {
    if (isPrint) {
      setIsPrint(false);
      setTimeout(() => {
        setUser(null);
        setStats(null);
      }, 500);
      return;
    }

    setUsername(username);
    if (!username) {
      setUser(defaultUser);
      setStats(null);
      setIsPrint(true);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const result = await getGitHubStats(username);

      if (!result) {
        setError('User not found. Please check the username.');
        setUser(defaultUser);
        setStats(null);
        setIsPrint(false);
        return;
      }

      const { userData, stats } = result;
      setUser(userData);
      setStats(stats);
      setIsPrint(true);
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setUser(defaultUser);
      setStats(null);
      setIsPrint(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GitHubFormContent
        username={username}
        onInput={setUsername}
        onPrint={() => handlePrint(username)}
        isPrint={isPrint}
        reportRef={reportRef}
      />
      <div className='my-2 w-full printer relative'>
        <div className='w-full bg-gray-600 dark:bg-gray-950 h-[2px]'></div>
        {!!isLoading && <GitHubLoader />}
        {!!error && <GitHubError />}

        {isPrint && user && stats && (
          <Report
            isVisible={isPrint}
            user={user}
            stats={stats}
            onAnimationEnd={() => setIsPrint(false)}
            reportRef={reportRef}
          />
        )}
      </div>
    </>
  );
}
