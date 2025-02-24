'use client';
import { useEffect, useState } from 'react';
import Barcode from './barcode';

import { formatDate, generateOrderNumber } from '@/shared/helpers';
import { GithubUser, LocalGithubUser } from '@/shared/types/user';
import { GitHubAggregateStats } from '@/shared/types/repo';

interface ReportProps {
  isVisible: boolean;
  onAnimationEnd: () => void;
  user: GithubUser | LocalGithubUser;
  stats: GitHubAggregateStats;
  reportRef: React.RefObject<HTMLDivElement>;
}

const Report = ({ user, stats, isVisible, onAnimationEnd, reportRef }: ReportProps) => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>(formatDate(new Date(), 'en-US'));

  useEffect(() => {
    setFormattedDate(formatDate(new Date(), 'en-US'));
  }, []);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    setOrderNumber(generateOrderNumber());
  }, []);

  return (
    <article
      className='absolute top-0 left-1/2 -translate-x-1/2 container-report p-3 w-full max-w-[20rem] min-h-[55rem] flex items-center justify-center text-slate-900 remove-scrollbar'
      role='document'
      aria-labelledby='report-title'
      aria-describedby='report-summary'
    >
      <div
        ref={reportRef}
        className={`absolute top-0 left-0 -translate-x-1/2 report min-h-[55rem] w-full flex flex-col gap-6 ${
          isVisible ? 'report-print' : 'report-exit'
        }`}
        onAnimationEnd={!isVisible ? onAnimationEnd : undefined}
      >
        {/* Заголовок звіту */}
        <header className='text-center'>
          <h2 id='report-title' className='text-base sm:text-lg font-bold uppercase tracking-wide'>
            GitHub Contribution Receipt
          </h2>
          <p className='text-sm opacity-75'>{formattedDate}</p>
          <p className='opacity-75 text-xs tracking-widest'>TRANSACTION ID: {orderNumber}</p>
          <hr />
        </header>

        {/* Основна інформація */}
        <main role='main'>
          <section
            role='region'
            aria-labelledby='account-holder-title'
            className='text-center mb-4'
          >
            <h3 id='account-holder-title' className='text-sm font-medium uppercase'>
              Account Holder:
            </h3>
            <p className='text-lg font-bold'>{user.name || user.login}</p>
            <p className='text-xs opacity-75'>GitHub ID: @{user.login}</p>
          </section>

          {/* Barcode */}
          <section
            role='region'
            aria-labelledby='barcode-title'
            className='mb-4   border-t border-dashed pt-3'
          >
            <h3 id='barcode-title' className='sr-only'>
              User Barcode
            </h3>
            <Barcode value={user.name || user.login} aria-hidden='true' />
            <a
              href={`https://github.com/${user.login}`}
              target='_blank'
              rel='noopener noreferrer'
              role='link'
              aria-label={`Visit ${user.login}'s GitHub profile`}
              title={`Open ${user.login}'s GitHub profile in a new tab`}
              aria-hidden='false'
              className='mt-1 opacity-75 text-slate-700 text-xs text-center block hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              github.com/{user.login}
            </a>
          </section>

          <p id='report-summary' className='font-bold text-center uppercase text-gray-800'>
            Your Open Source Contribution Statement
          </p>

          {/* Статистика */}
          <section
            role='region'
            aria-labelledby='stats-title'
            className='border-t border-b border-dashed py-3 mb-4 text-sm'
          >
            <h3 id='stats-title' className='sr-only'>
              User Contribution Statistics
            </h3>
            <dl className='grid grid-cols-2 gap-y-2'>
              <dt className='font-medium'>Repositories Created</dt>
              <dd className='text-right'>{stats.totalRepos}</dd>

              <dt className='font-medium'>Stars Collected</dt>
              <dd className='text-right'>{stats.totalStars}</dd>

              <dt className='font-medium'>Projects Forked</dt>
              <dd className='text-right'>{stats.totalForks}</dd>

              <dt className='font-medium'>Followers Gained</dt>
              <dd className='text-right'>{user.followers}</dd>

              <dt className='font-medium'>Following</dt>
              <dd className='text-right'>{user.following}</dd>
            </dl>
          </section>

          {/* Додаткова статистика */}
          <section
            role='region'
            aria-labelledby='additional-stats-title'
            className='flex flex-col gap-2 border-t border-dashed pt-3 mb-4'
          >
            <h3 id='additional-stats-title' className='sr-only'>
              Additional Contribution Statistics
            </h3>
            <div className='flex justify-between font-bold'>
              <span className='text-xs uppercase'>Peak Activity Day:</span>
              <span className='text-xs'>{stats.mostActiveDay}</span>
            </div>
            <div className='flex justify-between font-bold text-xs gap-2'>
              <span className='uppercase'>Commits This Year:</span>
              <span>{stats.totalCommits}</span>
            </div>
            <div className='flex justify-between font-bold text-xs'>
              <span className='uppercase'>Contribution Score:</span>
              <span className='text-red-800'>{stats.totalStars * 2 + user.followers * 3} pts</span>
            </div>
          </section>

          {/* Банківські дані */}
          <section
            role='region'
            aria-labelledby='bank-data-title'
            className='flex flex-col items-start justify-start gap-2 mb-6 opacity-75 text-xs text-center relative'
          >
            <h3 id='bank-data-title' className='sr-only'>
              Bank of Open Source
            </h3>

            <div className="relative inlane-flex w-full text-center  before:content-[''] before:inline-block before:w-1/5 before:border-t before:border-dashed before:border-gray-400 before:mb-1 after:content-[''] after:inline-block after:w-1/5 after:border-t after:border-dashed after:border-gray-400 after:mb-1">
              <span className='font-bold uppercase tracking-wide text-gray-700 px-2'>
                Bank of Open Source
              </span>
            </div>

            <p>
              Cardholder: <strong>{user.login.toUpperCase()}</strong>
            </p>
            <p className='align-middle'>
              Card Number: <span className='inline-block align-middle'>**** **** ****</span>{' '}
              {currentYear?.toString().slice(-2) ?? 'XX'}
            </p>
            <p>
              Auth Code: <span className='inline-block align-middle'>****</span>{' '}
            </p>

            <div className="relative inlane-flex w-full text-center  before:content-[''] before:inline-block before:w-[15%] before:border-t before:border-dashed before:border-gray-400 before:mb-1 after:content-[''] after:inline-block after:w-[15%] after:border-t after:border-dashed after:border-gray-400 after:mb-1">
              <span className='font-bold uppercase tracking-wide text-red-800 px-2'>
                Transaction Approved ✔
              </span>
            </div>
          </section>

          {/* Футер */}
          <footer
            role='contentinfo'
            className='flex flex-col gap-2 border-t border-dashed pt-3 mb-4 text-center text-xs opacity-75'
          >
            <p className='font-bold uppercase'>
              Valid for all public repositories and collaborations.
            </p>
            <p className='font-bold uppercase'>Thank you for your contributions! ❤️</p>
          </footer>
        </main>
      </div>
    </article>
  );
};

export default Report;
