'use client';

import Keyboard from '@/components/keyboard';
import Screen from '@/components/screen';

interface GitHubFormContentProps {
  username: string;
  onInput: (text: string) => void;
  onPrint: () => void;
  isPrint: boolean;
  reportRef: React.RefObject<HTMLDivElement>;
}

export default function GitHubFormContent({
  username,
  onInput,
  onPrint,
  isPrint,
  reportRef,
}: GitHubFormContentProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onPrint();
      }}
      autoComplete='off'
      className='w-full flex flex-col gap-4'
    >
      <Screen text={username} onInput={onInput} />
      <Keyboard
        text={username}
        onInput={onInput}
        onPrint={onPrint}
        isPrint={isPrint}
        reportRef={reportRef}
      />
    </form>
  );
}
