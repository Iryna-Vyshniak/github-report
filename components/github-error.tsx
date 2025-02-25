import { useEffect, useState } from 'react';

import { ERROR_MSG } from '@/shared/constants';

export default function GitHubError() {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (step < ERROR_MSG.length) {
      const timeout = setTimeout(() => setStep(step + 1), 1200);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  return (
    <pre className='text-red-800 text-center text-xs font-mono animate-pulse leading-tight'>
      {`
  ██████████████████████
  █  ⚠️  SYSTEM ERROR  ⚠️  █
  ██████████████████████

  ${ERROR_MSG.slice(0, step + 1).join('\n')}
      `}
    </pre>
  );
}
