import { useEffect, useState } from 'react';

import { LOADING_STEPS } from '@/shared/constants';

export default function GitHubLoader() {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (step < LOADING_STEPS.length) {
      const timeout = setTimeout(() => setStep(step + 1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  return (
    <pre className='text-slate-500 text-center text-sm font-mono animate-pulse leading-tight'>
      {`
  ████████████████████
  █                  █
  █  GitHub Report   █
  █  Processing...   █
  █                  █
  ████████████████████
  
  ${LOADING_STEPS.slice(0, step + 1).join('\n')}
      `}
    </pre>
  );
}
