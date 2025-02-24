import GitHubForm from '@/components/github-form';
import GitHubFormWrapper from '@/components/github-form-wrapper';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='relative inset-0 flex flex-col gap-8 row-start-2 items-center'>
        <GitHubFormWrapper>
          <GitHubForm />
        </GitHubFormWrapper>
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
