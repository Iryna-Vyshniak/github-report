'use client';

import { ReactNode } from 'react';

interface GitHubFormWrapperProps {
  children: ReactNode;
}

export default function GitHubFormWrapper({ children }: GitHubFormWrapperProps) {
  return (
    <section className='container mx-auto mt-0 mb-6 w-full max-w-[320px] s:max-w-full'>
      {children}
    </section>
  );
}
